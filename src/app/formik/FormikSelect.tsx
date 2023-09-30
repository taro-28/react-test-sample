import { Select } from '@/components/Select'
import { Field } from 'formik'
import { ComponentPropsWithoutRef } from 'react'

type Props = {
  options: {
    label: string
    value: string
  }[]
} & ComponentPropsWithoutRef<typeof Select>

export const FormikSelect = ({ name, options, className, ...props }: Props) => (
  <Field as={Select} className={className} name={name} {...props}>
    {options.map(({ label, value }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </Field>
)
