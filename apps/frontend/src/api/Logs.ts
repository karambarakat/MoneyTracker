import fetch_ from '@src/utils/fetch_'
import { QueryFunctionContext } from '@tanstack/react-query'
import { Log } from 'types/src/schema'

export const find_log = (ctx: QueryFunctionContext) =>
  fetch_<Log[]>('/log', {
    method: 'GET',
  })

export const find_one_log = ({ queryKey }: QueryFunctionContext) =>
  fetch_<Log>('/log' + queryKey[1], {
    method: 'GET',
  })

// export async function find(): Res<Log>{
//   return await fetch(import.meta.env.VITE_BACKEND_API + '/log', {
//     method: 'GET',
//     headers: {
//       Authorization: 'Bearer ' + '',
//     },
//   })
// }

// export async function find_one(id: string) {
//   return await
//     fetch(import.meta.env.VITE_BACKEND_API + '/log/' + id, {
//       method: 'GET',
//       headers: {
//         Authorization: 'Bearer ' + 'helpers.token()',
//       },
//     }),
// }
