import { Stack } from '@mantine/core'
import { Form, Formik, FormikHelpers } from 'formik'
import { ObjectSchema as yupObj, string as yupStr } from 'yup'
import SubmitButton from '@components/Formik/SubmitButton'
import AlertStatus from '@components/Formik/AlertStatus'
import { useNavigate } from 'react-router-dom'
import dispatch from '@redux/dispatch'
import MyPasswordInput from '@components/Formik/IPassword'
import HttpError from 'src/utils/HttpError'

type args = {
  oldPassword: string
  newPassword: string
}
type Values = args

function Profile_setPassword() {
  const nav = useNavigate()

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
      }}
      v
      onSubmit={(
        values: Values,
        { setSubmitting, setErrors, setStatus }: FormikHelpers<Values>,
      ) => {
        dispatch('profile:password', values)
          .then(() => {
            nav(-1)
          })
          .catch(e => {
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
          newPassword: yupStr().required(),
        })
      }
    >
      <Form>
        <Stack>
          <AlertStatus />

          <MyPasswordInput formikName="newPassword" />

          <SubmitButton>Set New Password</SubmitButton>
        </Stack>
      </Form>
    </Formik>
  )
}

export default Profile_setPassword
