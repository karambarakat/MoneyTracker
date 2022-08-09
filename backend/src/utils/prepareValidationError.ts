import { myValidationError } from 'types/mongoose'

export default function prepareValidationError(
  message: string,
  errors: myValidationError['errors']
): myValidationError {
  const rtError = new Error(message) as myValidationError
  rtError.errors = errors
  return rtError
}
