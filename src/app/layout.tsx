import NextLink from 'next/link'
import './globals.css'
import type { Metadata } from 'next'
import { NavigationItemLink } from './NavigationItem'

export const metadata: Metadata = {
  title: 'React Test Sample',
  description: 'React Test Sample',
}

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/formik', label: 'Formik Form' },
] as const

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='grid min-h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto]'>
        <header className='col-span-2 border-b-2 p-4 text-center'>
          <NextLink className='text-2xl font-bold' href='/'>
            React Test Sample
          </NextLink>
        </header>
        <nav className='border-r-2'>
          <ul>
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <NavigationItemLink
                  className='block px-6 py-2 text-lg hover:bg-gray-50'
                  href={href}
                >
                  {label}
                </NavigationItemLink>
              </li>
            ))}
          </ul>
        </nav>
        <main className='flex flex-col items-center p-4'>{children}</main>
        <footer className='col-span-2 mt-auto border-t-2 p-4 text-center'>React Test Sample</footer>
      </body>
    </html>
  )
}
