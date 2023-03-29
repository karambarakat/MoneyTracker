import { JSONSchema7 } from 'json-schema'

export default function restError(
  status: number,
  id: string,
  description: string,
  details: null | ({ type: 'object' } & JSONSchema7) = null
) {
  if (details && details.type !== 'object') {
    throw new Error('restError: details.type must be object')
  }

  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: 'http://ex.ample/restError/' + id,
    ['x-error']: status,
    type: 'object',
    required: ['status', 'name', 'message', 'details'],
    properties: {
      status: status ? { type: 'number', default: status } : { type: 'number' },
      name: id ? { type: 'string', default: id } : { type: 'string' },
      message: { type: 'string' },
      details: details ? { ...details, type: 'object' } : { type: 'null' },
    },
    description,
    additionalProperties: false,
  } satisfies JSONSchema7
}