// src/app/layout.tsx
import type { Metadata } from 'next'
import Providers from '@/components/ui/Providers'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Maxwell — Developer · Trader · Creator',
    template: '%s | Maxwell',
  },
  description: 'Personal portfolio and blog by Maxwell. Writing on trading, technology, and language.',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
