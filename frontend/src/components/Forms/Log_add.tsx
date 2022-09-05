import { Group, Stack } from '@mantine/core'
import { Form, Formik, FormikHelpers } from 'formik'
import { ObjectSchema as yupObj, string as yupStr, number as yupNum } from 'yup'
import SubmitButton from '@components/Formik/SubmitButton'
import AlertStatus from '@components/Formik/AlertStatus'
import { useRoutes } from '@components/ReactRouter'
import log_create, { CreateLogArgs } from '@redux/api/log_create'
import MySimpleInput from '@components/Formik/ISimple'
import MyAmountInput from '@components/Formik/IAmount'
import MyTextarea from '@components/Formik/ITextarea'

interface Values extends CreateLogArgs {}

function AddLog() {
  const { exit: goBack } = useRoutes()
  return (
    <Formik
      initialValues={{
        title: '',
        amount: 0,
        category: undefined,
        note: undefined,
      }}
      // @ts-ignore
      onSubmit={(
        values: Values,
        { setSubmitting, setErrors, setStatus }: FormikHelpers<Values>
      ) => {
        log_create(values)
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
          title: yupStr().required(),
          amount: yupNum().required(),
          category: yupStr(),
          note: yupStr(),
        })
      }
    >
      <Form>
        <Stack>
          <AlertStatus />

          <MySimpleInput
            required
            label="Title"
            placeholder="Enter a Title for the Lug"
            formikName="title"
          />

          <MyAmountInput required formikName="amount" />

          <MyTextarea formikName="note" />

          <Group sx={{ justifyContent: 'end' }}>
            <SubmitButton>Add Log</SubmitButton>
          </Group>
        </Stack>
      </Form>
    </Formik>
  )
}

export default AddLog
