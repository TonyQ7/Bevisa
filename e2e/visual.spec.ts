import { expect, test, type Page } from '@playwright/test'

// Deterministic section-level baselines. Reduced motion pins every reveal and
// swaps the WebGL scenes for the generated SVG frames; the fixed clock pins the
// Evidence Health renewal horizons. Baselines are captured on the local Windows
// workstation, so the suite is skipped on CI runners (different rasterizer).
const FIXED_TIME = new Date('2026-07-15T08:00:00Z')

const VIEWPORTS = [
  { label: '390', width: 390, height: 844 },
  { label: '768', width: 768, height: 1024 },
  { label: '1440', width: 1440, height: 900 },
] as const

const SECTIONS = [
  ['hero', '#top'],
  ['problem', '#problem'],
  ['health', '#health'],
  ['sovereignty', '#sovereignty'],
  ['stack', '#stack'],
  ['offer', '#offer'],
] as const

async function openNarrative(page: Page, locale: 'en' | 'sv'): Promise<void> {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  // A plain Date shim pins the Evidence Health horizons without Playwright's
  // clock instrumentation, which can defer the renderer's font-swap repaint.
  await page.addInitScript((fixed) => {
    const NativeDate = Date
    class FixedDate extends NativeDate {
      constructor(...args: ConstructorParameters<typeof Date>) {
        if (args.length === 0) super(fixed)
        else super(...args)
      }
      static override now(): number {
        return fixed
      }
    }
    window.Date = FixedDate as DateConstructor
  }, FIXED_TIME.valueOf())
  await page.addInitScript((value) => window.localStorage.setItem('bevisa-locale', value), locale)

  // A late font swap after first paint re-shapes text at an unpredictable
  // moment, which is the one nondeterminism screenshots keep catching. The
  // first navigation exists purely to pull every face into the HTTP cache; the
  // second starts with cached fonts, so they apply at first paint and no
  // post-paint swap can race the captures.
  const fontsSettled = async (): Promise<void> => {
    await page.waitForFunction(
      (families) =>
        families.every((family) => {
          const matching = Array.from(document.fonts).filter((face) => face.family.replaceAll('"', '') === family)
          return matching.length > 0 && matching.some((face) => face.status === 'loaded')
        }),
      ['Familjen Grotesk', 'Instrument Sans', 'Spline Sans Mono'],
    )
  }
  await page.goto('./')
  await page.mouse.wheel(0, 1)
  await expect(page.locator('#offer')).toBeAttached()
  await fontsSettled()

  await page.goto('./')
  await page.mouse.wheel(0, 1)
  await expect(page.locator('#offer')).toBeAttached()
  await page.evaluate(() => window.scrollTo(0, 0))
  await fontsSettled()
  await page.evaluate(async () => {
    await Promise.all(Array.from(document.images).map((image) => image.decode().catch(() => undefined)))
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  })
}

async function captureSection(page: Page, selector: string, name: string): Promise<void> {
  // The fixed header and skip link belong to the hero baseline only; hiding
  // them keeps every later section capture free of viewport-anchored chrome.
  const isHero = selector === '#top'
  await page.evaluate((hide) => {
    document.querySelector('header')?.style.setProperty('visibility', hide ? 'hidden' : 'visible')
    document.querySelector<HTMLElement>('.skip-link')?.style.setProperty('display', 'none')
  }, !isHero)
  const section = page.locator(selector)
  await section.scrollIntoViewIfNeeded()
  await expect(section).toBeVisible()
  await expect(section).toHaveScreenshot(name, { animations: 'disabled', caret: 'hide' })
}

test.describe('section visual regression', () => {
  test.skip(Boolean(process.env.CI), 'Baselines are rendered on the local Windows workstation')

  for (const viewport of VIEWPORTS) {
    test(`captures every English section at ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await openNarrative(page, 'en')
      for (const [name, selector] of SECTIONS) {
        await captureSection(page, selector, `${name}-${viewport.label}.png`)
      }
      const frames = page.locator('#process ol > li')
      await expect(frames).toHaveCount(5)
      for (let index = 0; index < 5; index += 1) {
        await captureSection(page, `#process ol > li >> nth=${index}`, `pipeline-frame-${index + 1}-${viewport.label}.png`)
      }
    })

    test(`captures the branded 404 at ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('./404.html')
      await expect(page.getByRole('link')).toBeVisible()
      await expect(page).toHaveScreenshot(`not-found-${viewport.label}.png`, { animations: 'disabled', fullPage: true })
    })
  }

  test('captures every Swedish section at 1440', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await openNarrative(page, 'sv')
    await expect(page.locator('html')).toHaveAttribute('lang', 'sv')
    for (const [name, selector] of SECTIONS) {
      await captureSection(page, selector, `${name}-sv-1440.png`)
    }
  })
})
