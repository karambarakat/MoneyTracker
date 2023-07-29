import { Form as FormikForm, Formik, FormikHelpers, FormikConfig } from 'formik'
import { WithChildren } from 'ui/src/utils/WithChildren'
import set from 'lodash/set'
import get from 'lodash/get'
import merge from 'lodash/merge'
import { useMemo } from 'react'
import { UseMutationResult } from '@tanstack/react-query'
import { require } from '../../utils/formikUtils'
import HttpError from 'types/dist/helpers/http_error'
import { formMetaInfo } from 'ui/src/components/forms/TextField'

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

interface Form<Values extends object, Data>
  extends Omit<FormikConfig<Values>, 'initialValues' | 'onSubmit'> {
  /**
   * react-query mutation function
   */
  action: UseMutationResult<Data, any, Values, any>
  /**
   * initial values
   */
  initial?: DeepPartial<Values>
  /**
   * properties to be, maybe nested using lodash paths
   * @example ['email', 'password', 'profile.name', 'profile.meta[]']
   * note: adding [] at the end of a property will make it an array
   * (this is a non-lodash feature)
   */
  properties?: string[]
  /**
   * properties that are required, maybe nested using lodash paths
   * @example ['email', 'password', 'profile.name']
   */
  required?: string[]
  /**
   * called when the mutation is successful
   * @param ret data returned from the react-query mutation
   * @param ctx formik context
   */
  onSuccess?: (ret: Data, ctx: FormikHelpers<Values>) => void
}

/**
 * a facade for couple of libraries (formik,
 * react-query, lodash, HttpError) to work together
 * provides a simple interface to create a form
 */
export default function Form<V extends object, D>({
  children,
  initial,
  properties,
  required,
  onSuccess,
  action,
  ...FormikProps
}: WithChildren<Form<V, D>>) {
  const initialValues = useMemo(() => {
    return (properties || [])
      .map(property => {
        if (property.endsWith('[]')) {
          const modified = property.slice(0, -2)
          return set({}, modified, get(initial, modified) ?? [])
        }
        return set({}, property, get(initial, property) ?? undefined)
      })
      .reduce((a, b) => merge(a, b), initial || {}) as V
  }, [initial, properties])

  return (
    <formMetaInfo.Provider value={{ required: required ?? [] }}>
      <Formik
        initialValues={initialValues}
        onSubmit={(v, ctx) => {
          ctx.setStatus({})

          const [errors, values] = require(v, required ?? [])

          if (errors) {
            ctx.setErrors(errors)
            ctx.setSubmitting(false)
            return
          }

          action.mutate(values as V, {
            onError: error => {
              if (!(error instanceof HttpError)) {
                console.error('submit unknown error', error)
                ctx.setStatus({ error: 'some error, please try later' })
                return
              }

              const fields = getFieldError(error)
              fields && ctx.setErrors(fields)

              ctx.setStatus({ error: error.message })
            },
            onSuccess: ret => {
              if (onSuccess) onSuccess(ret, ctx)
            },
            onSettled: () => {
              ctx.setSubmitting(false)
            },
          })
        }}
        {...FormikProps}
      >
        <FormikForm>{children}</FormikForm>
      </Formik>
    </formMetaInfo.Provider>
  )
}

/**
 * some HttpError return error field of type Record in their details
 * this is supposed to be extra functionality of HttpsError
 */
function getFieldError(error: HttpError) {
  let rt
  try {
    // @ts-ignore
    rt = error.payload.details.errors
  } catch {
    //
  }

  if (typeof rt === 'object' && rt !== null) {
    return rt as object
  } else return undefined
}
