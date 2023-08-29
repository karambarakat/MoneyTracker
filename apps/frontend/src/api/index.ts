import { QueryFunctionContext } from '@tanstack/react-query'
import * as mutations from './mutations'
export { mutations }
import * as queries from './queries'
export { queries }

export type queryNames = keyof typeof queries

export type queryKeys<T extends queryNames = queryNames> = T extends queryNames
  ? (typeof queries)[T] extends (...args: infer A) => any
    ? [T, ...A]
    : never
  : never

export type queryReturn<T extends queryNames> = T extends queryNames
  ? ReturnType<(typeof queries)[T]> extends Promise<infer A>
    ? A
    : never
  : never

// still experimental
function fnFromQueryKey<Q extends keyof typeof queries>({
  queryKey,
}: QueryFunctionContext<queryKeys<Q>>): () => Promise<queryReturn<Q>> {
  const [name, ...rest] = queryKey

  return () =>
    queries[name](
      // @ts-ignore
      ...rest,
    ) as any
}

// the above code is not working yet
// const data = useQuery({
//   queryKey: getQueryKey('find_one_log', { _id: '123' }),
//   queryFn: fnFromQueryKey,
// })
// console.log(data.data?.().then(d => d._id))
// what I want is
// console.log(data.data?._id)

export function getQueryKey<T extends queryNames>(...args: queryKeys<T>) {
  return args
}
// this is not optimal way to get typescript intellisense, this results in
// const data = useQuery({
//   queryKey: getQueryKey('find_one_log', { _id: '123' }),
//   queryFn: fnFromQueryKey,
// })
// what I want is
// const data = useQuery({
//   queryKey: ['find_one_log', { _id: '123' }],
//   queryFn: fnFromQueryKey,
// }) satisfies SomeType
