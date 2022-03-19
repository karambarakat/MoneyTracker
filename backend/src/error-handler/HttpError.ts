import { CustomErrorProps } from '@interfaces/HTTPError'

export default function HttpError(error: CustomErrorProps): void {
  const CustomError = new Error()
  //@ts-ignore
  CustomError.customError = error

  throw CustomError
}
