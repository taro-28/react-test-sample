'use client'
import { typedKeys } from '@/funtions'
import { HTMLInputType } from '@/types'
import { Field, Formik } from 'formik'

export const initialValues: Partial<Record<HTMLInputType, any>> = {
  text: '',
  number: null,
  email: '',
  datetime: '',
  tel: '',
  url: '',
  search: '',
  range: '0',
  checkbox: false,
  // cannot be tested
  // password: '',
  // date: '',
  // time: '',
  // month: '',
  // week: '',
  // color: '',
  // radio: '',
  // file: '',
  // image: '',
  // 'datetime-local': '',
}

export default function FormikPage() {
  return (
    <div className='space-y-4'>
      <h1 className='text-3xl font-bold'>Formik Form</h1>
      <Formik initialValues={initialValues} onSubmit={(values) => console.log(values)}>
        {({ handleSubmit }) => (
          <form className='flex flex-col space-y-2' onSubmit={handleSubmit}>
            {typedKeys(initialValues).map((key) => (
              <label className='flex items-center font-semibold' key={key}>
                {key}
                <Field
                  className='ml-2 rounded-md border border-gray-500 p-1 font-normal'
                  name={key}
                  type={key}
                  // TODO add placeholder
                />
              </label>
            ))}
            <button className='rounded-md border border-gray-500 p-1 hover:text-gray-500'>
              submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}
