// src/app/(site)/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } })
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug, published: true } })
  if (!post) notFound()

  // Increment view count
  await prisma.post.update({ where: { id: post.id }, data: { views: { increment: 1 } } })

  return (
    <article style={{ padding: '8rem clamp(1rem, 4vw, 3rem) 6rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <header className="fade-up" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {post.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            color: 'var(--white)',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}>{post.title}</h1>
          <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--white-dim)' }}>
            {post.excerpt}
          </p>
          <div style={{
            display: 'flex',
            gap: '2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--white-muted)',
            letterSpacing: '0.06em',
            borderTop: '1px solid var(--border)',
            paddingTop: '1.5rem',
          }}>
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            <span>{post.views} views</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose fade-up-delay-1">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        {/* Back link */}
        <div style={{ marginTop: '4rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <a href="/blog" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--white-muted)',
          }}>← All Posts</a>
        </div>
      </div>
    </article>
  )
}
