import { HTMLInputType } from '@/types'
import { ByRoleMatcher } from '@testing-library/react'

export const inputTypeToRoleMap = new Map<HTMLInputType, ByRoleMatcher>([
  ['text', 'textbox'],
  ['number', 'spinbutton'],
  ['checkbox', 'checkbox'],
  ['radio', 'radio'],
  ['time', 'spinbutton'],
  ['date', 'spinbutton'],
  ['datetime', 'textbox'],
  ['datetime-local', 'textbox'],
  ['week', 'spinbutton'],
  ['month', 'spinbutton'],
  ['year', 'spinbutton'],
  ['tel', 'textbox'],
  ['email', 'textbox'],
  ['password', 'textbox'],
  ['url', 'textbox'],
  ['search', 'searchbox'],
  ['color', 'spinbutton'],
  ['range', 'slider'],
  ['file', 'button'],
  ['image', 'button'],
  ['select', 'combobox'],
])
