// src/app/admin/messages/page.tsx
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import MessageActions from './MessageActions'

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const unread = messages.filter(m => !m.read).length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--white)', marginBottom: '0.25rem' }}>
            Messages
          </h1>
          {unread > 0 && (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.08em' }}>
              {unread} unread
            </p>
          )}
        </div>
      </div>

      {messages.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '4rem',
          color: 'var(--white-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
          background: 'var(--black-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
        }}>
          No messages yet.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{
              background: 'var(--black-3)',
              border: `1px solid ${msg.read ? 'var(--border)' : 'rgba(201,168,76,0.25)'}`,
              borderRadius: 'var(--radius)',
              padding: '1.5rem',
              position: 'relative',
            }}>
              {!msg.read && (
                <div style={{
                  position: 'absolute', top: '1.5rem', right: '1.5rem',
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: 'var(--gold)',
                }} />
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '0.25rem' }}>From</div>
                  <div style={{ color: 'var(--white)', fontSize: '0.9rem', fontWeight: msg.read ? 400 : 500 }}>{msg.name}</div>
                  <div style={{ color: 'var(--white-muted)', fontSize: '0.8rem' }}>{msg.email}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '0.25rem' }}>Subject</div>
                  <div style={{ color: 'var(--white)', fontSize: '0.9rem' }}>{msg.subject}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '0.25rem' }}>Received</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--white-muted)' }}>{formatDate(msg.createdAt)}</div>
                </div>
              </div>

              <div style={{
                background: 'var(--black-4)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', padding: '1rem',
                color: 'var(--white-dim)', fontSize: '0.9rem', lineHeight: 1.7,
                marginBottom: '1rem', whiteSpace: 'pre-wrap',
              }}>
                {msg.message}
              </div>

              <MessageActions id={msg.id} read={msg.read} email={msg.email} name={msg.name} subject={msg.subject} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
