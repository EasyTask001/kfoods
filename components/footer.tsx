import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-grid">
        <div className="footer-brand">
          <Link href="/" aria-label="K Foods home">
            <Image
              src="/kfoods-logo.png"
              alt="K Foods"
              width={1011}
              height={627}
              className="brand-logo"
            />
          </Link>
          <p>
            Rooted in tradition.
            <br />
            Made for everyday tables.
          </p>
          <span>Kartarpur Foods · Rice, lentils &amp; pulses</span>
        </div>
        <nav aria-label="Product navigation">
          <h2>Discover</h2>
          <Link href="/rice">Basmati rice</Link>
          <Link href="/dal">Dals &amp; pulses</Link>
          <Link href="/fruits">Fresh fruit</Link>
          <Link href="/dry-fruits">Dry fruits &amp; nuts</Link>
          <Link href="/recipes">In the kitchen</Link>
          <Link href="/about">Our story</Link>
        </nav>
        <nav aria-label="Business navigation">
          <h2>For your business</h2>
          <Link href="/wholesale">Retail &amp; wholesale</Link>
          <Link href="/request-quote">Request a quote</Link>
          <Link href="/buyer-checklist.html">
            Buyer discussion checklist{' '}
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
          <Link href="/contact">Contact our team</Link>
        </nav>
        <div className="footer-contact">
          <h2>Let’s talk food.</h2>
          <a href="mailto:info@kfoods.us">
            info@kfoods.us <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href="tel:+14406019232">+1 (440) 601-9232</a>
          <address>
            8866 Commons Blvd, Suite 101
            <br />
            Twinsburg, Ohio 44087, USA
          </address>
        </div>
      </div>
      <div className="site-shell footer-bottom">
        <p>© {new Date().getFullYear()} K Foods · Kartarpur Foods</p>
      </div>
      <div className="site-shell footer-partner">
        <a
          className="footer-partner-logo"
          href="https://www.easytask.ca/"
          rel="noopener noreferrer"
          aria-label="EasyTask AI Corp. — website technology partner"
        >
          <Image
            src="/easytask-logo.png"
            alt="EasyTask AI Corp. logo"
            width={346}
            height={77}
            className="footer-partner-image"
          />
        </a>
        <p className="footer-partner-label">TECH PARTNER</p>
        <p className="footer-partner-name">EasyTask AI Corp.</p>
      </div>
    </footer>
  )
}
