'use client'
import { HTMLInputType } from '@/types'
import { FormikForm } from './FormikForm'

export default function FormikPage() {
  const initialValues: Partial<Record<HTMLInputType, string | string[] | number | null>> = {
    text: '',
    number: null,
    email: '',
    datetime: '',
    tel: '',
    url: '',
    search: '',
    range: '0',
    checkbox: '',
  }
  return (
    <div className='space-y-4'>
      <h1 className='text-3xl font-bold'>Formik Form</h1>
      <input type='text' value='' />
      <FormikForm initialValues={initialValues} onSubmit={(values) => console.log(values)} />
    </div>
  )
}
