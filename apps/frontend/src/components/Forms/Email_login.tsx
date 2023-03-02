import MyEmailInput from '@components/Formik/IEmail'
import MyPasswordInput from '@components/Formik/IPassword'
import { Stack } from '@mantine/core'
import { Form, Formik, FormikHelpers } from 'formik'
import { ObjectSchema as yupObj, string as yupStr } from 'yup'
import SubmitButton from '@components/Formik/SubmitButton'
import AlertStatus from '@components/Formik/AlertStatus'
import dispatch from '@redux/dispatch'
import { useRoutes } from '@components/ReactRoute/index'
import HttpError from 'src/utils/HttpError'

type args = {
  email: string
  password: string
}
type Values = args

function LoginEmail() {
  const goBack = useRoutes()

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
        dispatch('user:login', values)
          .then(() => {
            goBack()
          })
          .catch((e) => {
            console.error(e)
            if (e instanceof HttpError && e.isHttpError) {
              e.info.details?.errors && setErrors(e.info.details?.errors)
            }
            setStatus({ error: e.message })
          })
          .finally(() => {
            setSubmitting(false)
          })
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
