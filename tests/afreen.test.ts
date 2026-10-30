import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  afreenDryFruitProducts,
  afreenFreshProducts,
  afreenProducts,
} from '../lib/afreen-products-data'
import { allProducts } from '../lib/products-data'
import { quoteProducts, getQuoteProductById } from '../lib/quote-products'
import { buildQuoteDraft, createQuoteForm } from '../lib/quote'
import { getSiteUrl } from '../lib/seo'
const root = new URL('../', import.meta.url)
const file = (name: string) => new URL(name, root)

test('Afreen supplier-partner catalogue imports all source products and images', () => {
  assert.equal(afreenProducts.length, 12)
  assert.equal(afreenDryFruitProducts.length, 3)
  assert.equal(afreenFreshProducts.length, 9)
  for (const product of afreenProducts) {
    assert.ok(existsSync(file(`public${product.image}`)), product.id)
    assert.match(product.en.description, /retail|produce|fruit|nut/i)
  }
})

test('Afreen partner products are included in the local quote workflow without inventing pack sizes', () => {
  const product = getQuoteProductById('afreen-walnut')
  assert.ok(product)
  assert.equal(product.packages.length, 0)
  const form = {
    ...createQuoteForm('afreen-walnut'),
    name: 'Buyer Name',
    company: 'North Market',
    email: 'buyer@example.com',
    buyerType: 'Retail chain',
    quantity: '10 cases',
    destination: 'Toronto, ON',
  }
  const draft = buildQuoteDraft(form)
  assert.ok(draft)
  assert.match(draft.body, /Walnut · Fresh fruit and dry-fruit partner range/)
  assert.equal(quoteProducts.length, allProducts.length + afreenProducts.length)
})

test('partner routes expose distinct metadata and the required technology partner credit', async () => {
  const dry = await import('../app/dry-fruits/page')
  const fruits = await import('../app/fruits/page')
  assert.equal(dry.metadata.alternates?.canonical, `${getSiteUrl()}/dry-fruits`)
  assert.equal(fruits.metadata.alternates?.canonical, `${getSiteUrl()}/fruits`)
  assert.deepEqual(dry.metadata.title, {
    absolute: 'Dry Fruits & Nuts | KFoods',
  })
  assert.deepEqual(fruits.metadata.title, {
    absolute: 'Fresh Fruits & Produce | KFoods',
  })
  const detail = await import('../app/afreen-products/[id]/page')
  assert.deepEqual(
    detail.generateStaticParams(),
    afreenProducts.map(({ id }) => ({ id })),
  )
  const metadata = await detail.generateMetadata({
    params: Promise.resolve({ id: 'walnut' }),
  })
  assert.equal(
    metadata.alternates?.canonical,
    `${getSiteUrl()}/afreen-products/walnut`,
  )
  const home = await import('../app/page')
  const homeMarkup = renderToStaticMarkup(createElement(home.default))
  assert.equal((homeMarkup.match(/Afreen/g) || []).length, 1)
  assert.match(homeMarkup, /FRUITS &amp; DRY FRUIT PARTNER/)
  assert.match(homeMarkup, /TECH PARTNER/)
  assert.doesNotMatch(homeMarkup, /PARTNER RANGE \/ FRESH PRODUCE/)
  assert.match(homeMarkup, /Tech partner:/)
  assert.match(homeMarkup, /EasyTask AI Corp\./)
  const footer = readFileSync(file('components/footer.tsx'), 'utf8')
  assert.match(footer, /Tech partner:/)
  assert.match(footer, /EasyTask AI Corp\./)
})

test('partner quote links use the partner ID and are rendered as safe HTML', async () => {
  const route = await import('../app/afreen-products/[id]/page')
  const html = renderToStaticMarkup(
    await route.default({ params: Promise.resolve({ id: 'orange' }) }),
  )
  assert.match(html, /request-quote\?product=afreen-orange/)
  assert.match(html, /AI-generated illustrative image/)
  assert.match(
    html,
    /Availability, presentation and commercial terms to be confirmed/,
  )
  assert.doesNotMatch(html, /offers|aggregateRating|In Stock|Out of Stock/i)
})

test('homepage ends its main content with one compact, text-only partner credit', async () => {
  const home = await import('../app/page')
  const html = renderToStaticMarkup(createElement(home.default))
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'))
  const credit = main.slice(main.lastIndexOf('<section'))
  assert.match(credit, /OUR PARTNERS/)
  assert.match(credit, /Afreen/)
  assert.match(credit, /FRUITS &amp; DRY FRUIT PARTNER/)
  assert.match(credit, /EasyTask AI Corp\./)
  assert.match(credit, /TECH PARTNER/)
  assert.doesNotMatch(
    credit,
    /Stronger together|Focused on what matters|>AF<|>ET</,
  )
  assert.equal((main.match(/Afreen/g) || []).length, 1)
})

test('fresh and dry-fruit catalogue cards use plain details labels without entry counts', async () => {
  const { AfreenProductCatalogue } =
    await import('../components/afreen-product-catalogue')
  for (const [category, products] of [
    ['fresh', afreenFreshProducts],
    ['dry', afreenDryFruitProducts],
  ] as const) {
    const html = renderToStaticMarkup(
      createElement(AfreenProductCatalogue, {
        title: 'Products',
        intro: 'Explore our selection',
        products,
        category,
      }),
    )
    assert.doesNotMatch(
      html,
      /partner range entries|Details confirmed per enquiry|View partner details/,
    )
    assert.equal((html.match(/View details/g) || []).length, products.length)
  }
})

test('Our Story introduces fresh fruit and dry fruits without claiming them as KFoods own products', async () => {
  const about = await import('../app/about/page')
  const html = renderToStaticMarkup(createElement(about.default))
  assert.match(html, /fresh fruit/i)
  assert.match(html, /dry fruit/i)
  assert.match(html, /href="\/fruits"/)
  assert.match(html, /href="\/dry-fruits"/)
  assert.match(html, /partner/i)
})
