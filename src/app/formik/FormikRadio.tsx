import { Field } from 'formik'
import clsx from 'clsx'

type Props = {
  options?: {
    label: string
    value: string
  }[]
} & JSX.IntrinsicElements['fieldset']

export const FormikRadio = ({
  name,
  options = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ],
  className,
  ...props
}: Props) => (
  <fieldset {...props} className={clsx('space-x-2', className)}>
    {options.map(({ label, value }) => (
      <label className='flex items-center' key={value}>
        {label}
        <Field className='ml-1' name={name} type='radio' value={value} />
      </label>
    ))}
  </fieldset>
)
