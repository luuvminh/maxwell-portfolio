// src/app/(site)/about/page.tsx
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About', description: 'About Maxwell.' }

export default async function AboutPage() {
  const settings = await prisma.siteSettings.findMany()
  const s = Object.fromEntries(settings.map(x => [x.key, x.value]))

  return (
    <div style={{ padding: '8rem clamp(1rem, 4vw, 3rem) 6rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>

        {/* Left — heading */}
        <div className="fade-up">
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem',
          }}>About</p>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            color: 'var(--white)', lineHeight: 0.95, marginBottom: '2rem',
          }}>
            Maxwell<span style={{ color: 'var(--gold)' }}>.</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontStyle: 'italic',
            color: 'var(--white-dim)', lineHeight: 1.5,
          }}>
            Developer · Options Trader · Language Learner
          </p>

          <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { label: 'Location', value: 'Melbourne, Victoria, Australia' },
              { label: 'Languages', value: 'English, Vietnamese, Chinese' },
              { label: 'Trading', value: 'SPX Options — Iron Condors, Covered Calls, CSPs' },
              { label: 'Stack', value: 'Next.js, TypeScript, Prisma, PostgreSQL' },
            ].map(item => (
              <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--white-muted)', paddingTop: '0.15rem' }}>
                  {item.label}
                </span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9rem', color: 'var(--white-dim)' }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — bio */}
        <div className="fade-up-delay-2">
          <div style={{
            background: 'var(--black-3)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: '2.5rem', marginBottom: '2rem',
          }}>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--white-dim)' }}>
              {s.about_bio || 'Bio not set yet. Update it in the admin panel.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/contact" className="btn btn-primary">Get in Touch</a>
            <a href="/blog" className="btn btn-outline">Read My Writing</a>
          </div>

          {/* Social links */}
          {(s.social_github || s.social_linkedin || s.social_twitter) && (
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              {s.social_github && (
                <a href={s.social_github} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--white-muted)', letterSpacing: '0.06em' }}>
                  GitHub ↗
                </a>
              )}
              {s.social_linkedin && (
                <a href={s.social_linkedin} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--white-muted)', letterSpacing: '0.06em' }}>
                  LinkedIn ↗
                </a>
              )}
              {s.social_twitter && (
                <a href={s.social_twitter} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--white-muted)', letterSpacing: '0.06em' }}>
                  Twitter ↗
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </div>
  )
}
