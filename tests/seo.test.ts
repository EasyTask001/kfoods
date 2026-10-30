import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const projectFile = (path: string) =>
  fileURLToPath(new URL(`../${path}`, import.meta.url))
const source = (path: string) => readFileSync(projectFile(path), 'utf8')

test('canonical site origin is configurable and never defaults to localhost', async () => {
  assert.ok(
    existsSync(projectFile('lib/seo.ts')),
    'A central SEO module must exist',
  )
  const { resolveSiteUrl } = await import('../lib/seo')
  assert.equal(resolveSiteUrl(undefined), 'https://kfoods.us')
  assert.equal(
    resolveSiteUrl('https://catalog.example/'),
    'https://catalog.example',
  )
  for (const invalid of [
    'http://localhost:3000',
    'javascript:alert(1)',
    'not-a-url',
    'https://user:pass@example.com',
    'https://example.com/nested',
    'https://example.com?preview=true',
  ]) {
    assert.throws(() => resolveSiteUrl(invalid), /NEXT_PUBLIC_SITE_URL/)
  }
})

test('page metadata has route-specific canonical and consistent social previews', async () => {
  const seo = await import('../lib/seo')
  assert.equal(
    typeof seo.createPageMetadata,
    'function',
    'Shared page metadata builder is required',
  )
  const metadata = seo.createPageMetadata({
    title: 'Basmati Rice',
    description: 'Explore the rice catalog.',
    path: '/rice',
    image: '/rice-hero.jpg',
  })
  const base = seo.resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
  assert.equal(metadata.alternates?.canonical, `${base}/rice`)
  assert.deepEqual(metadata.title, { absolute: 'Basmati Rice | KFoods' })
  assert.equal(metadata.openGraph?.url, `${base}/rice`)
  assert.equal(metadata.openGraph?.title, 'Basmati Rice | KFoods')
  assert.ok(metadata.twitter && 'card' in metadata.twitter)
  assert.equal(metadata.twitter.card, 'summary_large_image')
  assert.equal(metadata.description, 'Explore the rice catalog.')
  assert.match(
    source('lib/seo.ts'),
    /provisional fallback[\s\S]*NOT a verified deployment/,
  )
})

test('product schema preserves catalog facts without inventing commerce or inventory claims', async () => {
  const seo = await import('../lib/seo')
  assert.equal(typeof seo.productJsonLd, 'function')
  const { allProducts } = await import('../lib/products-data')
  const base = seo.getSiteUrl()
  for (const product of allProducts) {
    const schema = seo.productJsonLd(product)
    assert.equal(schema['@type'], 'Product')
    assert.equal(schema.name, product.name)
    assert.equal(schema.description, product.description)
    assert.equal(schema.url, `${base}/products/${product.id}`)
    assert.equal(schema.image, new URL(product.image, `${base}/`).toString())
    assert.deepEqual(
      schema.additionalProperty.map(
        (property: { value: string }) => property.value,
      ),
      product.packages.map((pkg) => pkg.weight),
    )
    for (const field of [
      'offers',
      'aggregateRating',
      'review',
      'gtin',
      'gtin13',
      'gtin14',
      'sku',
      'availability',
      'hasCertification',
    ]) {
      assert.equal(
        Object.hasOwn(schema, field),
        false,
        `${field} must not be invented for ${product.id}`,
      )
    }
  }
})

test('JSON-LD renderer safely embeds breadcrumb data without script injection', async () => {
  assert.ok(
    existsSync(projectFile('components/structured-data.tsx')),
    'Reusable server JSON-LD renderer is required',
  )
  const { StructuredData } = await import('../components/structured-data')
  const { breadcrumbJsonLd, getSiteUrl } = await import('../lib/seo')
  const unsafeName = 'Rice </script><script>alert("x")</script>&\u2028'
  const schema = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: unsafeName, path: '/rice' },
  ])
  assert.deepEqual(
    schema.itemListElement.map((item) => item.position),
    [1, 2],
  )
  assert.equal(schema.itemListElement[1].item, `${getSiteUrl()}/rice`)
  const markup = renderToStaticMarkup(
    createElement(StructuredData, { id: 'breadcrumb-data', data: schema }),
  )
  assert.equal((markup.match(/<script\b/g) || []).length, 1)
  assert.equal((markup.match(/<\/script>/g) || []).length, 1)
  assert.match(markup, /type="application\/ld\+json"/)
  const payload = markup.match(/<script[^>]*>([\s\S]*)<\/script>/)?.[1]
  assert.ok(payload)
  assert.equal(JSON.parse(payload).itemListElement[1].name, unsafeName)
  assert.doesNotMatch(payload, /[<>&\u2028\u2029]/)
})

test('product server route statically enumerates catalog items, supplies metadata and returns real 404s', async () => {
  const route = await import('../app/products/[id]/page')
  assert.equal(
    typeof route.generateStaticParams,
    'function',
    'Product page must be a server route',
  )
  const { allProducts } = await import('../lib/products-data')
  const { getSiteUrl } = await import('../lib/seo')
  assert.deepEqual(
    await route.generateStaticParams(),
    allProducts.map((product) => ({ id: product.id })),
  )
  for (const product of allProducts) {
    const metadata = await route.generateMetadata({
      params: Promise.resolve({ id: product.id }),
    })
    assert.deepEqual(metadata.title, { absolute: `${product.name} | KFoods` })
    assert.equal(
      metadata.alternates?.canonical,
      `${getSiteUrl()}/products/${product.id}`,
    )
    assert.equal(metadata.description, product.description)
  }
  const params = Promise.resolve({ id: 'not-a-catalog-product' })
  const is404 = (error: unknown) =>
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    String(error.digest).includes('404')
  await assert.rejects(route.default({ params }), is404)
  await assert.rejects(route.generateMetadata({ params }), is404)
  assert.doesNotMatch(
    source('app/products/[id]/page.tsx'),
    /['"]use client['"]|router\.push/,
  )
  const detail = source('components/product-detail.tsx')
  assert.match(detail, /id="main-content" tabIndex=\{-1\}/)
  const markup = renderToStaticMarkup(
    await route.default({ params: Promise.resolve({ id: allProducts[0].id }) }),
  )
  assert.match(markup, /Contact for Pricing<\/a>/)
  assert.match(
    markup,
    new RegExp(`href="/request-quote\\?product=${allProducts[0].id}&amp;pack=`),
  )
  assert.match(markup, /not a live inventory feed/)
  assert.doesNotMatch(markup, />In Stock<|>Out of Stock</)
  for (const text of [
    allProducts[0].name,
    allProducts[0].longDescription,
    ...allProducts[0].nutritionHighlights,
    ...(allProducts[0].cookingTips || []),
  ]) {
    assert.ok(
      markup.includes(text.replaceAll('&', '&amp;').replaceAll("'", '&#x27;')),
      `Original content must remain: ${text}`,
    )
  }
  const schemas = [
    ...markup.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].map((match) => JSON.parse(match[1]))
  assert.deepEqual(schemas.map((schema) => schema['@type']).sort(), [
    'BreadcrumbList',
    'Product',
  ])
})

test('root defaults preserve identity without leaking the homepage canonical to other routes', async () => {
  const seo = await import('../lib/seo')
  assert.equal(typeof seo.createRootMetadata, 'function')
  const metadata = seo.createRootMetadata()
  assert.equal(metadata.metadataBase?.toString(), `${seo.getSiteUrl()}/`)
  assert.equal(metadata.alternates, undefined)
  assert.equal(metadata.openGraph?.url, undefined)
  assert.equal(metadata.generator, undefined)
  const organization = seo.organizationJsonLd()
  assert.equal(organization['@type'], 'Organization')
  assert.equal(organization.alternateName, 'Kartarpur Foods')
  assert.equal(organization.logo, `${seo.getSiteUrl()}/kfoods-logo.png`)
  assert.equal(organization.email, 'info@kfoods.us')
  assert.equal(Object.hasOwn(organization, 'sameAs'), false)
  assert.equal(Object.hasOwn(organization, 'hasCertification'), false)
  const layout = source('app/layout.tsx')
  assert.match(layout, /createRootMetadata\(\)/)
  assert.match(layout, /<StructuredData[^>]+data=\{organizationJsonLd\(\)\}/)
  assert.match(layout, /Poppins|next\/font\/local/)
  assert.match(layout, /Playfair_Display|next\/font\/local/)
})

test('informational routes have unique canonicals rather than inherited homepage metadata', async () => {
  const { getSiteUrl } = await import('../lib/seo')
  const routes = ['rice', 'dal', 'about', 'contact', 'recipes']
  const canonicals = new Set()
  for (const route of routes) {
    assert.ok(
      existsSync(projectFile(`app/${route}/layout.tsx`)),
      `${route} needs route metadata`,
    )
    const { metadata } = await import(`../app/${route}/layout`)
    assert.equal(metadata.alternates?.canonical, `${getSiteUrl()}/${route}`)
    assert.equal(metadata.openGraph?.url, `${getSiteUrl()}/${route}`)
    assert.ok(metadata.description.length > 40)
    canonicals.add(metadata.alternates.canonical)
  }
  assert.equal(canonicals.size, routes.length)
})

test('individual recipe metadata uses real recipe titles, descriptions and images', async () => {
  assert.ok(
    existsSync(projectFile('app/recipes/[id]/layout.tsx')),
    'Recipe details need server metadata',
  )
  const layout = await import('../app/recipes/[id]/layout')
  const { recipes } = await import('../lib/recipes-data')
  const { getSiteUrl } = await import('../lib/seo')
  for (const recipe of recipes) {
    const metadata = await layout.generateMetadata({
      params: Promise.resolve({ id: recipe.id }),
    })
    assert.deepEqual(metadata.title, { absolute: `${recipe.title} | KFoods` })
    assert.equal(metadata.description, recipe.description)
    assert.equal(
      metadata.alternates?.canonical,
      `${getSiteUrl()}/recipes/${recipe.id}`,
    )
    assert.equal(metadata.openGraph?.url, metadata.alternates?.canonical)
  }
  await assert.rejects(
    layout.generateMetadata({
      params: Promise.resolve({ id: 'not-a-recipe' }),
    }),
    /NEXT_HTTP_ERROR_FALLBACK;404/,
  )
})

test('sitemap includes every catalog product and recipe exactly once with no fabricated modification dates', async () => {
  assert.ok(
    existsSync(projectFile('app/sitemap.ts')),
    'A generated sitemap is required',
  )
  const { default: sitemap } = await import('../app/sitemap')
  const { allProducts } = await import('../lib/products-data')
  const { afreenProducts } = await import('../lib/afreen-products-data')
  const { recipes } = await import('../lib/recipes-data')
  const { getSiteUrl } = await import('../lib/seo')
  const staticPaths = [
    '/',
    '/rice',
    '/dal',
    '/wholesale',
    '/recipes',
    '/about',
    '/contact',
    '/request-quote',
    '/fruits',
    '/dry-fruits',
  ]
  const expected = [
    ...staticPaths,
    ...allProducts.map((product) => `/products/${product.id}`),
    ...afreenProducts.map((product) => `/afreen-products/${product.id}`),
    ...recipes.map((recipe) => `/recipes/${recipe.id}`),
  ]
    .map((path) => new URL(path, `${getSiteUrl()}/`).toString())
    .sort()
  const entries = sitemap()
  assert.deepEqual(entries.map((entry) => entry.url).sort(), expected)
  assert.equal(new Set(entries.map((entry) => entry.url)).size, expected.length)
  assert.ok(
    entries.every(
      (entry) => !entry.url.includes('?') && entry.lastModified === undefined,
    ),
  )
})
