// src/components/ui/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '3rem clamp(1rem, 4vw, 3rem)',
      background: 'var(--black-2)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            marginBottom: '0.25rem',
          }}>
            Maxwell<span style={{ color: 'var(--gold)' }}>.</span>
          </div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.06em',
            color: 'var(--white-muted)',
            textTransform: 'uppercase',
          }}>
            Developer · Trader · Creator
          </p>
        </div>

        <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { href: '/blog', label: 'Writing' },
            { href: '/portfolio', label: 'Work' },
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--white-muted)',
              transition: 'color 200ms ease',
            }}>
              {link.label}
            </Link>
          ))}
        </nav>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--white-muted)',
          letterSpacing: '0.04em',
        }}>
          © {year} Maxwell. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
