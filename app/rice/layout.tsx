import type { ReactNode } from 'react'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Basmati Rice Catalog',
  description:
    'Browse KFoods basmati rice, including white, brown and sella varieties. Compare catalog pack sizes and request product-specific wholesale information.',
  path: '/rice',
  image: '/rice-hero.jpg',
})

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
