import type { Metadata } from 'next'
import type { AfreenProduct } from './afreen-products-data'
import type { Product } from './products-data'

/**
 * Publishing prerequisite: set NEXT_PUBLIC_SITE_URL to the owner-verified HTTPS
 * origin (for example, https://www.example.com) BEFORE the production build.
 * Rebuild after changing it; metadata, JSON-LD, robots and sitemap share it.
 * https://kfoods.us is a provisional fallback inferred ONLY from the existing
 * info@kfoods.us email, NOT a verified deployment or proof of domain ownership.
 * Keep preview environments access-controlled/noindex at the hosting layer.
 * Never publish this fallback without the owner's domain confirmation.
 */
export function resolveSiteUrl(configuredUrl?: string): string {
  const value = configuredUrl || 'https://kfoods.us'
  try {
    const url = new URL(value)
    if (
      url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      url.pathname !== '/' ||
      url.search ||
      url.hash ||
      url.hostname === 'localhost' ||
      url.hostname.endsWith('.localhost') ||
      url.hostname === '127.0.0.1' ||
      url.hostname === '[::1]'
    ) {
      throw new Error('Invalid canonical origin')
    }
    return url.origin
  } catch {
    throw new Error(
      'NEXT_PUBLIC_SITE_URL must be an absolute public HTTPS origin without credentials, path, query or fragment',
    )
  }
}

export function getSiteUrl(): string {
  return resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
}

export function createRootMetadata(): Metadata {
  const title = 'Basmati Rice, Dals, Fruits & Dry Fruits | KFoods'
  const description =
    'Explore KFoods basmati rice, dals, pulses, fresh fruits and dry fruits. Review catalogue details and start a wholesale conversation for supermarket, club and distribution buying in North America.'
  const image = `${getSiteUrl()}/social-card.png`
  // Root metadata is inherited. Only individual pages may set a canonical/OG URL.
  return {
    metadataBase: new URL(getSiteUrl()),
    title: { default: title, template: '%s | KFoods' },
    description,
    icons: { icon: '/favicon.ico' },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'KFoods — Kartarpur Foods',
      title,
      description,
      images: [{ url: image, alt: 'KFoods rice and pulses' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export function organizationJsonLd() {
  const base = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${base}/#organization`,
    name: 'KFoods',
    alternateName: 'Kartarpur Foods',
    url: base,
    logo: `${base}/kfoods-logo.png`,
    email: 'info@kfoods.us',
  }
}

interface PageMetadataOptions {
  title: string
  description: string
  path: string
  image?: string
}

export function createPageMetadata({
  title,
  description,
  path,
  image = '/social-card.png',
}: PageMetadataOptions): Metadata {
  const base = getSiteUrl()
  const canonical = new URL(path, `${base}/`).toString()
  const socialImage = new URL(image, `${base}/`).toString()
  const pageTitle = `${title} | KFoods`
  return {
    title: { absolute: pageTitle },
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'KFoods — Kartarpur Foods',
      title: pageTitle,
      description,
      url: canonical,
      images: [{ url: socialImage, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [socialImage],
    },
  }
}

// Catalog-only Product markup: no priced offer, stock feed, reviews, identifiers
// or certification evidence has been supplied. This is not a rich-result promise.
export function productJsonLd(product: Product) {
  const base = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${base}/products/${product.id}#product`,
    url: `${base}/products/${product.id}`,
    name: product.name,
    description: product.description,
    image: new URL(product.image, `${base}/`).toString(),
    category: product.category === 'rice' ? 'Basmati Rice' : 'Dals & Pulses',
    additionalProperty: product.packages.map((pkg) => ({
      '@type': 'PropertyValue',
      name: 'Catalog package weight',
      value: pkg.weight,
    })),
  }
}

export function partnerProductJsonLd(product: AfreenProduct) {
  const base = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${base}/afreen-products/${product.id}#product`,
    url: `${base}/afreen-products/${product.id}`,
    name: product.en.name,
    description: product.en.description,
    image: new URL(product.image, `${base}/`).toString(),
    category:
      product.category === 'dry' ? 'Dry Fruits & Nuts' : 'Fresh Produce',
    isRelatedTo: {
      '@type': 'Organization',
      name: 'Fresh fruit and dry-fruit partner range',
      description:
        'K Foods partner range for fresh fruits and dry fruits; confirm commercial details directly with K Foods.',
    },
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, `${getSiteUrl()}/`).toString(),
    })),
  }
}
