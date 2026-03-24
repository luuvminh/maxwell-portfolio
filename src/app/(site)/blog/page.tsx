// src/app/(site)/blog/page.tsx
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Essays, notes, and reflections on trading, technology, and language.',
}

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <div style={{
      padding: '8rem clamp(1rem, 4vw, 3rem) 5rem',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      <div className="fade-up" style={{ marginBottom: '4rem' }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '0.75rem',
        }}>Writing</p>
        <h1 style={{ color: 'var(--white)', marginBottom: '0.75rem' }}>The Blog</h1>
        <p style={{ maxWidth: '500px', fontSize: '1.05rem' }}>
          Notes on trading, technology, languages, and whatever else holds my attention.
        </p>
      </div>

      {posts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '5rem 0',
          color: 'var(--white-muted)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
        }}>
          No posts published yet.
        </div>
      ) : (
        <div>
          {posts.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr',
                gap: '2rem',
                padding: '2rem 0',
                borderBottom: '1px solid var(--border)',
                transition: 'all 200ms ease',
                textDecoration: 'none',
              }}
            >
              <div style={{ paddingTop: '0.3rem' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.04em',
                  color: 'var(--white-muted)',
                  lineHeight: 1.6,
                }}>
                  {post.publishedAt ? formatDate(post.publishedAt) : ''}
                </div>
              </div>
              <div>
                {post.featured && (
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    marginBottom: '0.4rem',
                    display: 'block',
                  }}>★ Featured</span>
                )}
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.7rem',
                  color: 'var(--white)',
                  marginBottom: '0.5rem',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}>{post.title}</h2>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1rem' }}>
                  {post.excerpt}
                </p>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {post.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
