import { QueryFunctionContext as ctx } from '@tanstack/react-query'

export default async function fetch_<R>(
  id: string,
  init?: Parameters<typeof fetch>[1],
) {
  const res = await fetch(import.meta.env.VITE_BACKEND_API + id, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization:
        'Bearer ' +
        // todo refactoring: use localStorage
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhlYzQ2Y2NmOWM2MzcxNjBmMzczNjkiLCJlbWFpbCI6InVzZXJAZy5jIiwiaWF0IjoxNjg3MDc3OTk2LCJleHAiOjE2ODcyNTA3OTZ9.j6ElVd6_iln2DP9MEIW-Efx4SleG50e6Sar6_pXCsgs',
    },
  })

  const { data, error } = await res.json()

  if (error) return Promise.reject(error)

  return data as R
}

export type ActionOutput<T> = T extends (
  ...IDontCare1: any[]
) => (...IDontCare3: any[]) => Promise<infer output>
  ? output
  : never

export type ActionInput<T> = T extends (
  ...Input: infer input
) => (...IDontCare3: any[]) => Promise<unknown>
  ? input
  : never

export type Action<input = object, output = unknown> = keyof input extends never
  ? () => (ctx: ctx) => Promise<output>
  : (input: input) => (ctx: ctx) => Promise<output>
