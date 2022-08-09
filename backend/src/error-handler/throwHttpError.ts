import { CustomErrorProps } from '@myTypes/HTTPError'

export default function throwHttpError(error: CustomErrorProps): void {
  const CustomError = new Error(error.message)
  //@ts-ignore
  CustomError.customError = error

  throw CustomError
}

export function returnHttpError(error: CustomErrorProps): Error {
  const CustomError = new Error(error.message)
  //@ts-ignore
  CustomError.customError = error

  return CustomError
}

export function throwQuickHttpError(
  status: number,
  message: string,
  name?: string,
  details?: any
): void {
  const CustomError = new Error(message)
  const quickError: CustomErrorProps = {
    status,
    message,
    name: name || 'RequestError',
    details: details || {},
  }
  // @ts-ignore
  CustomError.customError = quickError

  throw CustomError
}
