import MyEmailInput from '@components/Formik/IEmail'
import MyPasswordInput from '@components/Formik/IPassword'
import MyUserInput from '@components/Formik/IUser'
import MyCheckbox from '@components/Formik/ICheckbox'
import { Stack } from '@mantine/core'
import { Form, Formik, FormikHelpers } from 'formik'
import {
  boolean as yupBool,
  ObjectSchema as yupObj,
  string as yupStr,
} from 'yup'
import AlertStatus from '@components/Formik/AlertStatus'
import SubmitButton from '@components/Formik/SubmitButton'
import dispatch from '@redux/dispatch'
import { useRoutes } from '@components/ReactRoute/index'
import HttpError from 'src/utils/HttpError'

type args = {
  displayName: string
  email: string
  password: string
}
interface Values extends args {
  // displayName: string // from args
  // email: string // from args
  // password: string // from args
  repeatPassword: string
  checked: boolean
}

function RegisterEmail() {
  const goBack = useRoutes()
  return (
    <Formik
      initialValues={{
        displayName: '',
        email: '',
        password: '',
        repeatPassword: '',
        checked: false,
      }}
      onSubmit={(
        values: Values,
        { setSubmitting, setErrors, setStatus }: FormikHelpers<Values>
      ) => {
        dispatch('user:signup', values)
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
          repeatPassword: yupStr().required(),
          checked: yupBool().isTrue(),
        })
      }
      validate={(values) => {
        const errors: any = {}
        if (values.password !== values.repeatPassword) {
          errors.repeatPassword = 'passwords don\'t match'
        }
        return errors
      }}
    >
      <Form>
        <Stack>
          <AlertStatus />

          <MyUserInput formikName="displayName" />
          <MyEmailInput required formikName="email" />
          <MyPasswordInput required formikName="password" />
          <MyPasswordInput required formikName="repeatPassword" />

          <MyCheckbox
            formikName="checked"
            label="agree to the terms and conditions"
          />

          <SubmitButton>Sign Up</SubmitButton>
        </Stack>
      </Form>
    </Formik>
  )
}

export default RegisterEmail
