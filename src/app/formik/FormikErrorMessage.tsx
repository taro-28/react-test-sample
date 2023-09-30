import clsx from 'clsx'
import { ErrorMessage } from 'formik'
import { ComponentPropsWithoutRef } from 'react'

export const FormikErrorMessage = ({
  component = 'span',
  className,
  ...props
}: ComponentPropsWithoutRef<typeof ErrorMessage>) => (
  <ErrorMessage {...props} className={clsx('text-red-500', className)} component={component} />
)
