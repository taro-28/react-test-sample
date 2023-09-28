import { ErrorMessage, Field, Form, Formik, FormikConfig } from 'formik'
import { inputTypeToRoleMap } from '../../consts/inputTypeToRoleMap'
import { HTMLInputType } from '@/types'
import { FormikRadio } from './FormikRadio'
import * as y from 'yup'

const validationSchema = y.object({
  text: y.string().required('textを入力してください'),
  number: y.number().required('numberを入力してください'),
  email: y
    .string()
    .email('emailは有効なメールアドレスではありません')
    .required('emailを入力してください'),
  datetime: y.date().required('datetimeを入力してください'),
  tel: y.string().required('telを入力してください'),
  url: y.string().url('urlは有効なURLではありません').required('urlを入力してください'),
  search: y.string().required('searchを入力してください'),
})

type FormikFormValues = Partial<Record<HTMLInputType, string | string[] | number | null | boolean>>

// TODO add dynamical fields
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
