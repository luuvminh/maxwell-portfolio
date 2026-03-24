// src/app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '2rem',
      background: 'var(--black)', textAlign: 'center',
    }}>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em',
        textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem',
      }}>404</p>
      <h1 style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 6rem)',
        color: 'var(--white)', marginBottom: '1rem',
      }}>Not Found</h1>
      <p style={{ color: 'var(--white-muted)', marginBottom: '2.5rem', maxWidth: '360px' }}>
        This page does not exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary">Return Home</Link>
    </div>
  )
}
