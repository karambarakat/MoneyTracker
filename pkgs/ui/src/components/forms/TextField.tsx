import 'twin.macro'
import React from 'react'
import { PropsOf } from '@emotion/react'
import { Field, useField, useFormikContext } from 'formik'
import type { FieldProps } from 'formik'
import { capitalCase } from 'change-case'
import { WithAsChild } from '../../utils/WithChildren'
import { Slot } from '@radix-ui/react-slot'

interface Props {
  /**
   * name of the field could be nested or not
   * @example 'email', 'address.street' or 'friends[0].name
   */
  name: string
  /**
   * displayed title
   */
  title?: string
  /**
   * placeholder text
   */
  placeholder?: string
}

interface BridgeProps {
  formikName: string
  title?: string
  validate?: (value: string) => string | undefined
}

/**
 * this component is a bridge that separate formik logic
 * and common UI design (low level) from each specific
 * field component (hi level eg. TextField, EmailField)
 *
 * if in the future I decided to migrate from formik I can
 * just change this component
 */
function FieldBridge({
  formikName,
  title,
  children,
  validate,
}: WithAsChild<BridgeProps>) {
  const Component = children ? Slot : 'input'

  return (
    <Field name={formikName} validate={validate}>
      {({ field, meta }: FieldProps) => {
        return (
          <div tw="flex flex-col gap-2">
            <label tw="flex flex-col gap-2">
              {title || capitalCase(formikName)}
              <Component
                {...field}
                value={field.value ?? ''}
                tw="rounded min-h-[2.25rem] p-2 dark:bg-gray-600/10 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-primary-200 border dark:border-gray-500/50"
              />
            </label>
            {meta.touched && meta.error && <div>{meta.error}</div>}
          </div>
        )
      }}
    </Field>
  )
}

export default function TextField(props: Props) {
  return <FieldBridge formikName={props.name} title={props.title} />
}

export function NumberField(props: Props) {
  return (
    <FieldBridge
      formikName={props.name}
      title={props.title}
      validate={(value: string) => {
        if (value && !/^\d+$/.test(value)) {
          return 'Invalid number'
        }
      }}
    />
  )
}

export function EmailField(props: Props) {
  return (
    <FieldBridge
      formikName={props.name}
      title={props.title}
      validate={(value: string) => {
        if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          return 'Invalid email address'
        }
      }}
    />
  )
}

export function PasswordField(props: Props) {
  return (
    <FieldBridge
      formikName={props.name}
      title={props.title}
      validate={(value: string) => {
        if (value && value.length < 8) {
          return 'Password must be at least 8 characters'
        }
      }}
    />
  )
}

export function CategoryField({
  name,
  title,
  options,
  asChild,
}: WithAsChild<
  Props & { options: ({ label?: string; value: string } | string)[] }
>) {
  const [f_props, meta, helpers] = useField(name)

  const Component = asChild ? Slot : 'input'

  // useFormikContext()
  return (
    <div tw="flex flex-col gap-2">
      <label>{title || capitalCase(name)}</label>
      <div tw="flex gap-2">
        {options.map(v => {
          const value = typeof v === 'string' ? v : v.value
          const label = typeof v === 'string' ? v : v.label
          return (
            <label key={value} tw="flex items-center gap-2">
              <Component
                tw="rounded min-h-[2.25rem] p-2 dark:bg-gray-600/10 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-primary-200 border dark:border-gray-500/50"
                {...f_props}
                type="radio"
                checked={f_props.value === value}
                value={value}
              />
              <div>{label}</div>
            </label>
          )
        })}
      </div>
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </div>
  )
}
