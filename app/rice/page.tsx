import { ProductCatalogue } from '@/components/product-catalogue'
import { riceProducts } from '@/lib/products-data'

export default function RicePage() {
  return (
    <ProductCatalogue
      title="A world of basmati."
      intro="Discover the aroma, texture and versatility of the K Foods basmati collection. Explore long grain, extra long grain, sella and brown rice, with listed pack sizes for home kitchens and business inquiries."
      products={riceProducts}
      category="Basmati rice"
    />
  )
}
