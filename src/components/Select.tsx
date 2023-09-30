import clsx from 'clsx'

export const Select = ({ className, ...props }: JSX.IntrinsicElements['select']) => (
  <select
    {...props}
    className={clsx('rounded-md border border-gray-500 p-1 font-normal', className)}
  />
)
