// src/app/admin/messages/MessageActions.tsx
'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function MessageActions({
  id, read, email, name, subject,
}: {
  id: string; read: boolean; email: string; name: string; subject: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const markRead = async () => {
    setLoading(true)
    await fetch(`/api/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: true }),
    })
    router.refresh()
    setLoading(false)
  }

  const del = async () => {
    if (!confirm('Delete this message?')) return
    setLoading(true)
    await fetch(`/api/messages/${id}`, { method: 'DELETE' })
    router.refresh()
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      {!read && (
        <button onClick={markRead} disabled={loading} className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '0.4em 1em' }}>
          Mark as Read
        </button>
      )}
      <a
        href={`mailto:${email}?subject=Re: ${encodeURIComponent(subject)}`}
        className="btn btn-primary"
        style={{ fontSize: '0.78rem', padding: '0.4em 1em' }}
      >
        Reply via Email ↗
      </a>
      <button onClick={del} disabled={loading} className="btn btn-ghost" style={{ fontSize: '0.78rem', color: '#f87171', padding: '0.4em 0.8em' }}>
        Delete
      </button>
    </div>
  )
}
