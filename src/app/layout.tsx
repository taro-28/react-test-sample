import Link from 'next/link'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'React Test Sample',
  description: 'React Test Sample',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='flex min-h-screen flex-col'>
        <header className='p-4 text-center'>
          <Link className='text-2xl font-bold' href='/'>
            React Test Sample
          </Link>
        </header>
        <main className='flex flex-col items-center px-4'>{children}</main>
        <footer className='mt-auto p-4 text-center'>React Test Sample</footer>
      </body>
    </html>
  )
}
