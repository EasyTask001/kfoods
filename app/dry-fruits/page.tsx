import { AfreenProductCatalogue } from '@/components/afreen-product-catalogue'
import { afreenDryFruitProducts } from '@/lib/afreen-products-data'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Dry Fruits & Nuts',
  description:
    'Explore walnuts, raisins and almonds from the KFoods fresh fruit and dry-fruit partner range for retail and wholesale conversations in North America.',
  path: '/dry-fruits',
})

export default function DryFruitsPage() {
  return (
    <AfreenProductCatalogue
      title="Dry fruits with room to grow."
      intro="Explore walnuts, raisins and almonds for retail and wholesale conversations. Presentation, origin, formats and availability are confirmed for each K Foods enquiry."
      products={afreenDryFruitProducts}
      category="dry"
    />
  )
}
