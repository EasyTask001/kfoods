import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import type { Product } from '@/lib/products-data'

export function ProductCatalogue({
  title,
  intro,
  products,
  category,
}: {
  title: string
  intro: string
  products: Product[]
  category: string
}) {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="editorial-hero">
          <div className="site-shell">
            <p className="eyebrow">
              THE K FOODS COLLECTION / {category.toUpperCase()}
            </p>
            <h1>{title}</h1>
            <p>{intro}</p>
          </div>
        </section>
        <section className="site-shell section-space">
          <div className="catalogue-intro">
            <p>
              {products.length} products · Explore varieties and listed pack
              sizes
            </p>
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
                href={`/products/${product.id}`}
              >
                <div className="product-tile-image">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    sizes="(max-width: 700px) 50vw, 33vw"
                  />
                </div>
                <p className="eyebrow">{category.toUpperCase()}</p>
                <h2 className="font-serif text-xl leading-snug">
                  {product.name}
                </h2>
                <p className="product-description">{product.description}</p>
                <p className="product-sizes">
                  {product.packages.map((pack) => pack.weight).join(' / ')}
                </p>
                <span className="text-link">
                  View details <ArrowUpRight size={15} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
          <div className="catalogue-trade">
            <div>
              <h2>Let’s find the right fit for your business.</h2>
              <p>
                Contact our team to confirm availability, pack configuration and
                wholesale pricing.
              </p>
            </div>
            <Link href="/request-quote" className="site-button">
              Request a quote <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
