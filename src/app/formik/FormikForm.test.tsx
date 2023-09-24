import React, { ComponentPropsWithoutRef } from 'react'
import { test, expect, describe, vi } from 'vitest'
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
        checkbox: 'false',
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
        checkbox: 'false',
      },
    },
  ])('$name', async ({ initialValues }) => {
    const onSubmitMock = vi.fn()
    render(<FormikForm initialValues={initialValues} onSubmit={onSubmitMock} />)
    for (const [name, initialValue] of typedEntries(initialValues)) {
      const role = inputTypeToRoleMap.get(name)!
      const getField = () => screen.getByRole(role, { name })
      switch (role) {
        case 'checkbox': {
          const expected = expect(getField())
          initialValue ? expected.toBeChecked() : expected.not.toBeChecked()
          break
        }
        default:
          expect(getField()).toHaveValue(initialValue)
      }

      switch (role) {
        case 'slider':
          break
        case 'checkbox': {
          await userEvent.click(getField())
          const expected = expect(getField())
          initialValue ? expected.not.toBeChecked() : expected.toBeChecked()
          break
        }
        case 'spinbutton':
          await userEvent.clear(getField())
          await userEvent.type(getField(), '1')
          expect(getField()).toHaveValue(1)
          break
        default:
          await userEvent.clear(getField())
          await userEvent.type(getField(), 'Hello World')
          expect(getField()).toHaveValue('Hello World')
      }
    }
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    // FIXME: onSubmitMock is not called
    expect(onSubmitMock).toHaveBeenCalledWith(initialValues)
  })
})
