import assert from 'node:assert/strict'
import test from 'node:test'
import { existsSync, readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import { getSiteUrl, createRootMetadata } from '../lib/seo'

const file = (name: string) => new URL(`../${name}`, import.meta.url)

test('homepage owns its canonical and uses the new branded social image', async () => {
  const home = await import('../app/page')
  assert.ok('metadata' in home, 'Homepage must set its own metadata')
  const metadata = home.metadata as import('next').Metadata
  assert.equal(metadata.alternates?.canonical, `${getSiteUrl()}/`)
  const root = createRootMetadata()
  assert.ok(JSON.stringify(root.openGraph).includes('/social-card.png'))
})

test('retail buyer page answers visible questions with matching truthful FAQ schema', async () => {
  assert.ok(
    existsSync(file('app/wholesale/page.tsx')),
    'Wholesale buyer page must exist',
  )
  const page = await import('../app/wholesale/page')
  const html = renderToStaticMarkup(createElement(page.default))
  assert.ok(html.includes('id="main-content"'))
  assert.ok(html.includes('buyer-checklist.html'))
  assert.ok(html.includes('product-range.csv'))
  assert.ok(
    html.includes('Costco') &&
      html.includes('Walmart') &&
      html.includes('Loblaws') &&
      html.includes('Real Canadian Superstore'),
  )
  const schemas = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].map((match) => JSON.parse(match[1]))
  const faq = schemas.find((schema) => schema['@type'] === 'FAQPage')
  assert.ok(faq)
  const escape = (s: string) =>
    s
      .replaceAll('&', '&amp;')
      .replaceAll("'", '&#x27;')
      .replaceAll('"', '&quot;')
  for (const question of faq.mainEntity) {
    assert.ok(html.includes(escape(question.name)))
    assert.ok(html.includes(escape(question.acceptedAnswer.text)))
  }
  assert.match(html, /not imply.*(?:relationship|listing|affiliation)/i)
})

test('robots exposes the matching sitemap and optional AI summary is honest', async () => {
  assert.ok(existsSync(file('app/robots.ts')), 'Robots endpoint is required')
  const { default: robots } = await import('../app/robots')
  assert.equal(robots().sitemap, `${getSiteUrl()}/sitemap.xml`)
  assert.ok(existsSync(file('public/llms.txt')))
  const text = readFileSync(file('public/llms.txt'), 'utf8')
  assert.match(text, /not.*(?:guarantee|required|requirement)/i)
  assert.match(text, /no.*(?:confirmed|verified).*retail/i)
})
