import { ResourceWasNotFound, UnknownServerError } from '@error/Errors'
import HttpError from '@error/HttpError'

export default function e404() {
  HttpError(ResourceWasNotFound)
}
