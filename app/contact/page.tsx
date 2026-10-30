import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY, QUOTE_EMAIL } from '@/lib/quote'

export const metadata: Metadata = {
  title: 'Contact KFoods',
  description:
    'Contact KFoods at info@kfoods.us or +1 (440) 601-9232. Office address: 8866 Commons Blvd, Suite 101, Twinsburg, Ohio 44087. Start a rice, dal or pulses buyer inquiry.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen bg-background outline-none"
      >
        <section className="border-b border-border bg-secondary/25 px-5 pb-12 pt-32 lg:px-8 lg:pb-16 lg:pt-36">
          <div className="mx-auto max-w-6xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Contact KFoods
            </p>
            <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Good business starts
              <br className="hidden sm:block" /> with a conversation.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Sourcing for your store, distribution business or kitchen? Reach
              out about rice, dals and pulses, or tell us what you’re looking
              for.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-12 px-5 py-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20 lg:px-8 lg:py-20">
          <div>
            <h2 className="mb-8 font-serif text-2xl font-semibold">
              Reach us directly.
            </h2>
            <dl className="divide-y divide-border border-y border-border">
              <div className="py-7">
                <dt className="mb-2 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  <Mail
                    aria-hidden="true"
                    className="size-4 shrink-0 text-primary"
                  />
                  Email
                </dt>
                <dd>
                  <a
                    href={`mailto:${QUOTE_EMAIL}`}
                    className="break-all text-xl font-medium text-primary underline-offset-4 hover:underline sm:text-2xl"
                  >
                    {QUOTE_EMAIL}
                  </a>
                </dd>
              </div>
              <div className="py-7">
                <dt className="mb-2 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  <Phone
                    aria-hidden="true"
                    className="size-4 shrink-0 text-primary"
                  />
                  Phone
                </dt>
                <dd>
                  <a
                    href={`tel:${CONTACT_PHONE}`}
                    className="text-xl font-medium text-primary underline-offset-4 hover:underline sm:text-2xl"
                  >
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                </dd>
              </div>
              <div className="py-7">
                <dt className="mb-2 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  <MapPin
                    aria-hidden="true"
                    className="size-4 shrink-0 text-primary"
                  />
                  Office address
                </dt>
                <dd>
                  <address className="text-base not-italic leading-relaxed">
                    8866 Commons Blvd, Suite 101
                    <br />
                    Twinsburg, Ohio 44087
                    <br />
                    United States
                  </address>
                </dd>
              </div>
            </dl>
          </div>

          <aside className="self-start rounded-2xl bg-primary p-7 text-primary-foreground sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/70">
              For retail &amp; trade buyers
            </p>
            <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight">
              Have an order in mind?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/85">
              Build a buying brief with the details that matter. Ask KFoods to
              confirm pricing, product availability and order terms.
            </p>
            <ul className="my-7 space-y-3 border-y border-primary-foreground/20 py-6 text-sm text-primary-foreground/90">
              {[
                'Your business and contact details',
                'Products, pack sizes and estimated quantity',
                'Delivery city, state or province',
                'Any documentation requirements',
              ].map((detail, index) => (
                <li key={detail} className="flex gap-3">
                  <span className="font-mono text-xs text-primary-foreground/60">
                    0{index + 1}
                  </span>
                  {detail}
                </li>
              ))}
            </ul>
            <Button
              asChild
              size="lg"
              className="h-12 w-full bg-background text-primary hover:bg-background/90"
            >
              <Link href="/request-quote">
                Prepare a buyer inquiry <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <p className="mt-4 text-xs leading-relaxed text-primary-foreground/70">
              The inquiry page prepares an email draft. You review and send it
              from your own email account; nothing is sent automatically.
            </p>
            <Link
              href="/#products"
              className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline underline-offset-4 hover:no-underline"
            >
              Browse the product catalog{' '}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  )
}
