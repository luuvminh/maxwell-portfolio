// src/app/admin/projects/page.tsx
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--white)' }}>Projects</h1>
        <Link href="/admin/projects/new" className="btn btn-primary">+ New Project</Link>
      </div>

      {projects.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '4rem',
          color: 'var(--white-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
          background: 'var(--black-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
        }}>
          No projects yet. Create your first one.
        </div>
      ) : (
        <div style={{
          background: 'var(--black-3)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius)', overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['#', 'Title', 'Status', 'Tags', 'Links', 'Actions'].map(col => (
                  <th key={col} style={{
                    padding: '0.75rem 1rem', textAlign: 'left',
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--white-muted)',
                  }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((project, i) => (
                <tr key={project.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--white-muted)' }}>
                    {String(project.order || i + 1).padStart(2, '0')}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', maxWidth: '260px' }}>
                    <div style={{ color: 'var(--white)', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {project.title}
                    </div>
                    <div style={{ color: 'var(--white-muted)', fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '0.15rem' }}>
                      {project.description}
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em',
                      textTransform: 'uppercase', padding: '0.2em 0.6em', borderRadius: '4px',
                      color: project.published ? 'var(--gold)' : 'var(--white-muted)',
                      background: project.published ? 'rgba(201,168,76,0.1)' : 'var(--black-4)',
                      border: `1px solid ${project.published ? 'rgba(201,168,76,0.3)' : 'var(--border)'}`,
                    }}>
                      {project.published ? 'Live' : 'Draft'}
                    </span>
                    {project.featured && (
                      <span style={{
                        marginLeft: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                        letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.2em 0.5em',
                        borderRadius: '4px', color: 'var(--gold-light)',
                        background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)',
                      }}>★</span>
                    )}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.8rem', color: 'var(--white-muted)' }}>
                    {project.tags.slice(0, 2).join(', ')}{project.tags.length > 2 ? '...' : ''}
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gold-light)', letterSpacing: '0.06em' }}>
                          Live ↗
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--white-muted)', letterSpacing: '0.06em' }}>
                          GH ↗
                        </a>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <Link href={`/admin/projects/${project.id}`} style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                      color: 'var(--gold-light)', letterSpacing: '0.06em', marginRight: '1rem',
                    }}>Edit</Link>
                    <Link href={`/portfolio/${project.slug}`} target="_blank" style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                      color: 'var(--white-muted)', letterSpacing: '0.06em',
                    }}>View ↗</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
