// src/app/admin/settings/SettingsForm.tsx
'use client'
import { useState } from 'react'

const FIELDS = [
  { section: 'Site Identity', fields: [
    { key: 'site_name',        label: 'Site Name',    type: 'text',     placeholder: 'Maxwell' },
    { key: 'site_tagline',     label: 'Tagline',      type: 'text',     placeholder: 'Developer · Trader · Creator' },
    { key: 'site_description', label: 'Meta Description', type: 'text', placeholder: 'Personal portfolio and blog.' },
    { key: 'site_email',       label: 'Contact Email', type: 'email',   placeholder: 'you@example.com' },
  ]},
  { section: 'About / Bio', fields: [
    { key: 'about_bio', label: 'Biography (shown on About page)', type: 'textarea', placeholder: 'Write a few sentences about yourself...' },
  ]},
  { section: 'Social Links', fields: [
    { key: 'social_github',   label: 'GitHub URL',   type: 'url', placeholder: 'https://github.com/username' },
    { key: 'social_linkedin', label: 'LinkedIn URL', type: 'url', placeholder: 'https://linkedin.com/in/username' },
    { key: 'social_twitter',  label: 'Twitter/X URL', type: 'url', placeholder: 'https://twitter.com/username' },
  ]},
]

export default function SettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState(initialSettings)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const save = async () => {
    setSaving(true)
    setSaved(false)
    setError('')
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (!res.ok) throw new Error()
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError('Failed to save settings.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ maxWidth: '680px', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {FIELDS.map(section => (
        <div key={section.section} style={{
          background: 'var(--black-3)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius)', padding: '1.75rem',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.25rem',
          }}>{section.section}</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {section.fields.map(field => (
              <div key={field.key}>
                <label>{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    className="input"
                    value={settings[field.key] || ''}
                    onChange={e => setSettings(s => ({ ...s, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    rows={4}
                  />
                ) : (
                  <input
                    className="input"
                    type={field.type}
                    value={settings[field.key] || ''}
                    onChange={e => setSettings(s => ({ ...s, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={save} disabled={saving} className="btn btn-primary">
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
        {saved && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.06em' }}>
            ✓ Saved
          </span>
        )}
        {error && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#f87171' }}>
            {error}
          </span>
        )}
      </div>
    </div>
  )
}
