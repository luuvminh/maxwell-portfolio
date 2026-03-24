// src/app/(site)/contact/page.tsx
'use client'
import { useState } from 'react'
import type { Metadata } from 'next'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ padding: '8rem clamp(1rem, 4vw, 3rem) 6rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '6rem', alignItems: 'start' }}>

        {/* Left */}
        <div className="fade-up">
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem',
          }}>Contact</p>
          <h1 style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>Let's Connect</h1>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, marginBottom: '3rem' }}>
            Whether it's a project collaboration, a trading conversation, or simply a note —
            I read every message and respond to those that call for it.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { label: 'Response Time', value: 'Within 48 hours' },
              { label: 'Preferred', value: 'Direct and specific' },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '0.25rem' }}>
                  {item.label}
                </div>
                <div style={{ color: 'var(--white-dim)', fontSize: '0.95rem' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="fade-up-delay-2">
          {status === 'success' ? (
            <div style={{
              background: 'rgba(201,168,76,0.06)', border: '1px solid var(--gold-dim)',
              borderRadius: 'var(--radius-lg)', padding: '3rem', textAlign: 'center',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
              <h3 style={{ color: 'var(--gold-light)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>Message Sent</h3>
              <p style={{ fontSize: '0.9rem' }}>I'll be in touch.</p>
              <button onClick={() => setStatus('idle')} className="btn btn-outline" style={{ marginTop: '1.5rem' }}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label>Name</label>
                  <input className="input" required value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Your name" />
                </div>
                <div>
                  <label>Email</label>
                  <input className="input" type="email" required value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label>Subject</label>
                <input className="input" required value={form.subject}
                  onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                  placeholder="What is this about?" />
              </div>
              <div>
                <label>Message</label>
                <textarea className="input" required value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="Write your message here..." rows={6} />
              </div>
              {status === 'error' && (
                <p style={{ color: '#f87171', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                  Something went wrong. Please try again.
                </p>
              )}
              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}
                style={{ alignSelf: 'flex-start' }}>
                {status === 'sending' ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1.4fr"],
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  )
}
