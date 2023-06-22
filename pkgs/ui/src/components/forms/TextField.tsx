import 'twin.macro'
import React from 'react'
import { PropsOf } from '@emotion/react'
import { useField, useFormikContext } from 'formik'
import type { FieldProps } from 'formik'
import { capitalCase } from 'change-case'

interface Props {
  _formikName: string
  _title?: string
}

export default function TextField({
  _formikName,
  _title,
  ...i_props
}: JSX.IntrinsicElements['input'] & Props) {
  const [f_props, meta, helpers] = useField(_formikName)

  // useFormikContext()
  return (
    <div tw="flex flex-col gap-2">
      <label>{_title || capitalCase(_formikName)}</label>
      <input
        tw="rounded min-h-[2.25rem] p-2 dark:bg-gray-600/10 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-primary-200 border dark:border-gray-500/50"
        {...i_props}
        {...f_props}
        value={f_props.value ?? ''}
      />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </div>
  )
}

// todo: for now this works
export function NumberField(props: PropsOf<typeof TextField>) {
  // return <Field name={formikName} type="number" />
  return <TextField {...props} />
}

export function CategoryField(props: PropsOf<typeof TextField>) {
  return <TextField {...props} />
}
