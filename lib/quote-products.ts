import { allProducts, type PackageOption, type Product } from './products-data'
import { afreenProducts } from './afreen-products-data'

export type QuoteProduct = Pick<Product, 'id' | 'name' | 'packages'>

export const afreenQuoteProducts: QuoteProduct[] = afreenProducts.map(
  (product) => ({
    id: `afreen-${product.id}`,
    name: `${product.en.name} · Fresh fruit and dry-fruit partner range`,
    packages: [] as PackageOption[],
  }),
)

export const quoteProducts: QuoteProduct[] = [
  ...allProducts,
  ...afreenQuoteProducts,
]

export function getQuoteProductById(id: string): QuoteProduct | undefined {
  return quoteProducts.find((product) => product.id === id)
}
