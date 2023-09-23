'use client'
import { HTMLInputType } from '@/types'
import { FormikForm } from './FormikForm'

export default function FormikPage() {
  const initialValues: Partial<Record<HTMLInputType, any>> = {
    text: '',
    number: null,
    email: '',
    datetime: '',
    tel: '',
    url: '',
    search: '',
    range: '0',
    checkbox: false,
  }
  return (
    <div className='space-y-4'>
      <h1 className='text-3xl font-bold'>Formik Form</h1>
      <FormikForm initialValues={initialValues} onSubmit={(values) => console.log(values)} />
    </div>
  )
}
