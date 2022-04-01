import MyEmailInput from '@components/Formik/MyEmailInput'
import MyPasswordInput from '@components/Formik/MyPasswordInput'
import MyUserInput from '@components/Formik/MyUserInput'
import MyCheckbox from '@components/Formik/MyCheckbox'
import { Accordion, Alert, Button, Input, Space, Stack } from '@mantine/core'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import {
  boolean as yupBool,
  ObjectSchema as yupObj,
  string as yupStr,
} from 'yup'

interface Valus {
  userName: string
  email: string
  password: string
  repeatPassword: string
  checked: boolean
}

function RegisterEmail() {
  return (
    <Formik
      initialValues={{
        userName: '',
        email: '',
        password: '',
        repeatPassword: '',
        checked: false,
      }}
      onSubmit={(
        values: Valus,
        { setSubmitting, setErrors, setStatus }: FormikHelpers<Valus>
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
          repeatPassword: yupStr().required(),
          checked: yupBool().isTrue(),
        })
      }
      validate={(values) => {
        const errors: any = {}
        if (values.password !== values.repeatPassword) {
          errors.repeatPassword = "passwords don't match"
        }
        return errors
      }}
    >
      {({ isSubmitting, status }) => {
        return (
          <Form>
            <Stack>
              {status?.error && (
                <Alert color='red' title='error'>
                  {status.error}
                </Alert>
              )}
              <MyUserInput formikName='userName' />
              <MyEmailInput required formikName='email' />
              <MyPasswordInput required formikName='password' />
              <MyPasswordInput required formikName='repeatPassword' />

              <MyCheckbox
                formikName='checked'
                label='agree to the terms and conditions'
              />

              <Space h={16} />

              <Button loading={isSubmitting} type='submit' size='lg'>
                Sign Up
              </Button>
            </Stack>
          </Form>
        )
      }}
    </Formik>
  )
}

export default RegisterEmail
