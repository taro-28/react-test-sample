import Link from 'next/link'

export default function Home() {
  return (
    <Link className='text-blue-500 hover:text-blue-300' href='/formik'>
      Formik
    </Link>
  )
}
