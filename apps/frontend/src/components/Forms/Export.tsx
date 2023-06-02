import { Group, Input, Stack } from '@mantine/core'
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik'
import { ObjectSchema as yupObj, date as yupDate, array as yupArray } from 'yup'
import SubmitButton from '@components/Formik/SubmitButton'
import AlertStatus from '@components/Formik/AlertStatus'
import { useRoutes } from '@components/ReactRoute/index'
import { File } from 'tabler-icons-react'
import { MyDateRangePicker } from '@components/Formik/IDateRange'
import { store } from '@redux/index'
import getDate from 'src/utils/getDate'
import { category_in } from 'types/src/schema'

interface Values {
  range: Date[]
}

async function download(range: Date[]) {
  // 1st
  const from = getDate(range[0].toString()).getTime()
  const to = getDate(range[1].toString()).getTime()

  const raw = store.getState().logs.filter(log => {
    const thisDay = getDate(log.createdAt).getTime()

    return !(thisDay <= from || thisDay >= to)
  })

  // 2nd
  const data = [
    'title,amount,category,created at,notes',
    ...raw.map(e =>
      [
        e.title,
        e.amount,
        (e.category as category_in)?.title || '',
        e.createdAt,
        e.note
      ].join(',')
    )
  ].join('\n')

  // 3rd
  const file = new Blob([data], { type: 'text/csv' })
  const a = document.createElement('a')
  const url = URL.createObjectURL(file)
  a.href = url
  a.download = 'logs from'
  document.body.appendChild(a)
  a.click()
  await new Promise<void>(res => setTimeout(() => res(), 0))
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

const from = new Date()
const to = new Date()
from.setMonth(to.getMonth() - 1)

function Export() {
  const goBack = useRoutes()
  return (
    <Formik
      initialValues={{
        range: [from, to]
      }}
      // @ts-ignore
      onSubmit={(
        values: Values,
        { setSubmitting, setErrors, setStatus }: FormikHelpers<Values>
      ) => {
        download(values.range)
          .then(() => goBack())
          .catch(e => {
            console.error(e)
            setStatus({ error: e.message })
          })
          .finally(() => setSubmitting(false))
      }}
      validationSchema={
        new yupObj({
          range: yupArray().of(yupDate())
        })
      }
    >
      <Form>
        <Stack>
          <AlertStatus />

          <MyDateRangePicker formikName="range" />

          <Group sx={{ justifyContent: 'end' }}>
            <SubmitButton
              styles={{
                label: {
                  display: 'flex',
                  gap: 12
                }
              }}
            >
              <File />
              <span>Export</span>
            </SubmitButton>
          </Group>
        </Stack>
      </Form>
    </Formik>
  )
}

export default Export
