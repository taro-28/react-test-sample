import React, { ComponentPropsWithoutRef } from 'react'
import { test, expect, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { inputTypeToRoleMap } from '../../consts/inputTypeToRoleMap'
import { FormikForm } from './FormikForm'
import { typedEntries } from '@/functions/object'

type Values = ComponentPropsWithoutRef<typeof FormikForm>['initialValues']
type TestCase = {
  name: string
  initialValues: Values
  updatedValues: Values
}

// TODO add test cases of radio, select, textarea
describe('FormikForm', () => {
  test.each<TestCase>([
    {
      name: 'should render input empty initial values',
      initialValues: {
        text: '',
        number: '',
        email: '',
        datetime: '',
        tel: '',
        url: '',
        search: '',
        checkbox: false,
      },
      updatedValues: {
        text: 'Hello World',
        number: 1,
        email: 'test@example',
        datetime: '2021-01-01T00:00:00',
        tel: '0123456789',
        url: 'https://example.com',
        search: 'test search',
        checkbox: true,
      },
    },
    {
      name: 'should render input with initial values',
      initialValues: {
        text: 'test',
        number: 1,
        email: 'test1@example.com',
        datetime: '2021-01-01T00:00:00',
        tel: '0123456789',
        url: 'https://example1.com',
        search: 'test search',
        checkbox: false,
      },
      updatedValues: {
        text: 'Hello World',
        number: 2,
        email: 'test2@example',
        datetime: '2022-01-01T00:00:00',
        tel: '0234567890',
        url: 'https://example2.com',
        search: 'updated test search',
        checkbox: true,
      },
    },
  ])('$name', async ({ initialValues, updatedValues }) => {
    const onSubmitMock = vi.fn()
    render(<FormikForm initialValues={initialValues} onSubmit={(values) => onSubmitMock(values)} />)

    if (initialValues.text === '') {
      await userEvent.click(screen.getByRole('button', { name: /submit/i }))
      expect(onSubmitMock).toHaveBeenCalledTimes(0)
    }

    for (const [name, initialValue] of typedEntries(initialValues)) {
      const updatedValue = updatedValues[name]!
      const role = inputTypeToRoleMap.get(name)!
      const getField = () => screen.getByRole(role, { name })
      switch (role) {
        case 'checkbox': {
          const expected = expect(getField())
          initialValue ? expected.toBeChecked() : expected.not.toBeChecked()
          break
        }
        case 'spinbutton':
          if (initialValue === '') {
            expect(getField()).toHaveValue(null)
            break
          }
          if (typeof initialValue !== 'number') throw new Error('only number is reachable')
          expect(getField()).toHaveValue(initialValue)
          break
        default:
          if (typeof initialValue === 'boolean') throw new Error('boolean is not reachable')
          expect(getField()).toHaveValue(initialValue)
      }

      if (initialValue === '') {
        switch (role) {
          case 'checkbox':
            break
          default:
            expect(screen.getByText(`${name}を入力してください`)).toBeInTheDocument()
        }
      }

      switch (name) {
        case 'email':
          await userEvent.clear(getField())
          await userEvent.type(getField(), 'invalid url')
          expect(getField()).toHaveValue('invalid url')
          await userEvent.click(screen.getByRole('button', { name: /submit/i }))
          expect(onSubmitMock).toHaveBeenCalledTimes(0)
          expect(
            screen.getByText(`${name}は有効なメールアドレスではありません`),
          ).toBeInTheDocument()
          break
        case 'url':
          await userEvent.clear(getField())
          await userEvent.type(getField(), 'invalid url')
          expect(getField()).toHaveValue('invalid url')
          await userEvent.click(screen.getByRole('button', { name: /submit/i }))
          expect(onSubmitMock).toHaveBeenCalledTimes(0)
          expect(screen.getByText(`${name}は有効なURLではありません`)).toBeInTheDocument()
          break
      }

      switch (role) {
        case 'checkbox': {
          await userEvent.click(getField())
          const expected = expect(getField())
          updatedValue ? expected.toBeChecked() : expected.not.toBeChecked()
          break
        }
        case 'spinbutton':
          await userEvent.clear(getField())
          await userEvent.type(getField(), updatedValue.toString())
          if (typeof updatedValue === 'boolean') throw new Error('boolean is not reachable')
          expect(getField()).toHaveValue(updatedValue)
          break
        default:
          await userEvent.clear(getField())
          if (typeof updatedValue !== 'string') throw new Error('only string is reachable')
          await userEvent.type(getField(), updatedValue)
          expect(getField()).toHaveValue(updatedValue)
      }
    }

    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(onSubmitMock).toHaveBeenCalledTimes(1)
    expect(onSubmitMock).toHaveBeenCalledWith(updatedValues)
  })
})
