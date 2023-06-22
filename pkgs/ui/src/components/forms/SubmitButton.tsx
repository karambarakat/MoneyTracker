import React from 'react'
import 'twin.macro'
import { PropsOf } from '@emotion/react'
import Button from '../Button'
import { useFormikContext } from 'formik'

export default function SubmitButton(
  Props: Omit<PropsOf<typeof Button>, 'disabled' | 'type'>,
) {
  const { isSubmitting } = useFormikContext()

  return (
    <Button {...Props} disabled={isSubmitting} variant="light" type="submit">
      Submit
    </Button>
  )
}
