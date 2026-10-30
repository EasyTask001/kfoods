import { ProductCatalogue } from '@/components/product-catalogue'
import { dalsProducts } from '@/lib/products-data'

export default function DalPage() {
  return (
    <ProductCatalogue
      title="Wholesome starts here."
      intro="From golden moong dal to hearty kidney beans, explore the colours and flavours of South Asian pantry staples. Discover lentils, chickpeas, beans and pulses in the existing K Foods range."
      products={dalsProducts}
      category="Dals & pulses"
    />
  )
}
