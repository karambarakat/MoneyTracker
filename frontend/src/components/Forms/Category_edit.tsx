import { useMemo } from 'react'
import { Group, Stack } from '@mantine/core'
import { Form, Formik, FormikHelpers } from 'formik'
import { ObjectSchema as yupObj, string as yupStr } from 'yup'
import SubmitButton from '@components/Formik/SubmitButton'
import AlertStatus from '@components/Formik/AlertStatus'
import { useRoutes } from '@components/ReactRoute/index'

import MySimpleInput from '@components/Formik/ISimple'
import category_create, { CreateCategoryArgs } from '@redux/api/category_create'
import MyColorInput from '@components/Formik/IColor'
import MyIconInput from '@components/Formik/IIcon'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  CategoriesState,
  CategoryDoc,
  LogsState,
  RootState,
} from '@redux/types'
import category_update from '@redux/api/category_update'

interface Values extends CreateCategoryArgs {}

function AddCategory() {
  const { id } = useParams()
  const cats = useSelector<RootState, CategoriesState>((s) => s.categories)
  const cat = useMemo(
    () => cats.find((cat) => cat._id === id) || ({} as CategoryDoc),
    [cats]
  )
  if (!cat._id) return <div>Server Error</div>

  const { exit: goBack } = useRoutes()

  return (
    <Formik
      initialValues={{
        title: cat.title,
        color: cat.color,
        icon: cat.icon,
      }}
      // @ts-ignore
      onSubmit={(
        values: Values,
        { setSubmitting, setErrors, setStatus }: FormikHelpers<Values>
      ) => {
        category_update(cat._id, values)
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
          color: yupStr(),
          icon: yupStr(),
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
            <SubmitButton>Edit Category</SubmitButton>
          </Group>
        </Stack>
      </Form>
    </Formik>
  )
}

export default AddCategory
