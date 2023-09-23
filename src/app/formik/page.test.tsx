import React from 'react'
import FormikPage, { initialValues } from './page'
import { test, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { typedEntries } from '@/funtions'
import { inputTypeToRoleMap } from '../consts/inputTypeToRoleMap'

// split test for create and update
describe('FormikPage', () => {
  typedEntries(initialValues).forEach(([name, initialValue]) => {
    test(`should render ${name} input`, async () => {
      render(<FormikPage />)
      const role = inputTypeToRoleMap.get(name)!
      const getTarget = () => screen.getByRole(inputTypeToRoleMap.get(name)!, { name })

      switch (role) {
        case 'checkbox':
          expect(getTarget()).not.toBeChecked()
          break
        default:
          expect(getTarget()).toHaveValue(initialValue)
      }

      await userEvent.click(getTarget())
      expect(getTarget()).toHaveFocus()

      switch (role) {
        case 'slider':
          break
        case 'checkbox':
          expect(getTarget()).toBeChecked()
          break
        case 'spinbutton':
          await userEvent.type(getTarget(), '1')
          expect(getTarget()).toHaveValue(1)
          break
        default:
          await userEvent.type(getTarget(), 'Hello World')
          expect(getTarget()).toHaveValue('Hello World')
      }

      await userEvent.click(screen.getByRole('button', { name: 'submit' }))
      // TODO add test for submit
    })
  })
})
