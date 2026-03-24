// src/app/admin/layout.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--black)' }}>
      <AdminSidebar />
      <main style={{ flex: 1, overflow: 'auto', padding: '2rem 2.5rem' }}>
        {children}
      </main>
    </div>
  )
}
