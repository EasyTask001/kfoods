'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const links = [
  { href: '/rice', label: 'Basmati Rice' },
  { href: '/dal', label: 'Dals & Pulses' },
  { href: '/fruits', label: 'Fruits & Produce' },
  { href: '/dry-fruits', label: 'Dry Fruits & Nuts' },
  { href: '/wholesale', label: 'Wholesale' },
  { href: '/about', label: 'Our Story' },
  { href: '/recipes', label: 'Recipes' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const container = useRef<HTMLElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <header className="site-header" ref={container}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="site-shell header-inner">
        <Link
          href="/"
          aria-label="K Foods home"
          onClick={() => setOpen(false)}
          className="brand-link"
        >
          <Image
            src="/kfoods-logo.png"
            alt="K Foods"
            width={1011}
            height={627}
            priority
            className="brand-logo"
          />
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/request-quote" className="site-button header-quote">
          Request a quote <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <button
          ref={toggle}
          type="button"
          className="mobile-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className="mobile-nav"
        hidden={!open}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {link.label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        ))}
        <Link href="/request-quote" onClick={() => setOpen(false)}>
          Request a quote <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </nav>
    </header>
  )
}
