import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { dalsProducts, riceProducts } from '@/lib/products-data'
import { recipes } from '@/lib/recipes-data'
import { createPageMetadata } from '@/lib/seo'
import { StructuredData } from '@/components/structured-data'

export const metadata = createPageMetadata({
  title: 'Basmati Rice, Dals, Fruits & Dry Fruits for Wholesale Buyers',
  description:
    'Explore K Foods basmati rice, dals, pulses and a partner range of fresh fruits and dry fruits for retail and wholesale conversations in North America.',
  path: '/',
})

const featured = [
  riceProducts[5],
  dalsProducts[0],
  dalsProducts[5],
  dalsProducts[3],
]
const questions = [
  [
    'What does K Foods offer?',
    'K Foods, also known as Kartarpur Foods, offers basmati rice, dals, lentils, beans and pulses, plus a partner range of fresh fruits and dry fruits. Browse each collection for its product details and confirmed enquiry information.',
  ],
  [
    'What fresh fruits and dry fruits are available?',
    'The partner range includes oranges, apples, mandarins, grapes, grapefruit, avocados, lemons, beetroot, cherries, walnuts, raisins and almonds. Varieties, presentation, availability, origin and commercial terms are confirmed for each inquiry; the images are illustrative.',
  ],
  [
    'How can a retail or wholesale buyer request pricing?',
    'Use the quote form to prepare an email inquiry with your selected product, quantity and delivery destination. Send the draft to info@kfoods.us to discuss pricing and availability.',
  ],
  [
    'Are bulk package sizes listed?',
    'Yes. Selected products list larger packs, including 20 lb, 40 lb and 55 lb formats. Sizes differ by product. Confirm current availability, case configuration and order requirements with the team.',
  ],
  [
    'Is K Foods available at major grocery chains?',
    'A listing with any particular retailer is not confirmed on this website. For current stockists, or to discuss a new retail listing in Canada or the United States, contact K Foods directly.',
  ],
]

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <StructuredData
          id="home-faq"
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: questions.map(([name, text]) => ({
              '@type': 'Question',
              name,
              acceptedAnswer: { '@type': 'Answer', text },
            })),
          }}
        />
        <section className="home-hero">
          <div className="site-shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span /> KARTARPUR FOODS
              </p>
              <h1>
                Good food.
                <br />
                Made for
                <br />
                <em>every table.</em>
              </h1>
              <p className="hero-description">
                Fragrant basmati. Wholesome dals. Everyday essentials, rooted in
                the flavours of South Asia.
              </p>
              <p className="hero-trade">
                Explore rice, lentils and pulses for your kitchen — or your next
                retail and wholesale conversation in the US and Canada.
              </p>
              <div className="button-row">
                <Link href="#products" className="site-button">
                  Explore our products{' '}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link href="/wholesale" className="text-link">
                  For your business{' '}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>
              <div className="hero-footnote">
                <span>TRADITION IN EVERY GRAIN</span>
                <span>RICE · DALS · PULSES</span>
              </div>
            </div>
            <div className="hero-visual">
              <Image
                src="/hero-bg.jpg"
                alt="Rice and spices in traditional brass bowls"
                fill
                priority
                sizes="(max-width: 800px) 100vw, 50vw"
                className="hero-photo"
              />
              <div className="hero-caption">
                <span>A pantry full of possibility.</span>
                <span>THE K FOODS COLLECTION</span>
              </div>
            </div>
          </div>
        </section>

        <div className="category-ribbon">
          <div className="site-shell">
            <span>BASMATI RICE</span>
            <span aria-hidden="true">✦</span>
            <span>LENTILS &amp; PULSES</span>
            <span aria-hidden="true">✦</span>
            <span>RETAIL &amp; BULK PACK FORMATS</span>
            <span aria-hidden="true">✦</span>
            <span>AUTHENTIC EVERYDAY FLAVOUR</span>
          </div>
        </div>

        <section id="products" className="section-space site-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE COLLECTION</p>
              <h2>
                Pantry staples.
                <br />
                <em>Extraordinary possibilities.</em>
              </h2>
            </div>
            <p>
              From the first fragrant spoonful to a comforting family favourite.
              Find the right rice, dal or pulse for what you’re making.
            </p>
          </div>
          <div className="collection-grid">
            <Link href="/rice" className="collection-panel">
              <div className="collection-image">
                <Image
                  src="/rice-hero.jpg"
                  alt="Basmati rice grains"
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="collection-copy">
                <div>
                  <span className="eyebrow">FRAGRANT &amp; VERSATILE</span>
                  <h3>Basmati rice</h3>
                  <p>Explore long grain, sella and brown basmati.</p>
                </div>
                <span className="circle-arrow">
                  <ArrowUpRight size={23} aria-hidden="true" />
                </span>
              </div>
            </Link>
            <Link href="/dal" className="collection-panel">
              <div className="collection-image">
                <Image
                  src="/dal-hero.jpg"
                  alt="A selection of lentils and pulses"
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="collection-copy">
                <div>
                  <span className="eyebrow">COLOURFUL &amp; COMFORTING</span>
                  <h3>Dals &amp; pulses</h3>
                  <p>Lentils, chickpeas, kidney beans and more.</p>
                </div>
                <span className="circle-arrow">
                  <ArrowUpRight size={23} aria-hidden="true" />
                </span>
              </div>
            </Link>
          </div>
        </section>

        <section className="partner-section section-space">
          <div className="site-shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">FRESH FRUIT &amp; DRY-FRUIT RANGE</p>
                <h2>
                  Fresh produce &amp; dry fruits.
                  <br />
                  <em>More possibilities for your shelf.</em>
                </h2>
              </div>
              <p>
                Explore fresh fruits and dry fruits for your retail and
                wholesale conversations, with formats, origin, availability and
                terms confirmed for each enquiry.
              </p>
            </div>
            <div className="partner-card-grid">
              <Link href="/fruits" className="partner-card">
                <div className="partner-card-image">
                  <Image
                    src="/afreen-products/orange.webp"
                    alt="Illustrative oranges from our fresh-produce partner range"
                    fill
                    sizes="(max-width: 700px) 100vw, 50vw"
                  />
                </div>
                <div className="partner-card-copy">
                  <div>
                    <span className="eyebrow">FRESH PRODUCE</span>
                    <h3>Fruits &amp; fresh produce</h3>
                    <p>Oranges, apples, avocados, citrus, cherries and more.</p>
                  </div>
                  <span className="circle-arrow">
                    <ArrowUpRight size={23} aria-hidden="true" />
                  </span>
                </div>
              </Link>
              <Link href="/dry-fruits" className="partner-card">
                <div className="partner-card-image">
                  <Image
                    src="/afreen-products/almonds.webp"
                    alt="Illustrative almonds from our dry-fruit partner range"
                    fill
                    sizes="(max-width: 700px) 100vw, 50vw"
                  />
                </div>
                <div className="partner-card-copy">
                  <div>
                    <span className="eyebrow">DRY FRUITS &amp; NUTS</span>
                    <h3>Dry fruits &amp; nuts</h3>
                    <p>
                      Walnuts, raisins and almonds for retail conversations.
                    </p>
                  </div>
                  <span className="circle-arrow">
                    <ArrowUpRight size={23} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </div>
            <p className="partner-disclosure">
              Product images are AI-generated illustrations for presentation;
              they do not establish stock, packaging, facilities or
              certification.
            </p>
          </div>
        </section>

        <section className="featured-section section-space">
          <div className="site-shell">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow">GET TO KNOW OUR RANGE</p>
                <h2>A few pantry favourites.</h2>
              </div>
              <Link href="/rice" className="text-link">
                Discover the range <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="featured-grid">
              {featured.map((product) => (
                <Link
                  href={`/products/${product.id}`}
                  className="product-tile"
                  key={product.id}
                >
                  <div className="product-tile-image">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <p className="eyebrow">
                    {product.category === 'rice'
                      ? 'BASMATI RICE'
                      : 'DALS & PULSES'}
                  </p>
                  <h3>{product.name}</h3>
                  <p className="product-sizes">
                    {product.packages.map((pack) => pack.weight).join(' / ')}
                  </p>
                  <span className="text-link">
                    View product <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="trade-section section-space">
          <div className="site-shell trade-grid">
            <div>
              <p className="eyebrow">
                FOR RETAILERS, DISTRIBUTORS &amp; FOODSERVICE
              </p>
              <h2>
                A place on your shelf.
                <br />
                <em>A start to our conversation.</em>
              </h2>
              <p>
                Build your assortment around familiar South Asian pantry
                staples. Explore the catalogue, compare pack sizes, and tell us
                what your business needs.
              </p>
              <Link href="/wholesale" className="site-button gold-button">
                Explore wholesale <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="trade-steps">
              <div>
                <span>01</span>
                <div>
                  <h3>Find your assortment</h3>
                  <p>
                    Browse the existing range of rice, lentils, beans and
                    pulses.
                  </p>
                </div>
              </div>
              <div>
                <span>02</span>
                <div>
                  <h3>Share your requirements</h3>
                  <p>
                    Tell us your pack format, estimated volume and delivery
                    destination.
                  </p>
                </div>
              </div>
              <div>
                <span>03</span>
                <div>
                  <h3>Discuss the details</h3>
                  <p>
                    Confirm availability, pricing, documentation and logistics
                    with the team.
                  </p>
                </div>
              </div>
              <Link href="/buyer-checklist.html" className="text-link">
                Open the buyer discussion checklist{' '}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="section-space site-shell kitchen-section">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">FROM PANTRY TO PLATE</p>
              <h2>Something good is cooking.</h2>
            </div>
            <Link href="/recipes" className="text-link">
              All recipes <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="recipe-preview-grid">
            {[recipes[0], recipes[1], recipes[3]].map((recipe) => (
              <Link
                href={`/recipes/${recipe.id}`}
                className="recipe-preview"
                key={recipe.id}
              >
                <div>
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <p className="eyebrow">
                  {recipe.cookTime} COOK TIME ·{' '}
                  {recipe.difficulty.toUpperCase()}
                </p>
                <h3>
                  {recipe.title} <ArrowUpRight size={20} aria-hidden="true" />
                </h3>
              </Link>
            ))}
          </div>
        </section>

        <section className="faq-section section-space">
          <div className="site-shell faq-grid">
            <div>
              <p className="eyebrow">A LITTLE MORE TO KNOW</p>
              <h2>
                Your questions,
                <br />
                <em>simply answered.</em>
              </h2>
              <Link href="/contact" className="text-link">
                Speak with our team{' '}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div>
              {questions.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section
          className="partner-showcase"
          aria-labelledby="partners-heading"
        >
          <div className="site-shell partner-showcase-inner">
            <h2 className="eyebrow" id="partners-heading">
              OUR PARTNERS
            </h2>
            <div className="partner-showcase-item">
              <p className="partner-showcase-label">
                FRUITS &amp; DRY FRUIT PARTNER
              </p>
              <p className="partner-showcase-name">Afreen</p>
            </div>
            <div className="partner-showcase-item">
              <p className="partner-showcase-label">TECH PARTNER</p>
              <a
                className="partner-showcase-name"
                href="https://www.easytask.ca/"
                rel="noopener noreferrer"
              >
                EasyTask AI Corp.
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
