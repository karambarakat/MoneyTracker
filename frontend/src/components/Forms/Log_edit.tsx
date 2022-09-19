import { useMemo } from 'react'
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
import MyCategoryInput from '@components/Formik/ICategory'
import log_update from '@redux/api/log_update'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LogDoc, LogsState, RootState } from '@redux/types'

interface Values extends CreateLogArgs {}

function EditLog() {
  const { id } = useParams()
  const logs = useSelector<RootState, LogsState>((s) => s.logs)
  const log = useMemo(
    () => logs.find((log) => log._id === id) || ({} as LogDoc),
    [logs]
  )

  if (!log._id) return <div>Server Error</div>

  const { exit: goBack } = useRoutes()
  return (
    <Formik
      initialValues={{
        title: log.title,
        amount: log.amount,
        category: log.category?._id,
        note: log.note,
      }}
      // @ts-ignore
      onSubmit={(
        values: Values,
        { setSubmitting, setErrors, setStatus }: FormikHelpers<Values>
      ) => {
        log_update(log._id, values)
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
            label="Title"
            placeholder="Enter a Title for the Lug"
            formikName="title"
          />

          <MyAmountInput formikName="amount" />

          <MyCategoryInput label="Category" formikName="category" />

          <MyTextarea formikName="note" />

          <Group sx={{ justifyContent: 'end' }}>
            <SubmitButton>Edit Log</SubmitButton>
          </Group>
        </Stack>
      </Form>
    </Formik>
  )
}

export default EditLog
