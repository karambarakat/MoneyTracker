import MyEmailInput from '@components/Formik/IEmail'
import MyPasswordInput from '@components/Formik/IPassword'
import MyUserInput from '@components/Formik/IUser'
import MyCheckbox from '@components/Formik/ICheckbox'
import { Accordion, Alert, Button, Input, Space, Stack } from '@mantine/core'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import {
  boolean as yupBool,
  ObjectSchema as yupObj,
  string as yupStr,
} from 'yup'
import SubmitButton from '@components/Formik/SubmitButton'
import AlertStatus from '@components/Formik/AlertStatus'

interface Values {
  email: string
  password: string
}

function LoginEmail() {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(
        values: Values,
        { setSubmitting, setErrors, setStatus }: FormikHelpers<Values>
      ) => {
        async function submit() {
          const data = await fetch('http://google.com')
          console.log(data)
        }
        submit()
          .then(() => {})
          .catch((e) => setStatus({ error: e.message }))
          .finally(() => setSubmitting(false))
      }}
      validationSchema={
        new yupObj({
          email: yupStr().required(),
          password: yupStr().required(),
        })
      }
    >
      <Form>
        <Stack>
          <AlertStatus />
          <MyEmailInput required formikName='email' />
          <MyPasswordInput required formikName='password' />

          <SubmitButton>Log In</SubmitButton>
        </Stack>
      </Form>
    </Formik>
  )
}

export default LoginEmail
