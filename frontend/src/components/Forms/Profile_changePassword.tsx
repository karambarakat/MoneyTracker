import { Stack } from '@mantine/core'
import { Form, Formik, FormikHelpers } from 'formik'
import { ObjectSchema as yupObj, string as yupStr } from 'yup'
import SubmitButton from '@components/Formik/SubmitButton'
import AlertStatus from '@components/Formik/AlertStatus'
import { useNavigate } from 'react-router-dom'
import dispatch from '@redux/dispatch'
import MyPasswordInput from '@components/Formik/IPassword'

type args = {
  oldPassword: string
  newPassword: string
}
interface Values extends args {}

function Profile_changePassword() {
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
        { setSubmitting, setErrors, setStatus }: FormikHelpers<Values>
      ) => {
        dispatch('profile:password', values)
          .then(() => {
            nav(-1)
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
          oldPassword: yupStr().required(),
          newPassword: yupStr().required(),
        })
      }
    >
      <Form>
        <Stack>
          <AlertStatus />

          <MyPasswordInput
            formikName="oldPassword"
            placeholder="Enter Old Password"
            label="Old Password"
          />
          <MyPasswordInput formikName="newPassword" label="New Password" />

          <SubmitButton>Change Password</SubmitButton>
        </Stack>
      </Form>
    </Formik>
  )
}

export default Profile_changePassword
