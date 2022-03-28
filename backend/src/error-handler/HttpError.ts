import { CustomErrorProps } from '@interfaces/HTTPError'

export default function HttpError(error: CustomErrorProps): void {
  const CustomError = new Error(error.message)
  //@ts-ignore
  CustomError.customError = error

  throw CustomError
}

export function HttpQuickError(status: number, message: string): void {
  const CustomError = new Error(message)
  const quickError: CustomErrorProps = {
    status,
    message,
    name: 'RequestError',
    details: {},
  }
  // @ts-ignore
  CustomError.customError = quickError

  throw CustomError
}
