import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { spawn } from 'node:child_process'
import { launch as launchChrome } from 'chrome-launcher'
import lighthouse from 'lighthouse'
import desktopConfig from 'lighthouse/core/config/desktop-config.js'

const root = resolve(import.meta.dirname, '..')
const output = resolve(root, '.lighthouse')
await mkdir(output, { recursive: true })

const vite = resolve(root, 'node_modules', 'vite', 'bin', 'vite.js')
const server = spawn(process.execPath, [vite, 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], {
  cwd: root,
  stdio: 'ignore',
  shell: false,
})

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch('http://127.0.0.1:4173/')
      if (response.ok) return
    } catch {
      // Preview is still starting.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 250))
  }
  throw new Error('Preview server did not start')
}

const thresholds = {
  mobile: { performance: 0.85, accessibility: 0.95, seo: 0.95 },
  desktop: { performance: 0.95, accessibility: 0.95, seo: 0.95 },
}

const metricIds = [
  'first-contentful-paint',
  'largest-contentful-paint',
  'speed-index',
  'total-blocking-time',
  'cumulative-layout-shift',
]

function auditSummary(lhr) {
  const categories = lhr.categories
  const metrics = Object.fromEntries(
    metricIds.map((id) => [id, Math.round((lhr.audits[id]?.numericValue ?? 0) * 100) / 100]),
  )
  return {
    performance: categories.performance?.score ?? 0,
    accessibility: categories.accessibility?.score ?? 0,
    seo: categories.seo?.score ?? 0,
    metrics,
  }
}

function failuresFor(formFactor, summary) {
  const failures = []
  for (const [category, minimum] of Object.entries(thresholds[formFactor])) {
    if (summary[category] < minimum) failures.push(`${category} ${summary[category]} < ${minimum}`)
  }
  if (formFactor === 'mobile' && summary.metrics['largest-contentful-paint'] > 2500) {
    failures.push(`LCP ${Math.round(summary.metrics['largest-contentful-paint'])}ms > 2500ms`)
  }
  return failures
}

try {
  await waitForServer()
  const chrome = await launchChrome({ chromeFlags: ['--headless=new', '--no-sandbox'] })
  try {
    for (const formFactor of ['mobile', 'desktop']) {
      const attempts = process.env.CI ? 2 : 1
      let accepted
      let best
      for (let attempt = 1; attempt <= attempts; attempt += 1) {
        const result = await lighthouse(
          'http://127.0.0.1:4173/',
          {
            port: chrome.port,
            output: 'json',
            logLevel: 'error',
            onlyCategories: ['performance', 'accessibility', 'seo'],
          },
          formFactor === 'desktop' ? desktopConfig : undefined,
        )
        if (!result) throw new Error(`Lighthouse returned no ${formFactor} result`)
        const summary = auditSummary(result.lhr)
        const failures = failuresFor(formFactor, summary)
        process.stdout.write(`${formFactor} attempt ${attempt}: ${JSON.stringify(summary)}\n`)
        await writeFile(resolve(output, `${formFactor}-attempt-${attempt}.json`), result.report)
        if (!best || summary.performance > best.summary.performance) best = { result, summary, failures }
        if (failures.length === 0) {
          accepted = { result, summary }
          break
        }
        if (attempt < attempts) process.stdout.write(`${formFactor}: retrying after ${failures.join(', ')}\n`)
      }
      const final = accepted ?? best
      if (!final) throw new Error(`Lighthouse returned no ${formFactor} result`)
      await writeFile(resolve(output, `${formFactor}.json`), final.result.report)
      const failures = failuresFor(formFactor, final.summary)
      if (failures.length) throw new Error(`${formFactor} Lighthouse budgets failed: ${failures.join(', ')}`)
    }
  } finally {
    try {
      await chrome.kill()
    } catch (error) {
      if (error?.code !== 'EPERM') process.stderr.write(`Chrome cleanup warning: ${String(error)}\n`)
    }
  }
} finally {
  server.kill()
}
