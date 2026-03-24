// src/app/admin/settings/page.tsx
import { prisma } from '@/lib/prisma'
import SettingsForm from './SettingsForm'

export default async function AdminSettingsPage() {
  const rows = await prisma.siteSettings.findMany()
  const settings = Object.fromEntries(rows.map(r => [r.key, r.value]))

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--white)', marginBottom: '0.25rem' }}>
          Settings
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--white-muted)', letterSpacing: '0.06em' }}>
          Site identity, bio, and social links
        </p>
      </div>
      <SettingsForm initialSettings={settings} />
    </div>
  )
}
