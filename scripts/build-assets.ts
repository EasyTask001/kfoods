import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { allProducts } from '../lib/products-data'
import { afreenProducts } from '../lib/afreen-products-data'

const root = path.resolve(process.cwd())

async function main() {
  const output = path.join(root, 'public')
  await mkdir(output, { recursive: true })

  // New derivative only: neither the logo nor the supplied photograph is overwritten.
  const photo = await sharp(path.join(output, 'hero-bg.jpg'))
    .resize(520, 630, { fit: 'cover' })
    .png()
    .toBuffer()
  const logo = await sharp(path.join(output, 'kfoods-logo.png'))
    .resize(145, 90, { fit: 'inside' })
    .png()
    .toBuffer()
  const typography = Buffer.from(
    `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="680" height="630" fill="#faf8f2"/><text x="60" y="235" font-family="Georgia, serif" font-size="69" fill="#173e2c">Good food.</text><text x="60" y="320" font-family="Georgia, serif" font-size="69" fill="#173e2c">Every table.</text><text x="63" y="401" font-family="sans-serif" font-size="22" fill="#59645b">Basmati rice, dals &amp; pulses.</text><text x="63" y="548" font-family="sans-serif" font-size="17" letter-spacing="3" fill="#806328">KARTARPUR FOODS</text></svg>`,
  )
  await sharp({
    create: { width: 1200, height: 630, channels: 3, background: '#faf8f2' },
  })
    .composite([
      { input: photo, left: 680, top: 0 },
      { input: typography, left: 0, top: 0 },
      { input: logo, left: 60, top: 48 },
    ])
    .png()
    .toFile(path.join(output, 'social-card.png'))

  const cell = (value: string) => `"${value.replaceAll('"', '""')}"`
  const rows = [
    [
      'Product',
      'Category',
      'Listed package sizes',
      'Description',
      'Product path',
      'Catalogue note',
    ],
    ...allProducts.map((product) => [
      product.name,
      product.category,
      product.packages.map((pack) => pack.weight).join(' / '),
      product.description,
      `/products/${product.id}`,
      '',
    ]),
    ...afreenProducts.map((product) => [
      product.en.name,
      product.category === 'dry' ? 'dry fruits' : 'fresh produce',
      '',
      `${product.en.description} Fresh fruit and dry-fruit partner range; confirm availability, origin, presentation and commercial terms with K Foods.`,
      `/afreen-products/${product.id}`,
      'Fresh fruit and dry-fruit partner range; confirm availability, origin, presentation and commercial terms with K Foods.',
    ]),
  ]
  await writeFile(
    path.join(output, 'product-range.csv'),
    '\uFEFF' + rows.map((row) => row.map(cell).join(',')).join('\r\n') + '\r\n',
  )
  console.log(
    `Created social-card.png (1200×630) and product-range.csv (${allProducts.length + afreenProducts.length} products). Original assets unchanged.`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
