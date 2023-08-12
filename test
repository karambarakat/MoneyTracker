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
  useField,
} from 'formik'
import { WithAsChild, WithChildren } from '../../utils/WithChildren'
import { Slot } from '@radix-ui/react-slot'
import React, { createContext, useContext, useMemo } from 'react'
import { capitalCase } from 'change-case'
import requires from '../../utils/requires'

import HttpError from 'types/dist/helpers/http_error'
import { useId } from '@mantine/hooks'
import { CircleX, X } from 'tabler-icons-react'

interface BridgeProps {
  fieldName: string
  title?: string
  validate?: (value: string) => string | undefined
}

/**
 * this component is a bridge that separate formik logic
 * and common UI design (low level) from each specific
 * field component (hi level eg. TextField, EmailField)
 *
 * if in the future I decided to migrate from formik I can
 * just change this component
 */
function Field({
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

  const id = useId()

  return (
    <FormikField validate={validate} name={fieldName}>
      {({ field, meta, form }: FieldProps) => {
        // Component height: 32
        // label height: 16
        // label enlarged space: 24
        return (
          <div
            id={id}
            className={[
              field.value ? 'value' : 'no-value',
              meta.touched && meta.error ? 'error' : 'no-error',
            ].join(' ')}
            tw="focus-within:()"
          >
            <label>
              <div tw="flex gap-3 items-center">
                <div tw="flex-1">
                  <div
                    css={[
                      {
                        // eslint-disable-next-line quotes
                        ["&[data-required='true']::after"]: css`
                          ${tw`text-red-600`};
                          content: ' *';
                        `,
                      },
                      tw`h-[16px] translate-y-[16px] text-base transition-[transform,font-size] text-gray-500`,
                      {
                        [`#${id}:focus-within &, #${id}.value &`]: tw`translate-y-0 text-xs `,
                        [`#${id}:focus-within &`]: tw`text-blue-600`,
                        [`#${id}.error &`]: tw`text-red-600`,
                      },
                    ]}
                    data-required={!req}
                  >
                    {title || capitalCase(fieldName)}
                  </div>
                  <Component
                    tw="w-full bg-transparent pb-1 focus-visible:outline-none"
                    required={req}
                    {...field}
                    children={asChild ? children : undefined}
                    value={field.value ?? ''}
                  />
                </div>
                {field.value && (
                  <div
                    tw="cursor-pointer p-2 pr-0 pb-0"
                    onClick={() => form.setFieldValue(fieldName, undefined)}
                  >
                    <X size={16} />
                  </div>
                )}
              </div>
              <div
                tw="min-h-[1px] w-full bg-slate-400/70 transition-[background-color]"
                css={{
                  [`#${id}:focus-within &`]: tw`bg-blue-600 outline outline-1 outline-blue-600`,
                  [`#${id}.error &`]: tw`bg-red-600 outline outline-1 outline-red-600`,
                }}
              />
            </label>
            {/* // todo: aria labels to link with input? */}
            <div tw="text-red-600">
              {meta.touched && meta.error && <div>{meta.error}</div>}
            </div>
          </div>
        )
      }}
    </FormikField>
  )
}

// interface FieldContext {
//   id: string
//   name: string
//   req: boolean
//   title?: string
// }
// const CurrentFieldContext = React.createContext<FieldContext>({
//   id: '',
//   req: false,
//   name: '',
// })

export { Field }

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
export function Form<V extends object, D>({
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
        <FormikForm css={tw`flex gap-4 flex-col`}>{children}</FormikForm>
      </Formik>
    </formMetaInfo.Provider>
  )
}

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T
