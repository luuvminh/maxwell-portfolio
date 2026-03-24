// src/app/(site)/portfolio/page.tsx
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Projects and things I have built.',
}

export default async function PortfolioPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })

  return (
    <div style={{ padding: '8rem clamp(1rem, 4vw, 3rem) 5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="fade-up" style={{ marginBottom: '4rem' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem',
        }}>Selected Work</p>
        <h1 style={{ color: 'var(--white)', marginBottom: '0.75rem' }}>Portfolio</h1>
        <p style={{ maxWidth: '500px', fontSize: '1.05rem' }}>
          A collection of projects spanning development, trading automation, and tooling.
        </p>
      </div>

      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--white-muted)', fontFamily: 'var(--font-mono)' }}>
          No projects published yet.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {projects.map((project, i) => (
            <Link key={project.id} href={`/portfolio/${project.slug}`} className="card" style={{ padding: '2.5rem', display: 'block' }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.25rem',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.8rem',
                color: 'var(--white)', marginBottom: '0.75rem', fontWeight: 400,
              }}>{project.title}</h2>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>{project.description}</p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
              {(project.liveUrl || project.githubUrl) && (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {project.liveUrl && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold-light)', letterSpacing: '0.06em' }}>
                      Live ↗
                    </span>
                  )}
                  {project.githubUrl && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--white-muted)', letterSpacing: '0.06em' }}>
                      GitHub ↗
                    </span>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
