import './globals.css'

import ToastProvider from '@/providers/toast'
import type { Metadata } from 'next'
import { NextAuthProvider } from '@/providers/auth'
import { Inter } from 'next/font/google'
import { Instrument_Sans } from 'next/font/google'

const inter = Instrument_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Devlinks',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <ToastProvider>

            {children}

          </ToastProvider>
        </NextAuthProvider>
      </body>

    </html>
  )
}
