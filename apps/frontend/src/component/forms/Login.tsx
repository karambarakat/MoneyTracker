import 'twin.macro'
import React from 'react'
import { useRegister } from '@src/api/auth_queries'
import { Form, Formik } from 'formik'
import { RoutesAuthLocalLogin } from 'types/dist/ts/routes'
import { formikMutateOption, require } from '@src/utils/formikUtils'
import Status from 'ui/src/components/forms/Status'
import { EmailField, PasswordField } from 'ui/src/components/forms/TextField'

export default function Login_Auth_Page_Component() {
  const register = useRegister()

  return (
    <Formik
      initialValues={
        {
          email: undefined,
          password: undefined,
        } as Partial<RoutesAuthLocalLogin>
      }
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
        <PasswordField name="password" />
      </Form>
    </Formik>
  )
}
