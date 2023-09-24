import { Field, Form, Formik, FormikConfig } from 'formik'
import { inputTypeToRoleMap } from '../consts/inputTypeToRoleMap'
import { HTMLInputType } from '@/types'
import { FormikRadio } from './FormikRadio'

export const FormikForm = <
  T extends Partial<Record<HTMLInputType, string | string[] | number | null>>,
>({
  ...props
}: FormikConfig<T>) => {
  return (
    <Formik {...props}>
      {() => (
        <Form className='flex flex-col space-y-2'>
          {Array.from(inputTypeToRoleMap.entries()).map(([inputType]) => {
            switch (inputType) {
              case 'radio':
                return (
                  <FormikRadio
                    className='flex items-center font-semibold'
                    key={inputType}
                    name={inputType}
                  />
                )
              default:
                return (
                  <label className='flex items-center font-semibold' key={inputType}>
                    {inputType}
                    <Field
                      className='ml-2 rounded-md border border-gray-500 p-1 font-normal'
                      name={inputType}
                      type={inputType}
                    />
                  </label>
                )
            }
          })}
          <button
            className='rounded-md border border-gray-500 p-1 hover:text-gray-500'
            type='submit'
          >
            submit
          </button>
        </Form>
      )}
    </Formik>
  )
}
