import { useQuery as useQueryBase } from '@tanstack/react-query'
import * as all_apis from './index'

import { QueryClient, UseQueryOptions } from '@tanstack/react-query'

declare global {
  namespace API {
    export type queryKeys<T extends API.queryAPI> =
      (typeof all_apis)[T] extends (...args: infer A) => any ? [T, ...A] : never
  }
}

export function queryKey<T extends API.queryAPI>(...args: API.queryKeys<T>) {
  return args
}

export function useQuery<T extends API.queryAPI>(...args: API.queryKeys<T>) {
  const [name, ...params] = args
  const fn = all_apis[name]

  return useQueryBase({
    queryFn: () => {
      return fn(
        // @ts-expect-error
        ...params,
      ) as Awaited<ReturnType<typeof fn>>
    },
    queryKey: [name, ...params],
  })
}

export function useQueryOption<T extends API.queryAPI>(
  options: UseQueryOptions<any>,
  ...args: API.queryKeys<T>
) {
  const [name, ...params] = args
  const fn = all_apis[name]

  return useQueryBase({
    queryFn: () => {
      return fn(
        // @ts-expect-error
        ...params,
      ) as Awaited<ReturnType<typeof fn>>
    },
    queryKey: [name, ...params],
    ...options,
  })
}

// use case, uncomment and inspect if any typescript error
// const { data } = useQuery(API.queryAPI.find_category)
// data?.map(e => e._id).join('')
// queryKey(API.queryAPI.find_category)
// useQuery(API.queryAPI.find_one_category, { _id: 'sdfasdfasdf' })
// useQuery(API.queryAPI.find_category)
