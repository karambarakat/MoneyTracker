import React from 'react'
import 'twin.macro'
import { useFormikContext } from 'formik'
import { WithChildren } from '../../utils/WithChildren'
import { Slot } from '@radix-ui/react-slot'

type WithChild<T extends object | 'empty' = 'empty'> = T extends 'empty'
  ? { children?: (props: WithChildren) => JSX.Element }
  : T & { children?: (props: WithChildren) => JSX.Element }

export default function Status(props: WithChild<{ onSuccess?: string }>) {
  const { status } = useFormikContext()

  const Component = props.children ?? ((p: WithChildren) => <>{p.children}</>)

  const children =
    typeof status?.error === 'string' ? (
      status.error
    ) : typeof status?.success === 'string' ? (
      status.success
    ) : status?.success ? (
      props.onSuccess
    ) : (
      <></>
    )

  return <Component>{children}</Component>
}
