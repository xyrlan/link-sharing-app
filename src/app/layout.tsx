import './globals.css'

import ToastProvider from '@/providers/toast'
import type { Metadata } from 'next'
import { NextAuthProvider } from '@/providers/auth'
import { Inter } from 'next/font/google'
import { Instrument_Sans } from 'next/font/google'
import Head from 'next/head'

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
      <Head>
        <link rel='icon' href='/images/logo-devlinks-small.svg' />
      </Head>
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
