import clsx from 'clsx'
import { memo } from 'react'

export const Button = memo(
  ({ className, type = 'button', ...props }: JSX.IntrinsicElements['button']) => (
    <button
      {...props}
      className={clsx('rounded-md border border-gray-500 p-1 hover:text-gray-500', className)}
      type={type}
    />
  ),
)
