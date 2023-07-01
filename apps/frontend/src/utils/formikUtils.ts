import { MutateOptions, UseMutationResult } from '@tanstack/react-query'
import { FormikHelpers } from 'formik'
import HttpError from 'types/dist/helpers/HttpError'
import ErrorDebug from './ErrorDebug'

type UndefinedKeyOf<R extends object, K extends keyof R> = K extends K
  ? undefined extends R[K]
    ? never
    : K
  : never

/**
 * I faced a problem in Formik where initial values should be undefined (at first)
 * but with onSubmit they may have required values.
 * on typescript side using validate prop is not making this type safe.
 * on javascript side code in validate prop is redundant and could be DRYed.
 * @param values input object, may contain undefined values
 * @param required required keys, bridges the gap between typescript and javascript
 * @returns output object where required keys are guaranteed to be defined
 */
export const require = <A extends object>(
  values: Partial<A>,
  required: UndefinedKeyOf<A, keyof A>[],
) => {
  const errors: Partial<Record<keyof A, string>> = {}

  for (const key of required) {
    if (!values[key]) errors[key] = (key as string) + ' is required'
  }

  return Object.keys(errors).length === 0
    ? ([undefined, values as A] as const)
    : ([errors, undefined] as const)
}

/** type safety: test case 1
 type test1Type = { title: string; amount: number; node?: string }
 const [_, obj1] = require<test1Type>({ title: '', amount: 12 }, ['amount', 'title'])
 
 if (_) throw new Error('should not happen')
 
 obj1.amount.toString // required
 obj1.title.search // required
 // @ts-expect-error ts(18048)
 obj1.node.search
 
 */

/** type safety: test case 2
type test2Type = { title: string; amount: number; node?: string }
const [e2, _] = require<test2Type>({}, ['amount', 'title'])

if (e2) {
  e2.amount?.search // string | undefined
  e2.title?.search // string | undefined
  e2.node?.search // string | undefined

  throw new Error('')
}

// should not be reachable
_.amount.toString // required
_.title.search // required
// @ts-expect-error ts(18048)
_.node.search

 */

export const formikMutateOption: (
  formikContext: FormikHelpers<any>,
) => MutateOptions<any, any, any, any> = formikContext => ({
  onError: e => {
    if (!(e instanceof HttpError)) {
      console.error('submit unknown error', e)
      formikContext.setStatus({ error: 'some error, please try later' })
      return
    }

    try {
      // @ts-ignore
      const errs = e.payload.details.errors
      if (typeof errs !== 'object' || errs === null)
        throw new ErrorDebug('unknown destructuring error', { errs, e })
      formikContext.setErrors(errs)
    } catch {
      //
    }
    formikContext.setStatus({ error: e.message })
  },
  onSettled() {
    formikContext.setSubmitting(false)
  },
})
