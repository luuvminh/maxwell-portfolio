// src/app/(site)/portfolio/[slug]/page.tsx
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } })
  if (!project) return {}
  return { title: project.title, description: project.description }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await prisma.project.findUnique({ where: { slug: params.slug, published: true } })
  if (!project) notFound()

  return (
    <article style={{ padding: '8rem clamp(1rem, 4vw, 3rem) 6rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <header className="fade-up" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            color: 'var(--white)', lineHeight: 1.1, marginBottom: '1.25rem',
          }}>{project.title}</h1>
          <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
            {project.description}
          </p>
          {(project.liveUrl || project.githubUrl) && (
            <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  View Live ↗
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  GitHub ↗
                </a>
              )}
            </div>
          )}
        </header>

        <div className="prose fade-up-delay-1">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
        </div>

        <div style={{ marginTop: '4rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <a href="/portfolio" style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
            letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--white-muted)',
          }}>← All Projects</a>
        </div>
      </div>
    </article>
  )
}
