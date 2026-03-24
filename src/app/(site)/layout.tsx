// src/app/(site)/layout.tsx
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main style={{ minHeight: '80vh' }}>{children}</main>
      <Footer />
    </>
  )
}
