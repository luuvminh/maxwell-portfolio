// src/app/admin/posts/page.tsx
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--white)' }}>Blog Posts</h1>
        <Link href="/admin/posts/new" className="btn btn-primary">+ New Post</Link>
      </div>

      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--white-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
          No posts yet. Create your first one.
        </div>
      ) : (
        <div style={{ background: 'var(--black-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Title', 'Status', 'Tags', 'Views', 'Date', 'Actions'].map(col => (
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
              {posts.map(post => (
                <tr key={post.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--white)', fontSize: '0.9rem', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {post.title}
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em',
                      textTransform: 'uppercase', padding: '0.2em 0.6em', borderRadius: '4px',
                      color: post.published ? 'var(--gold)' : 'var(--white-muted)',
                      background: post.published ? 'rgba(201,168,76,0.1)' : 'var(--black-4)',
                      border: `1px solid ${post.published ? 'rgba(201,168,76,0.3)' : 'var(--border)'}`,
                    }}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.8rem', color: 'var(--white-muted)' }}>
                    {post.tags.slice(0, 2).join(', ')}{post.tags.length > 2 ? '...' : ''}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--white-muted)' }}>
                    {post.views}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--white-muted)' }}>
                    {formatDate(post.createdAt)}
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <Link href={`/admin/posts/${post.id}`} style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold-light)',
                      letterSpacing: '0.06em', marginRight: '1rem',
                    }}>Edit</Link>
                    <Link href={`/blog/${post.slug}`} target="_blank" style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--white-muted)', letterSpacing: '0.06em',
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
