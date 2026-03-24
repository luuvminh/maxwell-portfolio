// src/app/admin/login/page.tsx
'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', { email, password, redirect: false })
    if (result?.error) {
      setError('Invalid credentials.')
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--black)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '2rem',
    }}>
      <div style={{
        width: '100%', maxWidth: '400px',
        background: 'var(--black-3)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', padding: '2.5rem',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--white)', marginBottom: '0.25rem' }}>
            Maxwell<span style={{ color: 'var(--gold)' }}>.</span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--white-muted)' }}>
            Admin Access
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label>Email</label>
            <input className="input" type="email" required value={email}
              onChange={e => setEmail(e.target.value)} placeholder="admin@example.com" />
          </div>
          <div>
            <label>Password</label>
            <input className="input" type="password" required value={password}
              onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          {error && (
            <p style={{ color: '#f87171', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{error}</p>
          )}
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.5rem' }}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  )
}
