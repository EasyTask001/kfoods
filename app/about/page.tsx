import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="editorial-hero">
          <div className="site-shell">
            <p className="eyebrow">OUR STORY</p>
            <h1>
              Rooted in tradition.
              <br />
              Shared around the table.
            </h1>
            <p>
              K Foods stands for Kartarpur Foods — a collection of rice, dals
              and pulses inspired by the everyday cooking and culinary
              traditions of South Asia. Alongside these pantry staples, we
              feature fresh fruit and dry fruits through a supplier partner.
            </p>
          </div>
        </section>
        <section className="site-shell section-space">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-sm">
              <Image
                src="/hero-bg.jpg"
                alt="Basmati rice and spices in brass bowls"
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
                priority
                className="object-cover"
              />
            </div>
            <div>
              <p className="eyebrow mb-5">WELCOME TO KARTARPUR FOODS</p>
              <h2 className="font-serif text-4xl leading-tight mb-6">
                Good ingredients.
                <br />
                Meaningful meals.
              </h2>
              <p className="text-muted-foreground leading-loose mb-5">
                A bowl of fragrant basmati. A comforting pot of dal. Recipes
                handed down, and new favourites waiting to be made. Our range
                brings together the pantry essentials at the heart of these
                moments.
              </p>
              <p className="text-muted-foreground leading-loose mb-7">
                Named after the historic city of Kartarpur, our brand connects
                familiar South Asian flavours with home kitchens and business
                buyers. Explore our pantry products for their descriptions,
                cooking tips and listed package sizes.
              </p>
              <p className="text-muted-foreground leading-loose mb-7">
                For buyers looking beyond the pantry, explore fresh fruit and
                dry fruits presented with our supplier partner. Formats, origin
                and availability are confirmed through enquiry rather than
                assumed from the images or catalogue.
              </p>
              <Link href="/rice" className="text-link">
                Explore our rice collection{' '}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <div className="story-range-links">
                <Link href="/fruits" className="text-link">
                  Explore fresh fruit{' '}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                <Link href="/dry-fruits" className="text-link">
                  Explore dry fruits{' '}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="featured-section section-space">
          <div className="site-shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">FROM OUR RANGE TO YOUR SHELF</p>
                <h2>
                  A conversation
                  <br />
                  worth starting.
                </h2>
              </div>
              <p>
                Retailers, distributors and foodservice buyers can start with
                our catalogue, then discuss product availability, pack
                requirements and documentation directly with our team.
              </p>
            </div>
            <div className="button-row">
              <Link className="site-button" href="/wholesale">
                Retail &amp; wholesale{' '}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Link className="text-link" href="/contact">
                Contact K Foods <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
