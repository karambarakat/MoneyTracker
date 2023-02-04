import { Stack } from '@mantine/core'
import { Form, Formik, FormikHelpers } from 'formik'
import { ObjectSchema as yupObj, string as yupStr } from 'yup'
import SubmitButton from '@components/Formik/SubmitButton'
import AlertStatus from '@components/Formik/AlertStatus'
import { useNavigate } from 'react-router-dom'
import dispatch from '@redux/dispatch'
import MyUserInput from '@components/Formik/IUser'
import HttpError from 'src/utils/HttpError'

type args = {
  displayName: string
  // picture: string
}
interface Values extends args {}

function ProfileUpdate() {
  const nav = useNavigate()

  return (
    <Formik
      initialValues={{
        displayName: '',
        // picture: '',
      }}
      v
      onSubmit={(
        values: Values,
        { setSubmitting, setErrors, setStatus }: FormikHelpers<Values>
      ) => {
        dispatch('profile:update', values)
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
          displayName: yupStr(),
          // picture: yupStr().required(),
        })
      }
    >
      <Form>
        <Stack>
          <AlertStatus />

          <MyUserInput formikName="displayName" />
          {/* todo: make input to upload picture */}
          {/* <MyPasswordInput required formikName="password" /> */}

          <SubmitButton>Update Profile</SubmitButton>
        </Stack>
      </Form>
    </Formik>
  )
}

export default ProfileUpdate
