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
