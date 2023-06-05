import { useMemo } from 'react'
import { Group, Stack } from '@mantine/core'
import { Form, Formik, FormikHelpers } from 'formik'
import { ObjectSchema as yupObj, string as yupStr, number as yupNum } from 'yup'
import SubmitButton from '@src/components/Formik/SubmitButton'
import AlertStatus from '@src/components/Formik/AlertStatus'
import { useRoutes } from '@src/components/ReactRoute/index'

import dispatch from '@src/redux/dispatch'
import MySimpleInput from '@src/components/Formik/ISimple'
import MyAmountInput from '@src/components/Formik/IAmount'
import MyTextarea from '@src/components/Formik/ITextarea'
import MyCategoryInput from '@src/components/Formik/ICategory'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LogsState, RootState } from '@src/redux/types'
import { Log as LogDoc } from 'types/src/schema'
import HttpError from 'src/utils/HttpError'

type args = Partial<
  Omit<
    LogDoc,
    'category' | 'createdBy' | '__v' | '_id' | 'createdAt' | 'updatedAt'
  > & { category?: string }
>

type Values = args

function EditLog() {
  const { id } = useParams()
  const logs = useSelector<RootState, LogsState>(s => s.logs)
  const log = useMemo(
    () => logs.find(log => log._id === id) || ({} as LogDoc),
    [logs]
  )

  if (!log._id) return <div>Server Error</div>

  const goBack = useRoutes()
  return (
    <Formik
      initialValues={{
        title: log.title,
        amount: log.amount,
        category: log.category?._id,
        note: log.note
      }}
      // @ts-ignore
      onSubmit={(
        values: Values,
        { setSubmitting, setErrors, setStatus }: FormikHelpers<Values>
      ) => {
        dispatch('log:update', { doc: values, id: log._id })
          .then(() => {
            goBack()
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
          title: yupStr().required(),
          amount: yupNum().required(),
          category: yupStr(),
          note: yupStr()
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
