import React from 'react'
import FormikPage, { initialValues } from './page'
import { test, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { typedEntries } from '@/funtions'
import { inputTypeToRoleMap } from '../consts/inputTypeToRoleMap'
import { HTMLInputType } from '@/types'

const initialValues: Partial<Record<HTMLInputType, any>> = {
  text: '',
  number: null,
  email: '',
  datetime: '',
  tel: '',
  url: '',
  search: '',
  range: '0',
  checkbox: false,
  // cannot be tested
  // password: '',
  // date: '',
  // time: '',
  // month: '',
  // week: '',
  // color: '',
  // radio: '',
  // file: '',
  // image: '',
  // 'datetime-local': '',
}

// split test for create and update0
describe('FormikPage', () => {
  test(`should render input`, () => {
    render(<FormikPage />)
    typedEntries(initialValues).forEach(async ([name, initialValue]) => {
      const role = inputTypeToRoleMap.get(name)!
      const findTarget = () => screen.findByRole(inputTypeToRoleMap.get(name)!, { name })

      switch (role) {
        case 'checkbox':
          expect(await findTarget()).not.toBeChecked()
          break
        default:
          expect(await findTarget()).toHaveValue(initialValue)
      }

      await userEvent.click(await findTarget())
      expect(findTarget()).toHaveFocus()

      switch (role) {
        case 'slider':
          break
        case 'checkbox':
          expect(findTarget()).toBeChecked()
          break
        case 'spinbutton':
          await userEvent.type(await findTarget(), '1')
          expect(findTarget()).toHaveValue(1)
          break
        default:
          await userEvent.type(await findTarget(), 'Hello World')
          expect(findTarget()).toHaveValue('Hello World')
      }

      await userEvent.click(screen.getByRole('button', { name: 'submit' }))

      // TODO add test for submit
    })
  })
})
