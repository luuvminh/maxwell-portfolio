// src/app/admin/page.tsx
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminDashboard() {
  const [postCount, projectCount, msgCount, unreadCount] = await Promise.all([
    prisma.post.count(),
    prisma.project.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ])

  const recentPosts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
  const recentMsgs = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })

  const stats = [
    { label: 'Total Posts',     value: postCount,    href: '/admin/posts',    icon: '✦' },
    { label: 'Projects',        value: projectCount, href: '/admin/projects', icon: '◻' },
    { label: 'Messages',        value: msgCount,     href: '/admin/messages', icon: '✉' },
    { label: 'Unread Messages', value: unreadCount,  href: '/admin/messages', icon: '●', accent: unreadCount > 0 },
  ]

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--white)', marginBottom: '0.25rem' }}>
          Dashboard
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--white-muted)', letterSpacing: '0.06em' }}>
          Welcome back, Maxwell.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
        {stats.map(stat => (
          <Link key={stat.label} href={stat.href} style={{
            background: 'var(--black-3)', border: `1px solid ${stat.accent ? 'var(--gold-dim)' : 'var(--border)'}`,
            borderRadius: 'var(--radius)', padding: '1.25rem', display: 'block', transition: 'all 200ms ease',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', color: stat.accent ? 'var(--gold)' : 'var(--white-muted)',
              marginBottom: '0.5rem',
            }}>{stat.icon} {stat.label}</div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '2.5rem',
              color: stat.accent ? 'var(--gold-light)' : 'var(--white)', lineHeight: 1,
            }}>{stat.value}</div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem' }}>
        <Link href="/admin/posts/new" className="btn btn-primary">+ New Post</Link>
        <Link href="/admin/projects/new" className="btn btn-outline">+ New Project</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Recent posts */}
        <div style={{ background: 'var(--black-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '1rem' }}>
            Recent Posts
          </h3>
          {recentPosts.map(post => (
            <Link key={post.id} href={`/admin/posts/${post.id}`} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.6rem 0', borderBottom: '1px solid var(--border)', gap: '1rem',
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--white-dim)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {post.title}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.08em',
                textTransform: 'uppercase', flexShrink: 0,
                color: post.published ? 'var(--gold)' : 'var(--white-muted)',
              }}>
                {post.published ? 'Live' : 'Draft'}
              </span>
            </Link>
          ))}
        </div>

        {/* Recent messages */}
        <div style={{ background: 'var(--black-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '1rem' }}>
            Recent Messages
          </h3>
          {recentMsgs.length === 0 && (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--white-muted)' }}>No messages yet.</p>
          )}
          {recentMsgs.map(msg => (
            <div key={msg.id} style={{
              padding: '0.6rem 0', borderBottom: '1px solid var(--border)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
            }}>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: '0.85rem', color: msg.read ? 'var(--white-muted)' : 'var(--white)', fontWeight: msg.read ? 400 : 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {msg.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--white-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {msg.subject}
                </div>
              </div>
              {!msg.read && (
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
