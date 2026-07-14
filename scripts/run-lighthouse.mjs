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

try {
  await waitForServer()
  const chrome = await launchChrome({ chromeFlags: ['--headless=new', '--no-sandbox'] })
  try {
    for (const formFactor of ['mobile', 'desktop']) {
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
      await writeFile(resolve(output, `${formFactor}.json`), result.report)
      const scores = result.lhr.categories
      const lcp = result.lhr.audits['largest-contentful-paint']?.numericValue ?? Infinity
      process.stdout.write(`${formFactor}: perf=${scores.performance?.score ?? 0}, a11y=${scores.accessibility?.score ?? 0}, seo=${scores.seo?.score ?? 0}, LCP=${Math.round(lcp)}ms\n`)
      for (const [category, minimum] of Object.entries(thresholds[formFactor])) {
        if ((scores[category]?.score ?? 0) < minimum) throw new Error(`${formFactor} ${category} score is below ${minimum}`)
      }
      if (formFactor === 'mobile' && lcp > 2500) throw new Error(`Mobile LCP ${Math.round(lcp)}ms exceeds 2500ms`)
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
