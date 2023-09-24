import React, { ComponentPropsWithoutRef } from 'react'
import { test, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { typedEntries } from '@/funtions'
import { inputTypeToRoleMap } from '../consts/inputTypeToRoleMap'
import { FormikForm } from './FormikForm'

describe('FormikForm', () => {
  test.each<{
    name: string
    initialValues: ComponentPropsWithoutRef<typeof FormikForm>['initialValues']
  }>([
    {
      name: 'should render input empty initial values',
      initialValues: {
        text: '',
        number: null,
        email: '',
        datetime: '',
        tel: '',
        url: '',
        search: '',
        range: '0',
        checkbox: false,
      },
    },
    {
      name: 'should render input with initial values',
      initialValues: {
        text: 'test',
        number: 1,
        email: 'test@example.com',
        datetime: '2021-01-01T00:00:00',
        tel: '0123456789',
        url: 'https://example.com',
        search: 'test search',
        range: '1',
        checkbox: true,
      },
    },
  ])('$name', ({ initialValues }) => {
    render(<FormikForm initialValues={initialValues} onSubmit={() => {}} />)
    typedEntries(initialValues).forEach(async ([name, initialValue]) => {
      const role = inputTypeToRoleMap.get(name)!
      const findTarget = () => screen.findByRole(inputTypeToRoleMap.get(name)!, { name })

      switch (role) {
        case 'checkbox':
          if (!initialValue) {
            expect(await findTarget()).not.toBeChecked()
            break
          }
          expect(await findTarget()).toBeChecked()
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
