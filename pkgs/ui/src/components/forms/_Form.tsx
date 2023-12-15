import tw from 'twin.macro'
import set from 'lodash/set'
import React from 'react'
import merge from 'lodash/merge'
import {
  Formik,
  FormikConfig,
  FormikErrors,
  Form as FormikForm,
  FormikHelpers,
} from 'formik'
import { WithChildren } from '../../utils/WithChildren'
import { useMemo } from 'react'
import requires from '../../utils/requires'
import { RestError } from 'types/HttpError'
import { DefinedContext } from '../../utils/definedContext'

export const formMetaInfo = new DefinedContext<{ required: string[] }>()

export interface FormInterface<Values extends object, Result>
  extends Omit<FormikConfig<Values>, 'initialValues' | 'onSubmit'> {
  /**
   * react-query mutation function
   */
  action: (input: Values) => Promise<Result>
  /**
   * initial values or string of keys like ['profile.name', 'profile.meta[]']
   */
  values?: DeepPartial<Values> | string[]
  /**
   * thenable
   */
  then?: (ctx: FormikHelpers<Values>, result: Result) => void
  /**
   * properties that are required, maybe nested using lodash paths
   * @example ['email', 'password', 'profile.name']
   */
  required?: string[]
}

/**
 * a facade for couple of libraries (formik,
 * react-query, lodash, HttpError) to work together
 * provides a simple interface to create a form
 */
export function Form<V extends object, Result>({
  children,
  values,
  required,
  then,
  action,
  ...FormikProps
}: WithChildren<FormInterface<V, Result>>) {
  const values_ = useMemo(() => {
    if (!values) return {}

    if (values instanceof Array) {
      return (values || [])
        .map(p => {
          if (p.endsWith('[]')) {
            const mod = p.slice(0, -2)
            return set({}, mod, [])
          }

          return set({}, p, undefined)
        })
        .reduce((a, b) => merge(a, b), {})
    }

    return values
  }, [values]) as V

  return (
    <formMetaInfo.Provider value={{ required: required ?? [] }}>
      <Formik
        initialValues={values_}
        onSubmit={(v, ctx) => {
          ctx.setStatus({})
          const [errors, values] = requires(v, required ?? [])

          if (errors) {
            ctx.setStatus({
              error: 'some fields are required: ' + Object.keys(errors),
            })
            ctx.setErrors(errors)
            ctx.setSubmitting(false)
            return
          }

          action(values as V)
            .then(result => {
              then && then(ctx, result)
            })
            .catch(error => {
              if (!(error instanceof RestError)) {
                console.error('submit unknown error', error)
                ctx.setStatus({ error: 'some error, please try later' })
                return
              }

              const fields = error.getFields() as FormikErrors<V>
              fields && ctx.setErrors(fields)
              ctx.setStatus({ error: error.message })
            })
            .finally(() => {
              ctx.setSubmitting(false)
            })
        }}
        {...FormikProps}
      >
        <FormikForm>{children}</FormikForm>
      </Formik>
    </formMetaInfo.Provider>
  )
}

export function FormBody({ children }: WithChildren) {
  return <div tw="flex gap-4 flex-col">{children}</div>
}

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T
