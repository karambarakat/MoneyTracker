import React from 'react'
import 'twin.macro'
import { PropsOf } from '@emotion/react'
import ButtonBase from '../Button'
import { useFormikContext } from 'formik'
import { WithAsChild } from '../../utils/WithChildren'
import { Slot } from '@radix-ui/react-slot'

export default function SubmitButton({
  asChild,
  ...props
}: WithAsChild<PropsOf<typeof ButtonBase>>) {
  const Component = asChild ? Slot : 'button'

  const { isSubmitting } = useFormikContext()

  return (
    <ButtonBase
      tw="py-[0.5rem]"
      variant="filled"
      disabled={isSubmitting}
      {...props}
      asChild
    >
      <Component type="submit">{props.children || 'Submit'}</Component>
    </ButtonBase>
  )
}
