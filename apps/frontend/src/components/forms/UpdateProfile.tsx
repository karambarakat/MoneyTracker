import 'twin.macro'
import { Form } from 'ui/src/components/forms/_Form'

import TextField from 'ui/src/components/forms/TextField'
import Status from 'ui/src/components/forms/Status'
import { useFormikContext } from 'formik'
import { PropsOf } from '@emotion/react'
import Button from 'ui/src/components/Button'
import { useMutation } from '@tanstack/react-query'
import { update_profile } from '../../api/mutations'

export default function UpdateProfile() {
  const mutate = useMutation({ mutationFn: update_profile })

  return (
    <Form
      then={ctx => {
        ctx.setValues({} as any, false)
        ctx.setStatus({ success: 'profile updated' })
      }}
      values={[]}
      action={mutate.mutateAsync}
    >
      <div>
        <Status />
        <TextField name="displayName" />
        <TextField name="picture" />
        <SubmitButton tw="mt-2" size="lg">
          submit
        </SubmitButton>
      </div>
    </Form>
  )
}

function SubmitButton(
  Props: Omit<PropsOf<typeof Button>, 'disabled' | 'type'>,
) {
  const { isSubmitting, submitForm, values, setStatus } =
    useFormikContext<object>()

  return (
    <Button {...Props} disabled={isSubmitting} variant="light" asChild>
      <button
        onClick={() => {
          if (Object.values(values).filter(e => e).length === 0) {
            setStatus({ error: 'empty form' })
            return
          }
          submitForm()
        }}
        type="button"
      >
        Submit
      </button>
    </Button>
  )
}
