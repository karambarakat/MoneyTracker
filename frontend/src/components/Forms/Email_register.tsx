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
import user_signup, { UserSignUpArgs } from '@redux/api/user_signup'
import { useRoutes } from '@components/ReactRouter'

interface Values extends UserSignUpArgs {
  // userName: string // from UserSignUpArgs
  // email: string // from UserSignUpArgs
  // password: string // from UserSignUpArgs
  repeatPassword: string
  checked: boolean
}

function RegisterEmail() {
  const { exit: goBack } = useRoutes()
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
        values: Values,
        { setSubmitting, setErrors, setStatus }: FormikHelpers<Values>
      ) => {
        user_signup(values)
          .then(() => {
            goBack()
          })
          .catch((e) => {
            console.error(e)
            e.errors && setErrors(e.errors)
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
          errors.repeatPassword = "passwords don't match"
        }
        return errors
      }}
    >
      <Form>
        <Stack>
          <AlertStatus />

          <MyUserInput formikName="userName" />
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
