import { test, expect } from '@playwright/test'

test('desktop buyer can discover the catalogue and wholesale information', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/')
  await page.screenshot({ path: 'artifacts/home-desktop.png', fullPage: true })
  await expect(
    page.getByRole('navigation', { name: 'Main navigation' }),
  ).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Good food',
  )
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Wholesale' })
    .click()
  await expect(page).toHaveURL(/\/wholesale$/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  expect(errors).toEqual([])
})

test('catalogue content stays visible without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('/rice')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('.product-tile')).toHaveCount(11)
  await context.close()
})
