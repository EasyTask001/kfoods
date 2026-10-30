import { AfreenProductCatalogue } from '@/components/afreen-product-catalogue'
import { afreenFreshProducts } from '@/lib/afreen-products-data'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Fresh Fruits & Produce',
  description:
    'Explore fresh fruits and produce available through the KFoods fresh fruit and dry-fruit partner range for retail and wholesale conversations in North America.',
  path: '/fruits',
})

export default function FruitsPage() {
  return (
    <AfreenProductCatalogue
      title="Fresh produce for the next shelf."
      intro="Explore fresh fruits and produce for the next shelf. Varieties, maturity, presentation, origin and availability are confirmed for each K Foods enquiry."
      products={afreenFreshProducts}
      category="fresh"
    />
  )
}
