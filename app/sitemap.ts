import type { MetadataRoute } from 'next'
import { afreenProducts } from '@/lib/afreen-products-data'
import { allProducts } from '@/lib/products-data'
import { recipes } from '@/lib/recipes-data'
import { getSiteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/rice',
    '/dal',
    '/wholesale',
    '/recipes',
    '/about',
    '/contact',
    '/request-quote',
    '/fruits',
    '/dry-fruits',
    ...allProducts.map((product) => `/products/${product.id}`),
    ...afreenProducts.map((product) => `/afreen-products/${product.id}`),
    ...recipes.map((recipe) => `/recipes/${recipe.id}`),
  ]
  // No lastModified: a build timestamp is not evidence that content changed.
  return [...new Set(paths)].map((path) => ({
    url: new URL(path, `${getSiteUrl()}/`).toString(),
  }))
}
