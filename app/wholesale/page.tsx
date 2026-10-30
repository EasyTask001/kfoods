import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight, Download } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { StructuredData } from '@/components/structured-data'
import {
  afreenDryFruitProducts,
  afreenFreshProducts,
} from '@/lib/afreen-products-data'
import { allProducts, dalsProducts, riceProducts } from '@/lib/products-data'
import { createPageMetadata, breadcrumbJsonLd } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Wholesale Rice, Dals, Fruits & Dry Fruits for Retail Buyers',
  description:
    'Explore K Foods rice, lentils, pulses and a fresh fruit and dry-fruit partner range for supermarket, club, wholesale and foodservice buyers in Canada and the USA.',
  path: '/wholesale',
})

const faq = [
  {
    question: 'What can retail and wholesale buyers source from the catalogue?',
    answer:
      'The K Foods buyer range includes basmati rice, dals, lentils, chickpeas, beans and other pulses, plus fresh fruits and dry fruits through a partner range. Select a product to see its details. Confirm current availability, origin, order quantities and pack configurations directly with K Foods.',
  },
  {
    question: 'Which retail and bulk package sizes are listed?',
    answer:
      'Listed pack sizes vary by product. The existing range includes smaller retail packs and selected larger formats such as 20 lb, 40 lb and 55 lb. A listed size does not confirm current stock, case configuration or minimum order quantity.',
  },
  {
    question: 'Can buyers in Canada and the United States inquire?',
    answer:
      'Yes. Buyers can share their delivery city, province or state, postal or ZIP code and estimated volume. K Foods must confirm shipping coverage, lead times, freight, import responsibilities and commercial terms for the destination before any order is agreed.',
  },
  {
    question:
      'Does this site confirm listings at Costco, Walmart, Loblaws or Real Canadian Superstore?',
    answer:
      'No. These retailer names describe the intended buyer audience and independent supplier resources. They do not imply a relationship, approved-supplier status or retail listing. Contact K Foods for any current stockist information.',
  },
  {
    question:
      'Are food-safety certifications, private label or compliance documents confirmed?',
    answer:
      'No certification, private-label capability or regulatory approval is confirmed by this page. Share your SKU-specific requirements, including food-safety audits, ingredients, allergens, nutrition, traceability, label languages and GTINs. K Foods must confirm the applicable evidence and capability.',
  },
  {
    question: 'How does a quote inquiry work?',
    answer:
      'Prepare an email draft with your company, product, estimated quantity and delivery destination. Review the draft and send it yourself to info@kfoods.us using your email app. The website does not send the inquiry, accept an order or confirm delivery.',
  },
]

export default function WholesalePage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <StructuredData
          id="wholesale-faq"
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          }}
        />
        <StructuredData
          id="wholesale-breadcrumb"
          data={breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Wholesale', path: '/wholesale' },
          ])}
        />
        <section className="editorial-hero">
          <div className="site-shell grid items-center gap-10 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <p className="eyebrow">RETAIL · DISTRIBUTION · FOODSERVICE</p>
              <h1>
                A thoughtful addition
                <br />
                to your assortment.
              </h1>
              <p>
                Rice, dals, pulses, fresh fruits and dry fruits for the next
                conversation with your category team. Explore the K Foods range
                and the fresh fruit and dry-fruit partner range, then discuss
                your buying requirements for Canada and the United States.
              </p>
              <div className="button-row">
                <Link href="/request-quote" className="site-button">
                  Start a buyer inquiry{' '}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                <a href="/product-range.csv" download className="text-link">
                  Product range CSV <Download size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-sm">
              <Image
                src="/dal-hero.jpg"
                alt="A selection of lentils and pulses for the K Foods category range"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section className="site-shell section-space">
          <div className="section-heading">
            <div>
              <p className="eyebrow">START WITH THE RANGE</p>
              <h2>
                Familiar staples.
                <br />
                <em>Different buying needs.</em>
              </h2>
            </div>
            <p>
              {allProducts.length +
                afreenDryFruitProducts.length +
                afreenFreshProducts.length}{' '}
              catalogue products across rice, dals, pulses, fruits and dry
              fruits. Browse the catalogue details, then confirm the details
              with our team.
            </p>
          </div>
          <div className="collection-grid">
            {[
              {
                title: 'Basmati rice',
                href: '/rice',
                products: riceProducts,
                image: '/rice-hero.jpg',
                description:
                  'Long grain, extra long grain, sella and brown basmati varieties.',
              },
              {
                title: 'Dals & pulses',
                href: '/dal',
                products: dalsProducts,
                image: '/dal-hero.jpg',
                description:
                  'Lentils, chickpeas, beans and other South Asian pantry staples.',
              },
              {
                title: 'Fresh fruits & produce',
                href: '/fruits',
                products: afreenFreshProducts,
                image: '/afreen-products/orange.webp',
                description: 'Fresh fruits and produce from our partner range.',
              },
              {
                title: 'Dry fruits & nuts',
                href: '/dry-fruits',
                products: afreenDryFruitProducts,
                image: '/afreen-products/almonds.webp',
                description:
                  'Walnuts, raisins and almonds for retail and wholesale conversations.',
              },
            ].map((collection) => (
              <Link
                href={collection.href}
                key={collection.href}
                className="collection-panel"
              >
                <div className="collection-image">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    sizes="(max-width: 700px) 100vw, 50vw"
                  />
                </div>
                <div className="collection-copy">
                  <div>
                    <span className="eyebrow">
                      {collection.products.length} CATALOGUE PRODUCTS
                    </span>
                    <h3>{collection.title}</h3>
                    <p>{collection.description}</p>
                  </div>
                  <span className="circle-arrow">
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            All pack sizes are catalogue information, not a live inventory feed.
            Pricing, case and pallet configurations, minimum orders and
            available formats require confirmation.
          </p>
        </section>

        <section className="trade-section section-space">
          <div className="site-shell trade-grid">
            <div>
              <p className="eyebrow">A CLEARER BUYING BRIEF</p>
              <h2>
                Good conversations
                <br />
                <em>start with the details.</em>
              </h2>
              <p>
                Use our printable discussion checklist to prepare for product
                evaluation and supplier onboarding. It is a conversation aid,
                not a claim that K Foods meets a particular retailer’s
                requirements.
              </p>
              <a
                href="/buyer-checklist.html"
                className="site-button gold-button"
              >
                Open buyer checklist{' '}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="trade-steps">
              <div>
                <span>01</span>
                <div>
                  <h3>Assortment &amp; format</h3>
                  <p>
                    Product names, pack sizes, target shopper, opening volume
                    and repeat order needs.
                  </p>
                </div>
              </div>
              <div>
                <span>02</span>
                <div>
                  <h3>Specifications &amp; evidence</h3>
                  <p>
                    Ingredients, allergens, nutrition, origin, shelf life,
                    traceability and any required certifications.
                  </p>
                </div>
              </div>
              <div>
                <span>03</span>
                <div>
                  <h3>Commercial &amp; delivery terms</h3>
                  <p>
                    Destination, launch window, case and pallet details,
                    freight, import responsibilities and pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="site-shell section-space">
          <div className="section-heading">
            <div>
              <p className="eyebrow">NORTH AMERICAN RETAIL</p>
              <h2>
                Prepare for the right
                <br />
                <em>supplier conversation.</em>
              </h2>
            </div>
            <p>
              For buyers evaluating an assortment for Costco, Walmart, Loblaws,
              Real Canadian Superstore or another chain: confirm the retailer’s
              current requirements independently.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 border-y border-border py-8">
            {[
              {
                name: 'Costco',
                href: 'https://www.costco.com/vendor-inquiries.html',
                text: 'Official vendor inquiry guidance and food-division contacts.',
              },
              {
                name: 'Walmart',
                href: 'https://corporate.walmart.com/suppliers',
                text: 'Official supplier pathways, requirements and learning resources.',
              },
              {
                name: 'Loblaw',
                href: 'https://www.loblaw.ca/en/supplier/',
                text: 'Official supplier portal and prospective-supplier information.',
              },
            ].map((resource) => (
              <div key={resource.name}>
                <h3 className="font-serif text-2xl mb-3">{resource.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {resource.text}
                </p>
                <a
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  Supplier resource{' '}
                  <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only">
                    {' '}
                    for {resource.name} (opens in a new tab)
                  </span>
                </a>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            These independent links do not imply a relationship, endorsement,
            approved-supplier status or listing for K Foods. No chain-specific
            eligibility is asserted. For Canadian labelling information, consult
            the{' '}
            <a
              className="underline underline-offset-4"
              href="https://inspection.canada.ca/en/food-labels/labelling/industry"
              target="_blank"
              rel="noopener noreferrer"
            >
              CFIA Industry Labelling Tool
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
        </section>

        <section className="faq-section section-space">
          <div className="site-shell faq-grid">
            <div>
              <p className="eyebrow">BUYER QUESTIONS</p>
              <h2>
                Know the range.
                <br />
                <em>Confirm the details.</em>
              </h2>
              <Link href="/request-quote" className="text-link">
                Prepare an inquiry <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div>
              {faq.map((item) => (
                <details key={item.question}>
                  <summary>
                    {item.question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
