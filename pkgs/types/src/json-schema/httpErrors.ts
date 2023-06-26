import HttpErrorBuilder from '../builders/HttpErrorBuilder'
/*
thoughts:
having many const export but one default and I will use the $id as follows:
export default { $id: '/httpErrors' }
export const SomeFieldsRequired = { $id: '##/SomeFieldsRequired'}
=> { ref: '/httpErrors/SomeFieldsRequired' }
---
export default { $id: '/httpErrors' }
export const SomeFieldsRequired = { $id: '#/SomeFieldsRequired'}
=> { ref: '/httpErrors#/SomeFieldsRequired' }
---
export default { $id: '/httpErrors' }
export const SomeFieldsRequired = { $id: '/another_path' }
=> { ref: '/another_path' }
---

so I'm using the default export as a meta data and use 
the const exports as the actual schemas
*/
export const FieldsRequired = HttpErrorBuilder(400, 'SomeFieldsRequired', {
  type: 'object',
  properties: {
    errors: {
      type: 'object',
      additionalProperties: { type: 'string' },
    },
  },
  additionalProperties: false,
  required: ['errors'],
})

export const EmailOrPasswordIncorrect = HttpErrorBuilder(
  401,
  'EmailOrPasswordIncorrect',
)

export const BadBasicToken = HttpErrorBuilder(401, 'BadBasicToken')

export const PasswordIncorrect = HttpErrorBuilder(401, 'PasswordIncorrect')

export const UserAlreadyExist = HttpErrorBuilder(409, 'UserAlreadyExist', {
  type: 'object',
  properties: {
    errors: {
      type: 'object',
      properties: {
        email: { type: 'string' },
      },
      required: ['email'],
      additionalProperties: false,
    },
  },
})

export const EmailIsUsed = HttpErrorBuilder(400, 'EmailIsUsed')

export const ResourceWasNotFound = HttpErrorBuilder(404, 'ResourceWasNotFound')

export const UnknownServerError = HttpErrorBuilder(500, 'UnknownServerError')

export const ValidationError = HttpErrorBuilder(400, 'ValidationError', {
  type: 'object',
  properties: {
    errors: {
      type: 'object',
      additionalProperties: { type: 'string' },
    },
  },
})

export const FailedToDelete = HttpErrorBuilder(500, 'FailedToDelete')

export const UnAuthorized = HttpErrorBuilder(401, 'UnAuthorized')

export const TokenFailed = HttpErrorBuilder(401, 'TokenFailed', {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: [
        'JsonWebTokenError',
        'TokenExpiredError',
        'NoTokenWasProvided',
        'UnspecifiedError',
      ],
    },
    date: { type: 'string' },
  },
  required: ['type'],
  additionalProperties: false,
})

export const DefaultError = HttpErrorBuilder(500, 'UnspecifiedError')
