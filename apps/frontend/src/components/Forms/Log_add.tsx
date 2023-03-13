import { Group, Stack } from '@mantine/core'
import { Form, Formik, FormikHelpers } from 'formik'
import { ObjectSchema as yupObj, string as yupStr, number as yupNum } from 'yup'
import SubmitButton from '@components/Formik/SubmitButton'
import AlertStatus from '@components/Formik/AlertStatus'
import { useRoutes } from '@components/ReactRoute/index'

import dispatch from '@redux/dispatch'
import MySimpleInput from '@components/Formik/ISimple'
import MyAmountInput from '@components/Formik/IAmount'
import MyTextarea from '@components/Formik/ITextarea'
import MyCategoryInput from '@components/Formik/ICategory'
import { Log as LogDoc } from 'types/schema'
import HttpError from 'src/utils/HttpError'

type args = Partial<
  Omit<
    LogDoc,
    'category' | 'createdBy' | '__v' | '_id' | 'createdAt' | 'updatedAt'
  > & { category?: string }
>

type Values = args

function AddLog() {
  const goBack = useRoutes()
  return (
    <Formik
      initialValues={{
        title: undefined,
        amount: undefined,
        category: undefined,
        note: undefined,
      }}
      // @ts-ignore
      onSubmit={(
        values: Values,
        { setSubmitting, setErrors, setStatus }: FormikHelpers<Values>
      ) => {
        dispatch('log:create', { doc: values })
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

          <MyCategoryInput label="Category" formikName="category" />

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
