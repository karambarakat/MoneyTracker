import 'twin.macro'
import React from 'react'
import { useRegister } from '@src/api/auth_queries'
import { Form, Formik } from 'formik'
import {
  RoutesAuthLocalLogin,
  RoutesAuthLocalRegister,
} from 'types/dist/ts/routes'
import { formikMutateOption, require } from '@src/utils/formikUtils'
import Status from 'ui/src/components/forms/Status'
import TextField, {
  EmailField,
  PasswordField,
} from 'ui/src/components/forms/TextField'
import { WithAsChild, WithChildren } from 'ui/src/utils/WithChildren'
import set from 'lodash/set'
import get from 'lodash/get'
import merge from 'lodash/merge'

type Values = Partial<
  RoutesAuthLocalLogin &
    RoutesAuthLocalRegister & {
      confirmPassword: RoutesAuthLocalLogin['password']
    }
>

const initial = {
  email: undefined,
  username: undefined,
  password: undefined,
  confirmPassword: undefined,
} as Values

export default function SignIn_Auth_Page_Component() {
  const register = useRegister()

  return (
    <Formik
      initialValues={initial}
      onSubmit={(v, ctx) => {
        const [errors, values] = require(v, ['email', 'password'])

        if (errors) {
          ctx.setErrors(errors)
          ctx.setSubmitting(false)
          return
        }

        const options = formikMutateOption(ctx)

        register.mutate(values, {
          ...options,
          onSuccess: (...args) => {
            ctx.setValues({}, false)

            options.onSuccess?.(...args)
            ctx.setStatus({ success: 'signed in' })
          },
        })
      }}
    >
      <Form>
        <Status />
        <EmailField name="email" />
        <TextField name="username" />
        <PasswordField name="password" />
        <PasswordField name="confirmPassword" />
      </Form>
    </Formik>
  )
}
