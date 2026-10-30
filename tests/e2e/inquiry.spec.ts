import { test, expect } from '@playwright/test'
import { readFile } from 'node:fs/promises'

for (const width of [390, 1440]) {
  test(`buyer draft stays local, validates and preserves inputs at ${width}px`, async ({
    page,
    context,
    baseURL,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    const external: string[] = []
    await context.route('**/*', (route) => {
      const url = route.request().url()
      if (url.startsWith(baseURL!) || url.startsWith('data:'))
        return route.continue()
      external.push(url)
      return route.abort()
    })
    await page.goto('/request-quote?product=not-a-product')
    await expect(page.locator('#product')).toHaveValue('')
    await page
      .getByRole('button', { name: 'Prepare email draft', exact: true })
      .click()
    await expect(page.locator('#name')).toBeFocused()
    await expect(page.locator('#buyerType')).toHaveAttribute(
      'aria-invalid',
      'true',
    )
    await page.goto('/request-quote?product=moong-dal&pack=8%20lb')
    await expect(page.locator('#packFormat')).toHaveValue('8 lb')
    await page.locator('#name').fill('李')
    await page.locator('#company').fill('Example Grocery')
    await page.locator('#email').fill('invalid')
    await page.locator('#buyerType').selectOption('Retail chain')
    await page.locator('#quantity').fill('20 cases')
    await page.locator('#destination').fill('Toronto, ON, Canada')
    await page
      .getByRole('button', { name: 'Prepare email draft', exact: true })
      .click()
    await expect(page.locator('#email')).toBeFocused()
    await expect(page.locator('#draft-heading')).toHaveCount(0)
    await page.locator('#email').fill('buyer@example.com')
    const message =
      'Please quote. &bcc=outsider@example.net <script>not HTML</script>'
    await page.locator('#message').fill(message)
    const before = external.length
    await page
      .getByRole('button', { name: 'Prepare email draft', exact: true })
      .click()
    await expect(page.locator('#draft-heading')).toBeFocused()
    await expect(page.locator('#draft-heading')).toContainText('not sent')
    expect(external.length).toBe(before)
    expect(context.pages()).toHaveLength(1)
    await expect(page.locator('#name')).toHaveValue('李')
    const draft = await page.locator('#quote-draft').inputValue()
    expect(draft).toContain(message)
    const mailto = new URL(
      (await page
        .getByRole('link', { name: 'Open in my email app' })
        .getAttribute('href'))!,
    )
    expect(mailto.pathname).toBe('info@kfoods.us')
    expect([...mailto.searchParams.keys()].sort()).toEqual(['body', 'subject'])
    expect(mailto.searchParams.get('body')).toContain(message)
    const downloadPromise = page.waitForEvent('download')
    await page.getByRole('link', { name: 'Download .txt', exact: true }).click()
    const download = await downloadPromise
    expect(await readFile((await download.path())!, 'utf8')).toBe(draft)
    await page.evaluate(() =>
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async () => {
            throw new Error('Permission denied in test')
          },
        },
      }),
    )
    await page.getByRole('button', { name: 'Copy draft' }).click()
    await expect(page.getByRole('status')).toContainText(
      'Clipboard access is unavailable',
    )
    expect(
      await page.locator('#quote-draft').evaluate((element) => {
        const textarea = element as HTMLTextAreaElement
        return textarea.selectionEnd - textarea.selectionStart
      }),
    ).toBe(draft.length)
    await page.getByText('Use Gmail instead', { exact: true }).click()
    await expect(page.locator('#gmail-disclosure')).toContainText(
      'shares this draft with Google',
    )
    const gmail = new URL(
      (await page
        .getByRole('link', { name: 'Open Gmail draft (new tab)', exact: true })
        .getAttribute('href'))!,
    )
    expect(gmail.hostname).toBe('mail.google.com')
    expect(gmail.searchParams.get('to')).toBe('info@kfoods.us')
    expect(gmail.searchParams.has('bcc')).toBe(false)
    // Deliberately do not launch an external email service or send anything.
    await page.locator('#company').fill('Updated Example Grocery')
    await expect(page.locator('#draft-heading')).toHaveCount(0)
    await expect(page.locator('#name')).toHaveValue('李')
    await page
      .getByRole('button', { name: 'Prepare email draft', exact: true })
      .click()
    await expect(page.locator('#quote-draft')).toHaveValue(
      /Updated Example Grocery/,
    )
  })
}
