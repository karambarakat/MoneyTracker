import { ResourceWasNotFound, UnknownServerError } from '@error-handler/Errors'
import HttpError from '@error-handler/HttpError'

export default function e404() {
  HttpError(ResourceWasNotFound)
}
