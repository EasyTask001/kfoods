import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import {
  RequestQuoteForm,
  QuoteBenefits,
} from '@/components/request-quote-form'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY, QUOTE_EMAIL } from '@/lib/quote'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Request a Wholesale Quote',
  description:
    'Prepare a buyer inquiry for KFoods rice, dals, pulses and the fresh fruit and dry-fruit partner range. Share your product, quantity and delivery destination, then review and send an email to info@kfoods.us.',
  path: '/request-quote',
})

export default async function RequestQuotePage({
  searchParams,
}: {
  searchParams: Promise<{
    product?: string | string[]
    pack?: string | string[]
  }>
}) {
  const query = await searchParams
  const product = typeof query.product === 'string' ? query.product : ''
  const pack = typeof query.pack === 'string' ? query.pack : ''

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
              For retail &amp; trade buyers
            </p>
            <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Your next order
              <br className="hidden sm:block" /> starts with a conversation.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Tell KFoods what you’re sourcing, from Kartarpur basmati rice to
              dals and pulses. Start with an estimate; ask about pricing, pack
              sizes and delivery to your destination.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14 lg:px-8 lg:py-16">
          <aside className="space-y-8 lg:sticky lg:top-28">
            <div>
              <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
                A clear brief.
                <br />A useful conversation.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                For grocery stores, retail chains, distributors and foodservice
                buyers in North America. Share your destination so the team can
                confirm what is available for your order.
              </p>
            </div>
            <QuoteBenefits />
            <div className="space-y-4 border-t border-border pt-6">
              <p className="text-sm font-semibold">
                Prefer a direct conversation?
              </p>
              <a
                href={`mailto:${QUOTE_EMAIL}`}
                className="flex items-center gap-3 text-sm text-primary underline-offset-4 hover:underline"
              >
                <Mail aria-hidden="true" className="size-4 shrink-0" />
                {QUOTE_EMAIL}
              </a>
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="flex items-center gap-3 text-sm text-primary underline-offset-4 hover:underline"
              >
                <Phone aria-hidden="true" className="size-4 shrink-0" />
                {CONTACT_PHONE_DISPLAY}
              </a>
              <Button asChild variant="link" className="h-auto p-0">
                <Link href="/contact">
                  Contact details <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </aside>
          <RequestQuoteForm
            key={`${product}:${pack}`}
            initialProduct={product}
            initialPack={pack}
          />
        </section>
      </main>
      <Footer />
    </>
  )
}
