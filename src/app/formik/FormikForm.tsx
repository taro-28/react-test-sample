import { Field, Form, Formik, FormikConfig } from 'formik'
import { inputTypeToRoleMap } from '../../consts/inputTypeToRoleMap'
import { HTMLInputType } from '@/types'
import { FormikRadio } from './FormikRadio'
import * as y from 'yup'
import { FormikErrorMessage } from './FormikErrorMessage'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import { Button } from '@/components/Button'
import { FormikSelect } from './FormikSelect'

const validationSchema = y.object(
  Object.fromEntries(
    Array.from(inputTypeToRoleMap.entries()).map(([inputType]) => [
      inputType,
      (() => {
        const requiredMsg = `${inputType}を入力してください`
        switch (inputType) {
          case 'text':
          case 'tel':
          case 'search':
          case 'select':
            return y.string().required(requiredMsg)
          case 'number':
            return y.number().required(requiredMsg)
          case 'email':
            return y
              .string()
              .email(`${inputType}は有効なメールアドレスではありません`)
              .required(requiredMsg)
          case 'datetime':
            return y.date().required(requiredMsg)
          case 'url':
            return y.string().url(`${inputType}は有効なURLではありません`).required(requiredMsg)
          default:
            return y.mixed()
        }
      })(),
    ]),
  ),
)

type FormikFormValues = Partial<Record<HTMLInputType, string | string[] | number | null | boolean>>

const radioOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

export const selectOptions = [
  { label: '🍎Apple', value: 'apple' },
  { label: '🍊Orange', value: 'orange' },
  { label: '🍌Banana', value: 'banana' },
]

// TODO add dynamical fields
// TODO add fetch initial values, loading, fetch error test
export const FormikForm = <T extends FormikFormValues>({ ...props }: FormikConfig<T>) => {
  return (
    <Formik {...props} validationSchema={validationSchema}>
      {() => (
        <Form className='w-fit space-y-2'>
          {Array.from(inputTypeToRoleMap.entries()).map(([inputType]) => (
            <div key={inputType}>
              <Label className='grid grid-cols-2 items-center'>
                {inputType}
                {(() => {
                  switch (inputType) {
                    case 'radio':
                      return (
                        <FormikRadio
                          className='flex items-center '
                          name={inputType}
                          options={radioOptions}
                        />
                      )
                    case 'select':
                      return <FormikSelect name={inputType} options={selectOptions} />
                    default:
                      return <Field as={Input} name={inputType} type={inputType} />
                  }
                })()}
              </Label>
              <FormikErrorMessage name={inputType} />
            </div>
          ))}
          <Button className='w-full' type='submit'>
            submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}
