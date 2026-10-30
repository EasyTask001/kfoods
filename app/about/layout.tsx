import type { ReactNode } from 'react'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'About Kartarpur Foods',
  description:
    'Meet KFoods, Kartarpur Foods, and explore the basmati rice, dals and pulses in our catalog. Connect with our team about your business requirements.',
  path: '/about',
  image: '/hero-bg.jpg',
})

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
