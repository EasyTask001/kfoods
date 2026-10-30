import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import type { AfreenCategory, AfreenProduct } from '@/lib/afreen-products-data'

const categoryLabel: Record<AfreenCategory, string> = {
  dry: 'Dry fruits & nuts',
  fresh: 'Fresh produce',
}

const categoryPath: Record<AfreenCategory, string> = {
  dry: '/dry-fruits',
  fresh: '/fruits',
}

export function AfreenProductCatalogue({
  title,
  intro,
  products,
  category,
}: {
  title: string
  intro: string
  products: AfreenProduct[]
  category: AfreenCategory
}) {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="editorial-hero partner-hero">
          <div className="site-shell">
            <p className="eyebrow">{categoryLabel[category].toUpperCase()}</p>
            <h1>{title}</h1>
            <p>{intro}</p>
          </div>
        </section>
        <section className="site-shell section-space">
          <div className="catalogue-intro partner-catalogue-intro">
            <Link href="/wholesale" className="text-link">
              Buying for your business?{' '}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="catalogue-grid">
            {products.map((product) => (
              <Link
                className="product-tile"
                key={product.id}
                href={`/afreen-products/${product.id}`}
              >
                <div className="product-tile-image">
                  <Image
                    src={product.image}
                    alt={product.en.alt}
                    fill
                    sizes="(max-width: 700px) 50vw, 33vw"
                  />
                </div>
                <p className="eyebrow">
                  {categoryLabel[category].toUpperCase()}
                </p>
                <h2 className="font-serif text-xl leading-snug">
                  {product.en.name}
                </h2>
                <p className="product-description">{product.en.description}</p>
                <span className="text-link">
                  View details <ArrowUpRight size={15} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
          <div className="catalogue-trade partner-trade">
            <div>
              <h2>Fresh and pantry possibilities, in one conversation.</h2>
              <p>
                Our fresh fruit and dry-fruit partner range is presented for
                buyer conversations. Ask about the format, origin, availability
                and commercial terms that fit your business.
              </p>
            </div>
            <Link href="/request-quote" className="site-button">
              Request a quote <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <p className="partner-disclosure">
            Images in this partner range are AI-generated illustrative images
            prepared for product presentation. They do not establish stock,
            variety, packaging, facilities or certification.
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}

export function AfreenProductDetail({ product }: { product: AfreenProduct }) {
  const copy = product.en
  const label = categoryLabel[product.category]
  const backPath = categoryPath[product.category]

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <div className="site-shell pt-28 pb-5">
          <Link href={backPath} className="text-link">
            <ArrowUpRight size={15} aria-hidden="true" /> Back to {label}
          </Link>
        </div>
        <section className="site-shell partner-detail pb-16 md:pb-24">
          <div className="partner-detail-grid">
            <div>
              <div className="partner-detail-image">
                <Image
                  src={product.image}
                  alt={copy.alt}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <p className="partner-disclosure">
                AI-generated illustrative image for product presentation; not
                evidence of actual stock or packaging.
              </p>
            </div>
            <div className="partner-detail-copy">
              <p className="eyebrow">{label.toUpperCase()}</p>
              <h1>{copy.name}</h1>
              <p className="partner-detail-note">{copy.note}</p>
              <p>{copy.description}</p>
              {copy.specs?.length ? (
                <dl className="partner-specs">
                  {copy.specs.map((spec) => (
                    <div key={spec.label}>
                      <dt>{spec.label}</dt>
                      <dd>{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              <div className="availability-note">
                <span className="status-dot" aria-hidden="true" />
                Availability, presentation and commercial terms to be confirmed
              </div>
              <Link
                className="site-button"
                href={`/request-quote?product=afreen-${product.id}`}
              >
                Ask about {copy.name}{' '}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="partner-guidance">
            <article>
              <h2>What to discuss</h2>
              <p>{copy.buying}</p>
            </article>
            <article>
              <h2>Storage &amp; handling</h2>
              <p>{copy.handling}</p>
            </article>
            <article>
              <h2>About this range</h2>
              <p>
                This partner range is presented by K Foods for buyer
                conversations. It does not publish prices, stock, minimum
                quantities, delivery guarantees or certification claims.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
