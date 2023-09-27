import { ErrorMessage, Field, Form, Formik, FormikConfig } from 'formik'
import { inputTypeToRoleMap } from '../consts/inputTypeToRoleMap'
import { HTMLInputType } from '@/types'
import { FormikRadio } from './FormikRadio'

type FormikFormValues = Partial<Record<HTMLInputType, string | string[] | number | null | boolean>>

// TODO add dynamical fields
export const FormikForm = <T extends FormikFormValues>({ ...props }: FormikConfig<T>) => {
  return (
    <Formik
      {...props}
      // validationSchema={y.object<FormikFormValues>(
      //   Object.fromEntries(
      //     Array.from(inputTypeToRoleMap.entries()).map(([inputType]) => {
      //       switch (inputType) {
      //         case 'email':
      //           return [inputType, y.string().email().required()]
      //         case 'url':
      //           return [inputType, y.string().url().required()]
      //         case 'number':
      //           return [inputType, y.number().required()]
      //         case 'checkbox':
      //         default:
      //           return [inputType, y.string().required()]
      //       }
      //     }),
      //   ),
      // )}
    >
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
