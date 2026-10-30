import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const routes = [
  '/',
  '/rice',
  '/dal',
  '/about',
  '/recipes',
  '/contact',
  '/wholesale',
  '/request-quote',
  '/products/moong-dal',
  '/recipes/creamy-moong-dal-soup',
]

for (const width of [390, 1440]) {
  test(`public pages are accessible and fit a ${width}px viewport`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(180000)
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const errors: string[] = []
    const failedResponses: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('response', (response) => {
      if (response.status() >= 400 && !response.url().includes('favicon'))
        failedResponses.push(`${response.status()} ${response.url()}`)
    })
    const audits = []
    for (const route of routes) {
      const response = await page.goto(route)
      expect(response?.status(), route).toBe(200)
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
      await expect(page.getByRole('main')).toHaveAttribute('id', 'main-content')
      const overflow = await page.evaluate(() => ({
        document: document.documentElement.scrollWidth,
        viewport: innerWidth,
      }))
      expect(overflow.document, route).toBeLessThanOrEqual(overflow.viewport)
      const scan = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
      audits.push({ route, violations: scan.violations })
      if (route === '/') {
        await page.evaluate(async () => {
          await document.fonts.ready
        })
        await page.screenshot({ path: `artifacts/home-${width}-viewport.png` })
      }
    }
    await testInfo.attach('accessibility-audits', {
      body: JSON.stringify(audits, null, 2),
      contentType: 'application/json',
    })
    expect(
      audits.flatMap((audit) =>
        audit.violations.map((violation) => ({
          route: audit.route,
          id: violation.id,
          nodes: violation.nodes.map((node) => ({
            target: node.target,
            failure: node.failureSummary,
          })),
        })),
      ),
    ).toEqual([])
    expect(errors).toEqual([])
    expect(failedResponses).toEqual([])
  })
}

test('mobile menu supports keyboard dismissal, navigation and narrow screens', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 })
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Open menu' })
  await toggle.click()
  await expect(
    page.getByRole('navigation', { name: 'Mobile navigation' }),
  ).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(toggle).toBeFocused()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await toggle.click()
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Dals & Pulses' })
    .click()
  await expect(page).toHaveURL(/\/dal$/)
  await expect(page.locator('.product-tile')).toHaveCount(22)
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  )
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
})

test('all homepage photography and supplied product images load', async ({
  page,
}) => {
  test.setTimeout(90000)
  await page.goto('/')
  const images = page.locator('main img')
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded()
    await expect
      .poll(
        () =>
          image.evaluate(
            (node) =>
              (node as HTMLImageElement).complete &&
              (node as HTMLImageElement).naturalWidth > 0,
          ),
        { timeout: 20000 },
      )
      .toBe(true)
  }
  await page.evaluate(() => scrollTo(0, 0))
  await page.screenshot({
    path: 'artifacts/home-desktop-full.png',
    fullPage: true,
  })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.screenshot({
    path: 'artifacts/home-mobile-full.png',
    fullPage: true,
  })
})
