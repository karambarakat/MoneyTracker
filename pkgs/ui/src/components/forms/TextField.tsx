import 'twin.macro'
import React, { createContext, useContext, useMemo } from 'react'
import { PropsOf, css } from '@emotion/react'
import { Field as FormikField, useField, useFormikContext } from 'formik'
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
  fieldName: string
  title?: string
  validate?: (value: string) => string | undefined
}

const requiredCss = css`
  &[data-required='true']::after {
    content: ' *';
    color: red;
  }
`

/**
 * this component is a bridge that separate formik logic
 * and common UI design (low level) from each specific
 * field component (hi level eg. TextField, EmailField)
 *
 * if in the future I decided to migrate from formik I can
 * just change this component
 */
function FieldBridge({
  fieldName,
  title,
  children,
  asChild,
  validate,
}: WithAsChild<BridgeProps>) {
  const Component = asChild ? Slot : 'input'

  const { required } = useContext(formMetaInfo)
  const req = useMemo(() => {
    return required.includes(fieldName)
  }, [fieldName])

  return (
    <FormikField name={fieldName} validate={validate}>
      {({ field, meta }: FieldProps) => {
        return (
          <div tw="flex flex-col gap-2">
            <label tw="flex flex-col gap-2">
              <div data-required={req} css={requiredCss}>
                {title || capitalCase(fieldName)}
              </div>
              <Component
                required={req}
                {...field}
                children={asChild ? children : undefined}
                value={field.value ?? ''}
                tw="rounded min-h-[2.25rem] p-2 dark:bg-gray-600/10 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-primary-200 border dark:border-gray-500/50"
              />
            </label>
            {meta.touched && meta.error && <div>{meta.error}</div>}
          </div>
        )
      }}
    </FormikField>
  )
}

export const formMetaInfo = createContext<{ required: string[] }>({
  required: [],
})

export default function TextField(props: Props) {
  return <FieldBridge fieldName={props.name} title={props.title} />
}

export function HiddenField(props: Props) {
  return (
    <div tw="hidden">
      <FieldBridge fieldName={props.name} asChild>
        <input type="hidden" />
      </FieldBridge>
    </div>
  )
}

export function NumberField(props: Props) {
  return (
    <FieldBridge
      fieldName={props.name}
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
      fieldName={props.name}
      title={props.title}
      validate={(value: string) => {
        console.log('todo: uncomment when done')
        // if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i.test(value)) {
          return 'Invalid email address'
        }
      }}
    ></FieldBridge>
  )
}

export function PasswordField(props: Props) {
  return (
    <FieldBridge
      fieldName={props.name}
      title={props.title}
      validate={(value: string) => {
        console.log('todo: uncomment when done')
        // if (value && value.length < 8) {
        if (value && value.length < 2) {
          return 'Password must be at least 8 characters'
        }
      }}
      asChild
    >
      <input type="password" />
    </FieldBridge>
  )
}

// refactored into OptionField and figure out a way to render special ui
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
      <div tw="flex gap-2 flex-wrap">
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
