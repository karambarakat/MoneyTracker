import React, { useMemo } from 'react'
import 'twin.macro'
import { useFormikContext } from 'formik'
import { WithChildren, WithComponent } from '../../utils/WithChildren'
import { Slot } from '@radix-ui/react-slot'
import tw, { css } from 'twin.macro'

export default function Status(
  props: WithComponent<any, { onSuccess?: string }>,
) {
  const { status } = useFormikContext()

  const Component =
    props.children ?? ((p: WithChildren) => <div {...p}>{p.children}</div>)

  if (typeof status?.error === 'string') {
    return (
      <Component tw="text-red-500">
        <span>Error: </span>
        <span>{status.error}</span>
      </Component>
    )
  }

  if (status?.success) {
    return (
      <Component tw="text-green-500">
        <span>Success:</span>
        <span>
          {typeof status?.success === 'string'
            ? status.success
            : props.onSuccess}
        </span>
      </Component>
    )
  }
  return null
}
