'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, ZoomIn, X } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import type { Product } from '@/lib/products-data'

export function ProductDetail({ product }: { product: Product }) {
  const [selectedPackage, setSelectedPackage] = useState(0)
  const pack = product.packages[selectedPackage]
  const categoryPath = product.category === 'dals' ? '/dal' : '/rice'
  const categoryName =
    product.category === 'dals' ? 'Dals & Pulses' : 'Basmati Rice'

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <div className="site-shell pt-28 pb-5">
          <Link href={categoryPath} className="text-link">
            <ArrowLeft size={15} aria-hidden="true" /> Back to {categoryName}
          </Link>
        </div>
        <section className="site-shell pb-16 md:pb-24">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/3] rounded-sm border border-border bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-5"
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button
                    type="button"
                    className="text-link mt-3"
                    aria-label="Zoom image"
                  >
                    <ZoomIn size={17} aria-hidden="true" /> Enlarge product
                    image
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/75" />
                  <Dialog.Content className="fixed left-1/2 top-1/2 z-[100] w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-sm bg-background p-5 md:p-8">
                    <Dialog.Title className="font-serif text-xl pr-12">
                      {product.name} image preview
                    </Dialog.Title>
                    <Dialog.Description className="text-xs text-muted-foreground mt-2 pr-10">
                      Original catalogue image. Listed package sizes are
                      confirmed separately with K Foods.
                    </Dialog.Description>
                    <div className="relative mt-5 h-[min(65dvh,560px)] bg-white">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-3"
                        unoptimized
                        sizes="90vw"
                      />
                    </div>
                    <Dialog.Close
                      className="absolute top-3 right-3 flex size-11 items-center justify-center"
                      aria-label="Close image preview"
                    >
                      <X size={23} aria-hidden="true" />
                    </Dialog.Close>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
              <p className="text-xs leading-relaxed text-muted-foreground mt-4">
                Product photography is shown as supplied. Refer to current
                packaging for SKU-specific labelling and nutrition information.
              </p>
            </div>
            <div>
              <p className="eyebrow mb-4">{categoryName.toUpperCase()}</p>
              <h1 className="font-serif text-4xl font-normal leading-tight md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <fieldset className="mt-8">
                <legend className="text-sm font-semibold mb-4">
                  Select Package Size
                </legend>
                <div className="flex flex-wrap gap-3">
                  {product.packages.map((option, index) => (
                    <button
                      type="button"
                      key={option.weight}
                      aria-pressed={selectedPackage === index}
                      onClick={() => setSelectedPackage(index)}
                      className={`min-h-12 min-w-20 rounded-sm border px-5 py-3 text-sm transition-colors ${selectedPackage === index ? 'bg-primary text-primary-foreground border-primary' : 'border-input bg-background hover:bg-secondary'}`}
                    >
                      {option.weight}
                    </button>
                  ))}
                </div>
              </fieldset>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Package sizes are catalog listings, not a live inventory feed.
                Confirm availability, pricing and order details with KFoods.
              </p>
              <div className="button-row mb-9">
                <Link
                  className="site-button"
                  href={`/request-quote?product=${product.id}&pack=${encodeURIComponent(pack.weight)}`}
                  aria-label={`Contact for pricing for ${product.name}, ${pack.weight}`}
                >
                  Contact for Pricing
                </Link>
                <Link
                  className="text-link"
                  href={`/request-quote?product=${product.id}&pack=${encodeURIComponent(pack.weight)}`}
                >
                  Request Quote
                </Link>
              </div>
              <section className="border-t border-border py-6">
                <h2 className="font-serif text-2xl mb-4">About This Product</h2>
                <p className="text-sm leading-loose text-muted-foreground">
                  {product.longDescription}
                </p>
              </section>
              <section className="border-t border-border py-6">
                <h2 className="font-serif text-2xl mb-4">
                  Nutrition Highlights
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
                  {product.nutritionHighlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </section>
              {product.cookingTips && (
                <section className="border-t border-border py-6">
                  <h2 className="font-serif text-2xl mb-4">Cooking Tips</h2>
                  <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
                    {product.cookingTips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
          <div className="catalogue-trade">
            <div>
              <h2>Explore More Products</h2>
              <p>
                Discover the rest of the {categoryName.toLowerCase()}{' '}
                collection.
              </p>
            </div>
            <Link href={categoryPath} className="text-link">
              View all {categoryName}{' '}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
