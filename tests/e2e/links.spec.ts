import { test, expect } from '@playwright/test'

test('visible internal navigation never points to a missing page or anchor', async ({
  page,
  request,
}) => {
  const links = new Set<string>()
  for (const path of [
    '/',
    '/contact',
    '/wholesale',
    '/request-quote',
    '/rice',
    '/dal',
    '/recipes',
    '/about',
  ]) {
    await page.goto(path)
    const hrefs = await page
      .locator('a[href^="/"]')
      .evaluateAll((anchors) =>
        anchors.map((anchor) => anchor.getAttribute('href')!),
      )
    hrefs.forEach((href) => links.add(href))
  }
  for (const href of links) {
    const url = new URL(href, 'http://127.0.0.1:18766')
    const response = await request.get(url.pathname + url.search)
    expect(response.status(), href).toBe(200)
    if (url.hash)
      expect(await response.text(), href).toContain(`id="${url.hash.slice(1)}"`)
  }
})
