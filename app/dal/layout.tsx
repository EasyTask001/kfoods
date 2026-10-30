import type { ReactNode } from 'react'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Dals & Pulses Catalog',
  description:
    'Explore KFoods dals, lentils, chickpeas and beans. Review each product and its listed package sizes, then ask about pricing and availability.',
  path: '/dal',
  image: '/dal-hero.jpg',
})

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
