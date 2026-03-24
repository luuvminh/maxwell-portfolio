// src/app/(site)/page.tsx
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

async function getFeaturedContent() {
  const [posts, projects] = await Promise.all([
    prisma.post.findMany({
      where: { published: true, featured: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    }),
    prisma.project.findMany({
      where: { published: true, featured: true },
      orderBy: { order: 'asc' },
      take: 3,
    }),
  ])
  return { posts, projects }
}

export default async function HomePage() {
  const { posts, projects } = await getFeaturedContent()

  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '8rem clamp(1rem, 4vw, 3rem) 4rem',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
      }}>
        {/* Background accent line */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: 0,
          width: '1px',
          height: '60%',
          background: 'linear-gradient(180deg, transparent, var(--gold-dim), transparent)',
          transform: 'translateY(-50%)',
          display: 'none',
        }} />

        <div className="fade-up">
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '1.5rem',
          }}>
            ◈ Melbourne, Australia
          </p>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 10vw, 9rem)',
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            color: 'var(--white)',
          }}>
            Maxwell
            <span style={{ color: 'var(--gold)' }}>.</span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--white-dim)',
            maxWidth: '600px',
            marginBottom: '3rem',
            lineHeight: 1.4,
          }}>
            Developer, options trader, and lifelong learner.
            Writing at the intersection of technology, markets, and language.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/portfolio" className="btn btn-primary">View My Work</Link>
            <Link href="/blog" className="btn btn-outline">Read the Blog</Link>
          </div>
        </div>

        {/* Decorative bottom stat row */}
        <div className="fade-up-delay-3" style={{
          position: 'absolute',
          bottom: '3rem',
          left: 'clamp(1rem, 4vw, 3rem)',
          right: 'clamp(1rem, 4vw, 3rem)',
          display: 'flex',
          gap: '3rem',
          borderTop: '1px solid var(--border)',
          paddingTop: '1.5rem',
          flexWrap: 'wrap',
        }}>
          {[
            { label: 'Languages', value: 'EN · VI · ZH' },
            { label: 'Based In', value: 'Melbourne' },
            { label: 'Focus', value: 'Dev · Trading · Language' },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--white-muted)',
                marginBottom: '0.25rem',
              }}>{stat.label}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--white)',
              }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Projects ── */}
      {projects.length > 0 && (
        <section style={{
          padding: '5rem clamp(1rem, 4vw, 3rem)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '2.5rem',
          }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '0.5rem',
              }}>Selected Work</p>
              <h2 style={{ color: 'var(--white)' }}>Projects</h2>
            </div>
            <Link href="/portfolio" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--white-muted)',
            }}>View All →</Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}>
            {projects.map((project, i) => (
              <Link key={project.id} href={`/portfolio/${project.slug}`} className="card" style={{
                padding: '2rem',
                display: 'block',
                animationDelay: `${i * 0.1}s`,
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '1rem',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  color: 'var(--white)',
                  marginBottom: '0.75rem',
                }}>{project.title}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Featured Posts ── */}
      {posts.length > 0 && (
        <section style={{
          padding: '5rem clamp(1rem, 4vw, 3rem)',
          maxWidth: '1200px',
          margin: '0 auto',
          borderTop: '1px solid var(--border)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '2.5rem',
          }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '0.5rem',
              }}>Latest Writing</p>
              <h2 style={{ color: 'var(--white)' }}>From the Blog</h2>
            </div>
            <Link href="/blog" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--white-muted)',
            }}>All Posts →</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {posts.map((post, i) => (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto',
                alignItems: 'center',
                gap: '2rem',
                padding: '1.5rem 0',
                borderBottom: '1px solid var(--border)',
                transition: 'all 200ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.paddingLeft = '1rem')}
              onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0')}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--white-muted)',
                  letterSpacing: '0.04em',
                }}>
                  {post.publishedAt ? formatDate(post.publishedAt) : '—'}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    color: 'var(--white)',
                    marginBottom: '0.3rem',
                  }}>{post.title}</h3>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{post.excerpt}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{
        padding: '6rem clamp(1rem, 4vw, 3rem)',
        textAlign: 'center',
        background: 'var(--black-2)',
        borderTop: '1px solid var(--border)',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '1rem',
        }}>Get In Touch</p>
        <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Let's Connect</h2>
        <p style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
          Whether it's a project, collaboration, or just a conversation — I'm open.
        </p>
        <Link href="/contact" className="btn btn-primary">Send a Message</Link>
      </section>
    </>
  )
}
