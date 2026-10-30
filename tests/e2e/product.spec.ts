import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const width of [390, 1440]) {
  test(`product selection and keyboard-accessible image preview work at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/products/moong-dal')
    const pack = page.getByRole('button', { name: '8 lb', exact: true })
    await pack.click()
    await expect(pack).toHaveAttribute('aria-pressed', 'true')
    const quote = page.getByRole('link', { name: 'Request Quote', exact: true })
    await expect(quote).toHaveAttribute(
      'href',
      '/request-quote?product=moong-dal&pack=8%20lb',
    )
    const zoom = page.getByRole('button', { name: 'Zoom image', exact: true })
    await zoom.click()
    const dialog = page.getByRole('dialog', { name: 'Moong Dal image preview' })
    await expect(dialog).toBeVisible()
    const audit = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(audit.violations).toEqual([])
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(zoom).toBeFocused()
    await quote.click()
    await expect(page.locator('#product')).toHaveValue('moong-dal')
    await expect(page.locator('#packFormat')).toHaveValue('8 lb')
  })
}
