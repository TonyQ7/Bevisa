import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

async function scrub(page: import('@playwright/test').Page, from: number, to: number): Promise<number> {
  return page.evaluate(
    ({ start, end }) =>
      new Promise<number>((resolve) => {
        const duration = 1200
        const deltas: number[] = []
        let first = 0
        let previous = 0
        const frame = (time: number): void => {
          if (!first) first = time
          if (previous) deltas.push(time - previous)
          previous = time
          const progress = Math.min(1, (time - first) / duration)
          window.scrollTo(0, start + (end - start) * progress)
          if (progress < 1) requestAnimationFrame(frame)
          else resolve(1000 / (deltas.reduce((sum, delta) => sum + delta, 0) / deltas.length))
        }
        requestAnimationFrame(frame)
      }),
    { start: from, end: to },
  )
}

async function sampleHero(page: import('@playwright/test').Page): Promise<number> {
  await page.evaluate(() => {
    const target = window as Window & { __bevisaFrameDeltas?: number[] }
    target.__bevisaFrameDeltas = []
    let previous = performance.now()
    const until = previous + 1200
    const frame = (time: number): void => {
      target.__bevisaFrameDeltas?.push(time - previous)
      previous = time
      if (time < until) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  })
  const canvas = page.locator('#top canvas')
  const box = await canvas.boundingBox()
  if (!box) throw new Error('Hero canvas has no interactive bounds')
  for (let index = 0; index < 12; index += 1) {
    await page.mouse.move(
      box.x + box.width * (0.25 + (index % 4) * 0.16),
      box.y + box.height * (0.28 + (index % 3) * 0.2),
      { steps: 3 },
    )
    await page.waitForTimeout(50)
  }
  await page.waitForTimeout(650)
  const deltas = await page.evaluate(
    () => (window as Window & { __bevisaFrameDeltas?: number[] }).__bevisaFrameDeltas ?? [],
  )
  return 1000 / (deltas.reduce((sum, delta) => sum + delta, 0) / deltas.length)
}

test('renders the full narrative without horizontal overflow', async ({ page }) => {
  await page.goto('./')
  await expect(page).toHaveTitle(/Bevisa/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  await expect(page.locator('#problem')).toBeVisible()
  await expect(page.locator('#process')).toBeVisible()
  await expect(page.locator('#health')).toBeVisible()
  await expect(page.locator('#sovereignty')).toBeVisible()
  await expect(page.locator('#offer')).toBeVisible()
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(overflow).toBeLessThanOrEqual(1)
})

test('keeps unconfigured launch actions honest and non-navigating', async ({ page }) => {
  await page.goto('./#offer')
  await expect(page.getByRole('button', { name: /Book a discovery call/ }).last()).toBeDisabled()
  await expect(page.getByRole('button', { name: /sample assurance report/ })).toBeDisabled()
  await expect(page.getByText(/email delivery is not active yet/i)).toBeVisible()
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0)
})

test('resolves early anchor actions after the narrative loads', async ({ page }) => {
  await page.goto('./')
  await page.locator('#top').getByRole('link', { name: 'Book a discovery call' }).click()
  await expect(page).toHaveURL(/#offer$/)
  await expect(page.locator('#offer')).toBeInViewport()
})

test('activates validated destinations and clipboard fallback', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium', 'One production-browser pass covers the activation build')
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true })
    Object.defineProperty(document, 'execCommand', { value: () => true, configurable: true })
  })
  await page.goto('http://127.0.0.1:4174/#offer')
  await expect(page.getByRole('link', { name: /Book a discovery call/ }).last()).toHaveAttribute(
    'href',
    'https://example.test/bevisa',
  )
  await expect(page.getByRole('link', { name: /sample assurance report/ }).last()).toHaveAttribute(
    'href',
    'https://example.test/sample-report.pdf',
  )
  await page.getByRole('button', { name: /Copy email address/ }).click()
  await expect(page.getByRole('button', { name: /Copied/ })).toBeVisible()
})

test('supports language switching and keyboard entry', async ({ page }) => {
  await page.goto('./')
  const skipLink = page.getByRole('link', { name: /Skip to content/ })
  await skipLink.focus()
  await expect(skipLink).toBeFocused()
  const menuButton = page.getByRole('button', { name: /Open navigation/ })
  if (await menuButton.isVisible()) await menuButton.click()
  await page.getByRole('button', { name: 'SV' }).first().click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Vinn upphandlingen')
  await expect(page.locator('html')).toHaveAttribute('lang', 'sv')
})

test('uses static records for reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('./')
  await expect(page.locator('img[src*="fallback-frames"]')).toHaveCount(6)
  await expect(page.getByText(/One evidence chain/)).toBeVisible()
})

test('uses static records when WebGL is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function (type: string, ...args: unknown[]) {
      if (type === 'webgl' || type === 'webgl2') return null
      return original.call(this, type as never, ...(args as []))
    } as typeof HTMLCanvasElement.prototype.getContext
  })
  await page.goto('./')
  await expect(page.locator('img[src*="fallback-frames"]')).toHaveCount(6)
})

test('recovers from a lost WebGL context with readable fallbacks', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium', 'Chromium covers the runtime context-loss path')
  await page.goto('./')
  const canvas = page.locator('#top canvas')
  await expect(canvas).toBeVisible()
  await canvas.evaluate((element) => element.dispatchEvent(new Event('webglcontextlost', { cancelable: true })))
  await expect(page.locator('img[src*="fallback-frames"]')).toHaveCount(6)
})

test('keeps the WebGL narrative reversible at interactive frame rates', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium', 'Desktop Chromium measures the WebGL path')
  await page.goto('./')
  await expect(page.locator('#top canvas')).toBeVisible()
  const heroFps = await sampleHero(page)
  const stage = page.getByTestId('pipeline-stage')
  await expect(stage).toBeVisible()
  const start = await stage.evaluate((element) => element.getBoundingClientRect().top + window.scrollY)
  const end = await page.evaluate((stageTop) => stageTop + window.innerHeight * 3.95, start)
  const forwardFps = await scrub(page, start, end)
  await expect(page.getByTestId('pipeline-active-title')).toHaveText('Approve & export')
  const reverseFps = await scrub(page, end, start)
  await expect(page.getByTestId('pipeline-active-title')).toHaveText('Ingest')
  console.info(`Frame pacing (fps): hero=${heroFps.toFixed(1)}, forward=${forwardFps.toFixed(1)}, reverse=${reverseFps.toFixed(1)}`)
  await testInfo.attach('pipeline-frame-pacing.json', {
    body: JSON.stringify({ heroFps, forwardFps, reverseFps }, null, 2),
    contentType: 'application/json',
  })
  // Shared CI runners use software WebGL. The test is isolated there and keeps
  // a 30 fps interactivity floor; GPU-backed local runs retain the 50 fps gate.
  const minimumFps = process.env.CI ? 30 : 50
  expect(Math.min(heroFps, forwardFps, reverseFps)).toBeGreaterThanOrEqual(minimumFps)
})

test('maintains mobile frame pacing with static scene fallbacks', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'The mobile project measures the fallback path')
  await page.goto('./')
  await expect(page.locator('#offer')).toBeAttached()
  const mobileFps = await scrub(page, 0, 2200)
  console.info(`Mobile fallback frame pacing (fps): ${mobileFps.toFixed(1)}`)
  await testInfo.attach('mobile-frame-pacing.json', {
    body: JSON.stringify({ mobileFps }, null, 2),
    contentType: 'application/json',
  })
  expect(mobileFps).toBeGreaterThanOrEqual(30)
})

test('expands and collapses mobile evidence records with the keyboard', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'The mobile project owns the compact evidence list')
  await page.clock.setFixedTime(new Date('2026-07-15T08:00:00Z'))
  await page.goto('./#health')
  const rows = page.locator('#health ul > li')
  await expect(rows).toHaveCount(6)
  const showAll = page.getByRole('button', { name: 'Show all' })
  await showAll.focus()
  await page.keyboard.press('Enter')
  await expect(rows).toHaveCount(12)
  // Filtering keeps operating on the complete record set, not the visible slice.
  await page.getByRole('button', { name: 'Next 90 days' }).click()
  await expect(rows).toHaveCount(3)
  await page.getByRole('button', { name: 'All evidence' }).click()
  await expect(rows).toHaveCount(12)
  const showLess = page.getByRole('button', { name: 'Show less' })
  await showLess.focus()
  await page.keyboard.press('Enter')
  await expect(rows).toHaveCount(6)
})

test('keeps keyboard focus visibly outlined', async ({ page }) => {
  await page.goto('./')
  await page.keyboard.press('Tab')
  // WebKit tabs past links by platform convention, so assert the ring on
  // whichever interactive control keyboard focus lands on first.
  const focusRing = await page.evaluate(() => {
    const element = document.activeElement
    if (!(element instanceof HTMLElement) || element === document.body) return null
    const style = getComputedStyle(element)
    return { tag: element.tagName, outline: style.outlineStyle, width: Number.parseFloat(style.outlineWidth) }
  })
  expect(['A', 'BUTTON']).toContain(focusRing?.tag)
  expect(focusRing?.outline).toBe('solid')
  expect(focusRing?.width ?? 0).toBeGreaterThan(0)
})

test('provides the complete English content without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:4173/')
  await expect(page.getByRole('heading', { level: 1, name: /Win the tender before you write it/ })).toBeVisible()
  await expect(page.getByText(/Bevisa provides decision support/)).toHaveCount(2)
  await context.close()
})

test('passes automated accessibility checks', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('./')
  await expect(page.locator('#offer')).toBeAttached()
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})

test('serves a semantic branded 404', async ({ page }) => {
  const response = await page.goto('./404.html')
  expect(response?.ok()).toBe(true)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('evidence path')
  await expect(page.getByRole('link', { name: /Return to Bevisa/ })).toHaveAttribute('href', './')
})
