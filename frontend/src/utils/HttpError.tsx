import { store } from '@redux/index'
import { APIResponse, MyDispatch } from '@redux/types'

interface Error {
  status: number
  message: string
  name: string
  details: { errors?: { [key: string]: string } }
}

export default function HttpError(data: any) {
  const e = new Error(data.message as string)
  //@ts-ignore
  e.errors = data.details?.errors
  return e
}

export function httpErrorHandler(response: APIResponse) {
  if (!response.error) return response.data

  // todo: log out when session ends
  // need better way to redirect the user to '/'
  if (response.error?.details?.name == 'TokenExpiredError') {
    store.dispatch<MyDispatch>({ type: 'USER_LOGOUT' })
  }

  if (response.error) throw HttpError(response.error)
}
