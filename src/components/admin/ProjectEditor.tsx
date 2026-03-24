// src/components/admin/ProjectEditor.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Project {
  id?: string
  title: string
  description: string
  content: string
  tags: string[]
  liveUrl: string
  githubUrl: string
  published: boolean
  featured: boolean
  coverImage: string
  order: number
}

export default function ProjectEditor({ initialData }: { initialData?: Partial<Project> }) {
  const router = useRouter()
  const isEdit = !!initialData?.id

  const [form, setForm] = useState<Project>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    content: initialData?.content || '',
    tags: initialData?.tags || [],
    liveUrl: initialData?.liveUrl || '',
    githubUrl: initialData?.githubUrl || '',
    published: initialData?.published || false,
    featured: initialData?.featured || false,
    coverImage: initialData?.coverImage || '',
    order: initialData?.order || 0,
  })
  const [tagInput, setTagInput] = useState(form.tags.join(', '))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const save = async () => {
    setSaving(true)
    setError('')
    const payload = { ...form, tags: tagInput.split(',').map(t => t.trim()).filter(Boolean) }
    try {
      const url = isEdit ? `/api/projects/${initialData!.id}` : '/api/projects'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error()
      router.push('/admin/projects')
      router.refresh()
    } catch {
      setError('Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Delete this project?')) return
    await fetch(`/api/projects/${initialData!.id}`, { method: 'DELETE' })
    router.push('/admin/projects')
  }

  const F = (field: keyof Project, value: any) => setForm(p => ({ ...p, [field]: value }))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button onClick={() => router.back()} className="btn btn-ghost" style={{ fontSize: '0.8rem' }}>← Back</button>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--white)' }}>
            {isEdit ? 'Edit Project' : 'New Project'}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {isEdit && (
            <button onClick={handleDelete} className="btn btn-ghost" style={{ color: '#f87171', fontSize: '0.8rem' }}>Delete</button>
          )}
          <button onClick={save} disabled={saving} className="btn btn-primary">
            {saving ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </div>

      {error && <p style={{ color: '#f87171', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '1rem' }}>{error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label>Title</label>
            <input className="input" value={form.title} onChange={e => F('title', e.target.value)} placeholder="Project title..." />
          </div>
          <div>
            <label>Short Description</label>
            <textarea className="input" value={form.description} onChange={e => F('description', e.target.value)}
              placeholder="One or two sentences..." rows={2} />
          </div>
          <div>
            <label>Full Content (Markdown)</label>
            <textarea className="input" value={form.content} onChange={e => F('content', e.target.value)}
              placeholder="Full project write-up in Markdown..." style={{ minHeight: '360px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.7 }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'var(--black-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '1rem' }}>Settings</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textTransform: 'none', fontSize: '0.85rem', color: 'var(--white-dim)' }}>
                <input type="checkbox" checked={form.published} onChange={e => F('published', e.target.checked)} />
                Published
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textTransform: 'none', fontSize: '0.85rem', color: 'var(--white-dim)' }}>
                <input type="checkbox" checked={form.featured} onChange={e => F('featured', e.target.checked)} />
                Featured on homepage
              </label>
            </div>
          </div>

          <div style={{ background: 'var(--black-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '0.75rem' }}>Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label>Live URL</label>
                <input className="input" value={form.liveUrl} onChange={e => F('liveUrl', e.target.value)} placeholder="https://..." style={{ fontSize: '0.85rem' }} />
              </div>
              <div>
                <label>GitHub URL</label>
                <input className="input" value={form.githubUrl} onChange={e => F('githubUrl', e.target.value)} placeholder="https://github.com/..." style={{ fontSize: '0.85rem' }} />
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--black-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '0.75rem' }}>Tags</h4>
            <input className="input" value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder="trading, automation" style={{ fontSize: '0.85rem' }} />
          </div>

          <div style={{ background: 'var(--black-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: '0.75rem' }}>Display Order</h4>
            <input className="input" type="number" value={form.order} onChange={e => F('order', Number(e.target.value))} style={{ fontSize: '0.85rem' }} />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--white-muted)', marginTop: '0.4rem' }}>Lower = appears first</p>
          </div>
        </div>
      </div>
    </div>
  )
}
