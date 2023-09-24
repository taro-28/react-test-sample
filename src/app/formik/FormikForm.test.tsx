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
    const onSubmitMock = vi.fn()
    render(<FormikForm initialValues={initialValues} onSubmit={onSubmitMock} />)
    typedEntries(initialValues).forEach(async ([name, initialValue]) => {
      const role = inputTypeToRoleMap.get(name)!
      switch (role) {
        case 'checkbox':
          const expected = expect(screen.getByRole(role, { name }))
          initialValue ? expected.toBeChecked() : expected.not.toBeChecked()
          break
        default:
          expect(screen.getByRole(role, { name })).toHaveValue(initialValue)
      }

      switch (role) {
        case 'slider':
          break
        case 'checkbox':
          await userEvent.click(screen.getByRole(role, { name }))
          const expected = expect(screen.getByRole(role, { name }))
          initialValue ? expected.not.toBeChecked() : expected.toBeChecked()
          break
        case 'spinbutton':
          await userEvent.type(screen.getByRole(role, { name }), '1')
          expect(screen.getByRole(role, { name })).toHaveValue(1)
          break
        default:
          await userEvent.type(screen.getByRole(role, { name }), 'Hello World')
          expect(screen.getByRole(role, { name })).toHaveValue('Hello World')
      }

      expect(true).toBe(false)
      await userEvent.click(screen.getByRole('button', { name: 'submit' }))
      expect(onSubmitMock.mock.calls.length).toBe(1)
      expect(onSubmitMock.mock.calls[0][0][name]).toStrictEqual('aaa')
    })
  })
})
