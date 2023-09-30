import { ErrorMessage, Field, Form, Formik, FormikConfig } from 'formik'
import { inputTypeToRoleMap } from '../../consts/inputTypeToRoleMap'
import { HTMLInputType } from '@/types'
import { FormikRadio } from './FormikRadio'
import * as y from 'yup'

const validationSchema = y.object(
  Object.fromEntries(
    Array.from(inputTypeToRoleMap.entries()).map(([inputType]) => {
      const requiredMsg = `${inputType}を入力してください`
      switch (inputType) {
        case 'text':
        case 'tel':
        case 'search':
          return [inputType, y.string().required(requiredMsg)]
        case 'number':
          return [inputType, y.number().required(requiredMsg)]
        case 'email':
          return [
            inputType,
            y
              .string()
              .email(`${inputType}は有効なメールアドレスではありません`)
              .required(requiredMsg),
          ]
        case 'datetime':
          return [inputType, y.date().required(requiredMsg)]
        case 'url':
          return [
            inputType,
            y.string().url(`${inputType}は有効なURLではありません`).required(requiredMsg),
          ]
        default:
          return [inputType, y.mixed()]
      }
    }),
  ),
)

type FormikFormValues = Partial<Record<HTMLInputType, string | string[] | number | null | boolean>>

// TODO add dynamical fields
// TODO add fetch initial values, loading, fetch error test
export const FormikForm = <T extends FormikFormValues>({ ...props }: FormikConfig<T>) => {
  return (
    <Formik {...props} validationSchema={validationSchema}>
      {() => (
        <Form className='flex flex-col space-y-2'>
          {Array.from(inputTypeToRoleMap.entries()).map(([inputType]) => {
            switch (inputType) {
              case 'radio':
                return (
                  <div key={inputType}>
                    <FormikRadio className='flex items-center font-semibold' name={inputType} />
                    <ErrorMessage className='text-red-500' component='div' name={inputType} />
                  </div>
                )
              default:
                return (
                  <div key={inputType}>
                    <label className='flex items-center font-semibold'>
                      {inputType}
                      <Field
                        className='ml-2 rounded-md border border-gray-500 p-1 font-normal'
                        name={inputType}
                        type={inputType}
                      />
                    </label>
                    <ErrorMessage className='text-red-500' component='span' name={inputType} />
                  </div>
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
