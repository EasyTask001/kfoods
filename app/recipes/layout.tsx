import type { ReactNode } from 'react'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Basmati Rice & Dal Recipes',
  description:
    'Find step-by-step KFoods basmati rice and dal recipes, with ingredient lists, preparation times and cooking tips for everyday meals.',
  path: '/recipes',
  image: '/recipe-perfect-rice.webp',
})

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
