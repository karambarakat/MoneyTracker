import get from 'lodash/get'
import set from 'lodash/set'

export const requires = <A extends object>(
  /**
   * input object, may contain undefined values
   */
  values: Partial<A>,
  /**
   * list of lodash paths that should be required
   * @example ['title', 'amount', 'note.text']
   */
  required: string[],
) => {
  const errors: Partial<Record<keyof A, string>> = {}

  for (const key of required) {
    const val = get(values, key)
    val ?? set(errors, key, `${key as string} is required`)
  }

  /**
   * output object where required keys are guaranteed to be defined
   */
  return Object.keys(errors).length === 0
    ? ([undefined, values as A] as const)
    : ([errors, undefined] as const)
}

export default requires

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
const [test, expect] = [() => {}, () => {}] as any

test('case 1', () => {
  type Type = { title: string; amount: number; node?: string }

  const data = { title: 'new title', amount: 12 }

  const [errors, values] = requires<Type>(data, ['amount', 'title'])

  // test the typescript
  if (errors === undefined) {
    values.amount.toString // required
    values.title.search // required
    // @ts-expect-error ts(18048) 'error.node' is possibly 'undefined'.
    values.node.search
  }

  if (errors) {
    // @ts-expect-error ts(2532) 'values' is possibly 'undefined'.
    values.amount.toString
    // @ts-expect-error ts(2339) Property 'amount' does not exist on type 'never'.
    values?.amount
  }

  // test the runtime
  expect(errors).toBeUndefined()
  expect(values).toEqual(data)

  // test 2 the runtime
  const [errors2, values2] = requires<Type>({}, ['amount'])

  expect(errors2).toEqual({ amount: 'amount is required' })
  expect(values2).toBeUndefined()
})
