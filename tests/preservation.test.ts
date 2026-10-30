import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { afreenProducts } from '../lib/afreen-products-data'
import { allProducts } from '../lib/products-data'

const file = (name: string) => new URL(`../${name}`, import.meta.url)

test('original logo, supplied public assets and catalogue data remain byte-identical', () => {
  const manifest = JSON.parse(
    readFileSync(file('tests/fixtures/original-assets.sha256.json'), 'utf8'),
  ) as Record<string, string>
  for (const [name, expected] of Object.entries(manifest)) {
    assert.equal(
      createHash('sha256')
        .update(readFileSync(file(name)))
        .digest('hex'),
      expected,
      name,
    )
  }
})

test('new CSV contains every existing product path and no price or live-stock column', () => {
  const csv = readFileSync(file('public/product-range.csv'), 'utf8')
  assert.equal(
    csv.trim().split('\r\n').length,
    allProducts.length + afreenProducts.length + 1,
  )
  for (const product of allProducts)
    assert.ok(csv.includes(`/products/${product.id}`), product.id)
  for (const product of afreenProducts)
    assert.ok(csv.includes(`/afreen-products/${product.id}`), product.id)
  assert.match(csv, /Fresh fruit and dry-fruit partner range/)
  assert.doesNotMatch(csv.split('\r\n')[0], /price|stock|certif/i)
})

test('legacy API placeholder fails closed and cannot impersonate authentication', () => {
  const legacyApi = readFileSync(file('api.js'), 'utf8')
  assert.doesNotMatch(legacyApi, /mock-token|success:\s*true/)
  assert.match(legacyApi, /fail closed|No authenticated KFoods API client/)
})
