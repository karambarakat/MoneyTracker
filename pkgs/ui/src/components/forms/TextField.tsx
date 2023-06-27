import 'twin.macro'
import React from 'react'
import { PropsOf } from '@emotion/react'
import { Field, useField, useFormikContext } from 'formik'
import type { FieldProps } from 'formik'
import { capitalCase } from 'change-case'
import { WithAsChild } from '../../utils/WithChildren'
import { Slot } from '@radix-ui/react-slot'

interface Props {
  formikName: string
  title?: string
}

export default function TextField({
  formikName,
  title,
  asChild,
}: WithAsChild<Props>) {
  const [f_props, meta, helpers] = useField(formikName)

  const Component = asChild ? Slot : 'input'

  // useFormikContext()
  return (
    <div tw="flex flex-col gap-2">
      <label tw="flex flex-col gap-2">
        {title || capitalCase(formikName)}
        <Component
          tw="rounded min-h-[2.25rem] p-2 dark:bg-gray-600/10 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-primary-200 border dark:border-gray-500/50"
          {...f_props}
          value={f_props.value ?? ''}
        />
      </label>
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </div>
  )
}

// todo: for now this works
export function NumberField(props: PropsOf<typeof TextField>) {
  return <TextField {...props} />
}

export function CategoryField({
  formikName,
  title,
  options,
  asChild,
}: WithAsChild<
  Props & { options: ({ label?: string; value: string } | string)[] }
>) {
  const [f_props, meta, helpers] = useField(formikName)

  const Component = asChild ? Slot : 'input'

  // useFormikContext()
  return (
    <div tw="flex flex-col gap-2">
      <label>{title || capitalCase(formikName)}</label>
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
