import assert from 'node:assert/strict'
import test from 'node:test'
import { allProducts } from '../lib/products-data'
import * as quote from '../lib/quote'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

function validQuote() {
  return {
    ...quote.createQuoteForm('white-basmati'),
    name: 'Amélie O’Connor',
    company: 'North Market',
    email: 'buyer@example.com',
    buyerType: 'Independent grocery',
    quantity: '20 cases',
    destination: 'Toronto, ON M5V 2T6',
  }
}

test('product preselection accepts exact catalog IDs and ignores untrusted query values', async () => {
  const { createQuoteForm } = await import('../lib/quote')

  for (const product of allProducts) {
    assert.equal(createQuoteForm(product.id).product, product.id)
  }
  for (const value of [
    undefined,
    '',
    'not-a-product',
    ' white-basmati',
    'WHITE-BASMATI',
    ['white-basmati'],
    '__proto__',
  ]) {
    assert.equal(createQuoteForm(value).product, '')
  }
})

test('validation accepts Unicode buyer names and surrounding whitespace without mutating input', () => {
  for (const name of [
    'José García',
    '李',
    'ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ',
    'أحمد علي',
    'Ame\u0301lie O’Connor',
    'Jean-Luc D’Arcy',
  ]) {
    const form = {
      ...validQuote(),
      name: `  ${name}  `,
      email: '  buyer@example.com  ',
      phone: ' +1 (440) 601-9232 ',
    }
    const snapshot = structuredClone(form)
    assert.deepEqual(quote.validateQuoteForm(form), {})
    assert.deepEqual(form, snapshot)
  }
})

test('Unicode names retain script joining marks and non-ASCII hyphens', () => {
  for (const name of ['میرا\u200cن', 'Jean\u2011Luc', '山田・太郎']) {
    assert.deepEqual(quote.validateQuoteForm({ ...validQuote(), name }), {})
  }
})

test('validation reports every required field including buyerType for blank or whitespace-only input', () => {
  const required = [
    'name',
    'company',
    'email',
    'buyerType',
    'product',
    'quantity',
    'destination',
  ] as const
  for (const field of required) {
    for (const blank of ['', '  \t ']) {
      const errors = quote.validateQuoteForm({
        ...validQuote(),
        [field]: blank,
      })
      assert.ok(errors[field], `${field} should reject blank input`)
    }
  }
  assert.deepEqual(
    Object.keys(quote.validateQuoteForm(quote.createQuoteForm())).sort(),
    [...required].sort(),
  )
})

test('validation rejects unknown catalog IDs and malformed contact values', () => {
  for (const product of [
    'retired-product',
    ' white-basmati',
    'WHITE-BASMATI',
    '__proto__',
  ]) {
    assert.ok(quote.validateQuoteForm({ ...validQuote(), product }).product)
  }
  for (const email of [
    'buyer',
    'buyer@',
    'buyer@example',
    'buyer\n@example.com',
    'buyer@example.com?bcc=other@example.com',
  ]) {
    assert.ok(quote.validateQuoteForm({ ...validQuote(), email }).email, email)
  }
  for (const phone of ['---', '+()', 'call me', '123', '+1+4406019232']) {
    assert.ok(quote.validateQuoteForm({ ...validQuote(), phone }).phone, phone)
  }
  assert.ok(quote.validateQuoteForm({ ...validQuote(), name: '---' }).name)
  assert.ok(
    quote.validateQuoteForm({ ...validQuote(), buyerType: 'not-an-option' })
      .buyerType,
  )
  assert.deepEqual(
    quote.validateQuoteForm({ ...validQuote(), phone: '   ' }),
    {},
  )
})

test('validation applies length limits even to programmatically supplied field values', () => {
  for (const [field, limit] of Object.entries(quote.QUOTE_LIMITS)) {
    const errors = quote.validateQuoteForm({
      ...validQuote(),
      [field]: 'x'.repeat(limit + 1),
    })
    assert.ok(
      errors[field as keyof typeof errors],
      `${field} should reject values beyond ${limit}`,
    )
  }
})

test('email draft has only the disclosed KFoods recipient and safely encodes buyer text', () => {
  const form = {
    ...validQuote(),
    name: '  José García  ',
    certifications: ['Organic', 'Halal'],
    message:
      'Price for 20 cases? &bcc=outsider@example.net\nCafé: 100% + delivery',
  }
  const snapshot = structuredClone(form)
  const draft = quote.buildQuoteDraft(form)
  assert.ok(draft)
  assert.equal(draft.to, 'info@kfoods.us')
  assert.equal(draft.subject, 'Wholesale inquiry — White Basmati Rice')
  assert.match(draft.body, /Name: José García\n/)
  assert.match(draft.body, /Product: White Basmati Rice \(white-basmati\)/)
  assert.match(
    draft.body,
    /Certification requirements \(buyer request, not a certification claim\): Organic, Halal/,
  )
  assert.match(
    draft.body,
    /KFoods must confirm availability and provide applicable documentation\./,
  )
  assert.ok(draft.body.includes(form.message))
  assert.equal(
    draft.text,
    `To: ${draft.to}\nSubject: ${draft.subject}\n\n${draft.body}`,
  )

  const mailto = new URL(draft.mailtoUrl)
  assert.equal(mailto.protocol, 'mailto:')
  assert.equal(mailto.pathname, 'info@kfoods.us')
  assert.deepEqual([...mailto.searchParams.keys()].sort(), ['body', 'subject'])
  assert.equal(mailto.searchParams.get('subject'), draft.subject)
  assert.equal(mailto.searchParams.get('body'), draft.body)

  const gmail = new URL(draft.gmailUrl)
  assert.equal(gmail.origin, 'https://mail.google.com')
  assert.equal(gmail.searchParams.get('to'), 'info@kfoods.us')
  assert.equal(gmail.searchParams.get('body'), draft.body)
  assert.deepEqual([...gmail.searchParams.keys()].sort(), [
    'body',
    'fs',
    'su',
    'to',
    'view',
  ])
  assert.equal(gmail.searchParams.get('view'), 'cm')
  assert.equal(gmail.searchParams.get('su'), draft.subject)
  assert.deepEqual(form, snapshot)
})

test('invalid buyer details cannot produce an email draft', () => {
  assert.equal(quote.buildQuoteDraft(quote.createQuoteForm()), null)
  assert.equal(
    quote.buildQuoteDraft({ ...validQuote(), product: 'not-in-the-catalog' }),
    null,
  )
})

test('package preselection accepts only a listed weight for the selected product', () => {
  assert.equal(
    quote.createQuoteForm('white-basmati', '20 lb').packFormat,
    '20 lb',
  )
  for (const pack of ['55 lb', ' 20 lb', ['20 lb'], '<script>']) {
    assert.equal(quote.createQuoteForm('white-basmati', pack).packFormat, '')
  }
  assert.equal(quote.createQuoteForm('unknown-product', '20 lb').packFormat, '')
})

test('optional certification and logistics choices cannot inject unsupported requirements', () => {
  assert.deepEqual(
    quote.validateQuoteForm({
      ...validQuote(),
      certifications: ['Organic', 'Halal'],
      incoterm: 'FOB',
      sampleRequest: 'Yes',
    }),
    {},
  )
  assert.ok(
    quote.validateQuoteForm({
      ...validQuote(),
      certifications: ['Made-up certification'],
    }).certifications,
  )
  assert.ok(
    quote.validateQuoteForm({ ...validQuote(), incoterm: 'unknown' }).incoterm,
  )
  assert.ok(
    quote.validateQuoteForm({ ...validQuote(), sampleRequest: 'maybe' })
      .sampleRequest,
  )
})

test('inquiry UI discloses local-only preparation and uses accessible required fields', async () => {
  const { RequestQuoteForm } = await import('../components/request-quote-form')
  const html = renderToStaticMarkup(
    createElement(RequestQuoteForm, {
      initialProduct: 'white-basmati',
      initialPack: '20 lb',
    }),
  )
  assert.match(html, /Nothing is sent from this website/)
  assert.match(html, /Prepare email draft/)
  assert.match(html, /novalidate=""/i)
  assert.match(html, /id="name"[^>]*aria-describedby="name-help"/)
  assert.match(html, /id="company"[^>]*required=""/)
  assert.match(html, /id="buyerType"[^>]*required=""/)
  assert.match(html, /option value="white-basmati" selected=""/)
  assert.match(html, /id="packFormat"[^>]*value="20 lb"/)
  assert.match(
    html,
    /KFoods must confirm availability and provide applicable documentation/,
  )
  assert.doesNotMatch(html, /on its way|request will be sent|diljeet@|bcc=/i)
})

test('quote route has its own canonical, a skip-link target, a real phone link and query preselection', async () => {
  const route = await import('../app/request-quote/page')
  assert.equal(
    route.metadata.alternates?.canonical,
    `${(await import('../lib/seo')).getSiteUrl()}/request-quote`,
  )
  const html = renderToStaticMarkup(
    await route.default({
      searchParams: Promise.resolve({
        product: 'white-basmati',
        pack: '20 lb',
      }),
    }),
  )
  assert.match(html, /<main[^>]*id="main-content"[^>]*tabindex="-1"/i)
  assert.match(html, /href="tel:\+14406019232"/)
  assert.match(html, /option value="white-basmati" selected=""/)
  assert.match(html, /id="packFormat"[^>]*value="20 lb"/)
  assert.doesNotMatch(html, /tel:[^"]*\*/)
})

test('contact page exposes actual contact details without generic social links or unverified hours', async () => {
  const route = await import('../app/contact/page')
  assert.equal(route.metadata.alternates?.canonical, '/contact')
  const html = renderToStaticMarkup(createElement(route.default))
  const main = html.match(/<main\b[\s\S]*<\/main>/i)?.[0]
  assert.ok(main, 'Contact page needs a main landmark')
  assert.match(main, /id="main-content"[^>]*tabindex="-1"/i)
  assert.match(main, /href="mailto:info@kfoods.us"/)
  assert.match(main, /href="tel:\+14406019232"/)
  assert.match(main, /8866 Commons Blvd, Suite 101/)
  assert.match(main, /Twinsburg, Ohio 44087/)
  assert.match(main, /href="\/request-quote"/)
  assert.doesNotMatch(
    main,
    /facebook\.com|instagram\.com|twitter\.com|Business Hours|9:00 AM|quick responses/i,
  )
})
