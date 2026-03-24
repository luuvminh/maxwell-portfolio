// src/components/admin/AdminSidebar.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const navItems = [
  { href: '/admin',           label: 'Dashboard',  icon: '◈' },
  { href: '/admin/posts',     label: 'Blog Posts', icon: '✦' },
  { href: '/admin/projects',  label: 'Projects',   icon: '◻' },
  { href: '/admin/messages',  label: 'Messages',   icon: '✉' },
  { href: '/admin/settings',  label: 'Settings',   icon: '⚙' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside style={{
      width: '220px',
      minHeight: '100vh',
      background: 'var(--black-2)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 0',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '0 1.5rem 1.5rem', borderBottom: '1px solid var(--border)', marginBottom: '1rem' }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--white)',
        }}>
          Maxwell<span style={{ color: 'var(--gold)' }}>.</span>
        </Link>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'var(--white-muted)', marginTop: '0.2rem',
        }}>Admin CMS</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0 0.75rem' }}>
        {navItems.map(item => {
          const active = item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.65rem 0.75rem', borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-ui)', fontSize: '0.85rem',
              color: active ? 'var(--gold-light)' : 'var(--white-dim)',
              background: active ? 'rgba(201,168,76,0.08)' : 'transparent',
              borderLeft: active ? '2px solid var(--gold)' : '2px solid transparent',
              marginBottom: '0.15rem', transition: 'all 150ms ease',
            }}>
              <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <Link href="/" target="_blank" style={{
          display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
          letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--white-muted)',
          marginBottom: '0.75rem',
        }}>
          View Site ↗
        </Link>
        <button onClick={() => signOut({ callbackUrl: '/admin/login' })} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'var(--white-muted)', padding: 0,
          transition: 'color 150ms ease',
        }}>
          Sign Out
        </button>
      </div>
    </aside>
  )
}
