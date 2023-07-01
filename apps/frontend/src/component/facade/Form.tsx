import { Form as FormikForm, Formik } from 'formik'
import { WithChildren } from 'ui/src/utils/WithChildren'
import set from 'lodash/set'
import get from 'lodash/get'
import merge from 'lodash/merge'
import { useMemo } from 'react'

interface Form<Values extends object> {
  action: any
  initial?: Values
  properties: string[]
  required?: string[]
}

/**
 * todo: not completed
 * provides a simple interface to create a form
 * gets few libraries to work together: formik, lodash, and react-query
 */
export default function Form<V extends object>({
  children,
  initial,
  properties,
  action,
}: WithChildren<Form<V>>) {
  const initialValues = useMemo(() => {
    return merge(
      properties.map(p => {
        return set({}, p, get(initial, p) ?? undefined)
      }),
    ) as V
  }, [initial, properties])

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(v, ctx) => {
        action()
      }}
    >
      <FormikForm>{children}</FormikForm>
    </Formik>
  )
}
