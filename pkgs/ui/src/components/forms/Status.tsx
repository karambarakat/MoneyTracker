import React from 'react'
import 'twin.macro'
import { useFormikContext } from 'formik'

export default function Status(Props: JSX.IntrinsicElements['div']) {
  const { status } = useFormikContext()
  return typeof status?.error === 'string' ? (
    <div {...Props}>error: {status.error}</div>
  ) : typeof status?.success === 'string' ? (
    <div {...Props}>success: {status.success}</div>
  ) : (
    <></>
  )
}
