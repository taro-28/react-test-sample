import { Field, Form, Formik, FormikConfig } from 'formik'
import { inputTypeToRoleMap } from '../consts/inputTypeToRoleMap'
import { HTMLInputType } from '@/types'

export const FormikForm = <T extends Partial<Record<HTMLInputType, any>>>({
  ...props
}: FormikConfig<T>) => {
  return (
    <Formik {...props}>
      {() => (
        <Form className='flex flex-col space-y-2'>
          {Array.from(inputTypeToRoleMap.entries()).map(([key]) => (
            <label className='flex items-center font-semibold' key={key}>
              {key}
              <Field
                className='ml-2 rounded-md border border-gray-500 p-1 font-normal'
                name={key}
                type={key}
              />
            </label>
          ))}
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
