import tw, { css } from 'twin.macro'
import set from 'lodash/set'
import merge from 'lodash/merge'
import {
  FieldProps,
  Formik,
  FormikConfig,
  Field as FormikField,
  Form as FormikForm,
  FormikHelpers,
} from 'formik'
import { WithAsChild, WithChildren } from '../../utils/WithChildren'
import { Slot } from '@radix-ui/react-slot'
import { createContext, useContext, useMemo } from 'react'
import { capitalCase } from 'change-case'
import requires from '../../utils/requires'

import HttpError from 'types/dist/helpers/http_error'

interface BridgeProps {
  fieldName: string
  title?: string
  validate?: (value: string) => string | undefined
}

const requiredCss = css`
  &[data-required='true']::after {
    content: ' *';
    color: red;
  }
`

const form_tw = css`
  ${tw`flex gap-4 flex-col`}
`

/**
 * this component is a bridge that separate formik logic
 * and common UI design (low level) from each specific
 * field component (hi level eg. TextField, EmailField)
 *
 * if in the future I decided to migrate from formik I can
 * just change this component
 */
export function Field({
  fieldName,
  title,
  children,
  asChild,
  validate,
}: WithAsChild<BridgeProps>) {
  const Component = asChild ? Slot : 'input'

  const { required } = useContext(formMetaInfo)
  const req = useMemo(() => {
    return required.includes(fieldName)
  }, [fieldName])

  return (
    // <FormikField name={fieldName} validate={validate}>
    //   {({ field, meta }: FieldProps) => {
    //     return (
    //       <div tw="flex flex-col gap-2">
    //         <label tw="flex flex-col gap-2">
    //           {/* <div data-required={req} css={requiredCss}>
    //             {title || capitalCase(fieldName)}
    //           </div> */}
    //           <Component
    //             required={req}
    //             {...field}
    //             children={asChild ? children : undefined}
    //             value={field.value ?? ''}
    //             tw="rounded min-h-[2.25rem] p-2 dark:bg-gray-600/10 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-primary-200 border dark:border-gray-500/50"
    //           />
    //         </label>
    //         {meta.touched && meta.error && <div>{meta.error}</div>}
    //       </div>
    //     )
    //   }}
    // </FormikField>
    <FormikField name={fieldName}>
      {({ field, meta }: FieldProps) => {
        return (
          <div tw="flex flex-col gap-2">
            <label tw="flex flex-col gap-2">{JSON.stringify(meta)}</label>
            {meta.touched && meta.error && <div>{meta.error}</div>}
          </div>
        )
      }}
    </FormikField>
  )
}

export const formMetaInfo = createContext<{ required: string[] }>({
  required: [],
})

interface Form<Values extends object, Data>
  extends Omit<FormikConfig<Values>, 'initialValues' | 'onSubmit'> {
  /**
   * react-query mutation function
   */
  action: (input: Values) => Promise<Data>
  /**
   * initial values or string of keys like ['profile.name', 'profile.meta[]']
   */
  values: DeepPartial<Values> | string[]
  /**
   * thenable
   */
  then?: (ctx: FormikHelpers<Values>) => void
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
export default function Form<V extends object, D>({
  children,
  values,
  required,
  then,
  action,
  ...FormikProps
}: WithChildren<Form<V, D>>) {
  const values_ = useMemo(() => {
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
            ctx.setErrors(errors)
            ctx.setSubmitting(false)
            return
          }

          action(values as V)
            .then(() => {
              then && then(ctx)
            })
            .catch(error => {
              if (!(error instanceof HttpError)) {
                console.error('submit unknown error', error)
                ctx.setStatus({ error: 'some error, please try later' })
                return
              }

              const fields = error.getErrorFields()
              fields && ctx.setErrors(fields)

              ctx.setStatus({ error: error.message })
            })
            .finally(() => {
              ctx.setSubmitting(false)
            })
        }}
        {...FormikProps}
      >
        <FormikForm css={form_tw}>{children}</FormikForm>
      </Formik>
    </formMetaInfo.Provider>
  )
}

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T
