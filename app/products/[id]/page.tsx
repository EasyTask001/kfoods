import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/product-detail'
import { StructuredData } from '@/components/structured-data'
import { allProducts, getProductById } from '@/lib/products-data'
import { breadcrumbJsonLd, createPageMetadata, productJsonLd } from '@/lib/seo'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return allProducts.map((product) => ({ id: product.id }))
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id)
  if (!product) notFound()
  return createPageMetadata({
    title: product.name,
    description: product.description,
    path: `/products/${product.id}`,
    image: product.image,
  })
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) notFound()
  const category =
    product.category === 'rice'
      ? { name: 'Basmati Rice', path: '/rice' }
      : { name: 'Dals & Pulses', path: '/dal' }

  return (
    <>
      <StructuredData id="product-data" data={productJsonLd(product)} />
      <StructuredData
        id="product-breadcrumb"
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          category,
          { name: product.name, path: `/products/${product.id}` },
        ])}
      />
      <ProductDetail product={product} />
    </>
  )
}
