import { test, expect } from '@playwright/test'
import { afreenProducts } from '../../lib/afreen-products-data'
import { allProducts } from '../../lib/products-data'
import { recipes } from '../../lib/recipes-data'

// Only local GET requests. No customer data, email sends or production systems.
test('every product and recipe resolves with an individual canonical and crawlable identity', async ({
  request,
}) => {
  test.setTimeout(120000)
  for (const item of [
    ...allProducts.map((product) => ({
      path: `/products/${product.id}`,
      name: product.name,
    })),
    ...afreenProducts.map((product) => ({
      path: `/afreen-products/${product.id}`,
      name: product.en.name,
    })),
    ...recipes.map((recipe) => ({
      path: `/recipes/${recipe.id}`,
      name: recipe.title,
    })),
  ]) {
    const response = await request.get(item.path)
    expect(response.status(), item.path).toBe(200)
    const html = await response.text()
    expect(html).toContain('rel="canonical"')
    expect(html).toContain(item.path)
    expect(html).toContain(item.name.replaceAll('&', '&amp;'))
    expect(html).toContain('application/ld+json')
  }
  expect((await request.get('/products/not-a-product')).status()).toBe(404)
})

test('discovery files, social image, buyer resources and security headers are served', async ({
  request,
}) => {
  const paths = [
    '/robots.txt',
    '/sitemap.xml',
    '/llms.txt',
    '/social-card.png',
    '/buyer-checklist.html',
    '/product-range.csv',
  ]
  for (const path of paths)
    expect((await request.get(path)).status(), path).toBe(200)
  const response = await request.get('/')
  expect(response.headers()['x-content-type-options']).toBe('nosniff')
  expect(response.headers()['x-frame-options']).toBe('SAMEORIGIN')
  expect(response.headers()['x-powered-by']).toBeUndefined()
  const sitemap = await (await request.get('/sitemap.xml')).text()
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  )
  expect(new Set(urls).size).toBe(urls.length)
  for (const product of allProducts)
    expect(urls.some((url) => url.endsWith(`/products/${product.id}`))).toBe(
      true,
    )
  for (const product of afreenProducts)
    expect(
      urls.some((url) => url.endsWith(`/afreen-products/${product.id}`)),
    ).toBe(true)
  for (const recipe of recipes)
    expect(urls.some((url) => url.endsWith(`/recipes/${recipe.id}`))).toBe(true)
})
