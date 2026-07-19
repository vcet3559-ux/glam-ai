import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Glam AI - Virtual Try-On Beauty & Fashion Marketplace',
  description:
    'Try before you buy! Virtual makeup try-on using AI. AI recommendations, price comparison, and shopping from your favorite brands.',
  keywords: [
    'virtual try-on',
    'makeup',
    'beauty',
    'fashion',
    'AI',
    'price comparison',
    'shopping',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
