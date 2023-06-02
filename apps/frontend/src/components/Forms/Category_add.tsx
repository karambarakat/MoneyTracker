import { Group, Stack } from '@mantine/core'
import { Form, Formik, FormikHelpers } from 'formik'
import { ObjectSchema as yupObj, string as yupStr } from 'yup'
import SubmitButton from '@components/Formik/SubmitButton'
import AlertStatus from '@components/Formik/AlertStatus'
import { useRoutes } from '@components/ReactRoute/index'

import MySimpleInput from '@components/Formik/ISimple'
import dispatch from '@redux/dispatch'

import MyColorInput from '@components/Formik/IColor'
import MyIconInput from '@components/Formik/IIcon'
import { Category as CatDoc } from 'types/src/schema'
import HttpError from 'src/utils/HttpError'

type args = Omit<CatDoc, 'createdBy' | '__v' | '_id'>
type Values = args

function AddCategory() {
  const goBack = useRoutes()
  return (
    <Formik
      initialValues={{
        title: '',
        color: '',
        icon: ''
      }}
      // @ts-ignore
      onSubmit={(
        values: Values,
        { setSubmitting, setErrors, setStatus }: FormikHelpers<Values>
      ) => {
        // dispatch('category:create', {doc: {}})
        dispatch('category:create', { doc: values })
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
          color: yupStr(),
          icon: yupStr()
        })
      }
    >
      <Form>
        <Stack>
          <AlertStatus />

          <MySimpleInput
            required
            label="Title"
            placeholder="Enter a the Category Title"
            formikName="title"
          />

          <MyColorInput label="Colors" formikName="color" />

          <MyIconInput label="Icon" formikName="icon" />

          <Group sx={{ justifyContent: 'end' }}>
            <SubmitButton>Add Category</SubmitButton>
          </Group>
        </Stack>
      </Form>
    </Formik>
  )
}

export default AddCategory
