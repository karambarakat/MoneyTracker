// @ts-check

/**
 * @function
 * @template Option
 * @param {import('./_').RawComponent<Option>} input
 * @returns {unknown extends Option ?
 *      () => import('./_').Component :
 *      (options: Option) => import('./_').Component
 *    }
 */
export function RawFunctionTransformer(input) {
  return (option) => (data, actions) => input({ data, actions }, option)
}
