'use client'
import { FormikForm } from './FormikForm'
import { ComponentPropsWithoutRef } from 'react'

export default function FormikPage() {
  const initialValues: ComponentPropsWithoutRef<typeof FormikForm>['initialValues'] = {
    text: '',
    number: '',
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
      {/* TODO add yup validation */}
      <FormikForm initialValues={initialValues} onSubmit={(values) => console.log(values)} />
    </div>
  )
}
