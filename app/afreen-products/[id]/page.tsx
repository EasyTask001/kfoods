import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AfreenProductDetail } from '@/components/afreen-product-catalogue'
import { StructuredData } from '@/components/structured-data'
import {
  afreenProducts,
  getAfreenProductById,
} from '@/lib/afreen-products-data'
import {
  breadcrumbJsonLd,
  createPageMetadata,
  partnerProductJsonLd,
} from '@/lib/seo'

interface AfreenProductPageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return afreenProducts.map((product) => ({ id: product.id }))
}

export async function generateMetadata({
  params,
}: AfreenProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = getAfreenProductById(id)
  if (!product) notFound()
  return createPageMetadata({
    title: `${product.en.name} · Partner Range`,
    description: product.en.description,
    path: `/afreen-products/${product.id}`,
    image: product.image,
  })
}

export default async function AfreenProductPage({
  params,
}: AfreenProductPageProps) {
  const { id } = await params
  const product = getAfreenProductById(id)
  if (!product) notFound()
  const category =
    product.category === 'dry'
      ? { name: 'Dry Fruits & Nuts', path: '/dry-fruits' }
      : { name: 'Fresh Produce', path: '/fruits' }

  return (
    <>
      <StructuredData
        id="afreen-product-data"
        data={partnerProductJsonLd(product)}
      />
      <StructuredData
        id="afreen-product-breadcrumb"
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          category,
          { name: product.en.name, path: `/afreen-products/${product.id}` },
        ])}
      />
      <AfreenProductDetail product={product} />
    </>
  )
}
