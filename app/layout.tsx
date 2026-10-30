import type { Metadata } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { StructuredData } from '@/components/structured-data'
import { createRootMetadata, organizationJsonLd } from '@/lib/seo'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
})

export const metadata: Metadata = createRootMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}
      >
        <StructuredData id="organization-data" data={organizationJsonLd()} />
        {children}
        {process.env.VERCEL === '1' &&
        process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true' ? (
          <Analytics />
        ) : null}
      </body>
    </html>
  )
}
