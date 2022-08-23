import MyEmailInput from '@components/Formik/IEmail'
import MyPasswordInput from '@components/Formik/IPassword'
import { Stack } from '@mantine/core'
import { Form, Formik, FormikHelpers } from 'formik'
import { ObjectSchema as yupObj, string as yupStr } from 'yup'
import SubmitButton from '@components/Formik/SubmitButton'
import AlertStatus from '@components/Formik/AlertStatus'
import { useDispatch } from 'react-redux'
import user_login, { UserLoginArgs } from '@redux/api/user_login'

interface Values extends UserLoginArgs {}

function LoginEmail() {
  const dispatch = useDispatch()
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
        user_login(values)
          .then(() => {})
          .catch((e) => {
            console.error(e)
            e.errors && setErrors(e.errors)
            setStatus({ error: e.message })
          })
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

          <MyEmailInput required formikName="email" />
          <MyPasswordInput required formikName="password" />

          <SubmitButton>Log In</SubmitButton>
        </Stack>
      </Form>
    </Formik>
  )
}

export default LoginEmail
