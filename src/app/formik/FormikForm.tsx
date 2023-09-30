import { Field, Form, Formik, FormikConfig } from 'formik'
import { inputTypeToRoleMap } from '../../consts/inputTypeToRoleMap'
import { HTMLInputType } from '@/types'
import { FormikRadio } from './FormikRadio'
import * as y from 'yup'
import { FormikErrorMessage } from './FormikErrorMessage'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import { Button } from '@/components/Button'

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
          {Array.from(inputTypeToRoleMap.entries()).map(([inputType]) => (
            <div key={inputType}>
              {(() => {
                switch (inputType) {
                  case 'radio':
                    return <FormikRadio className='flex items-center' name={inputType} />
                  default:
                    return (
                      <Label className='flex items-center'>
                        {inputType}
                        <Field as={Input} className='ml-2' name={inputType} type={inputType} />
                      </Label>
                    )
                }
              })()}
              <FormikErrorMessage name={inputType} />
            </div>
          ))}
          <Button type='submit'>submit</Button>
        </Form>
      )}
    </Formik>
  )
}
