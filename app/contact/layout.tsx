import type { ReactNode } from 'react'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Contact KFoods',
  description:
    'Contact KFoods about basmati rice, dals and pulses. Share your product interests, business location and buying requirements for a focused conversation.',
  path: '/contact',
  image: '/social-card.png',
})

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
