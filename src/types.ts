import { HTMLInputTypeAttribute } from 'react'

export type HTMLInputType = Exclude<
  HTMLInputTypeAttribute,
  'submit' | 'button' | 'reset' | 'hidden'
>
