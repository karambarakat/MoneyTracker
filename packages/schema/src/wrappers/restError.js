// @ts-check
/**
 *
 * @param {number} status http status code for the error
 * @param {string} id unique name for the error
 * @param {string} description descripton for the error
 * @param {null | ({type: 'object'} & import('json-schema').JSONSchema7)} details extra details for the error
 * @returns {import('json-schema').JSONSchema7} to be used in json-schema as properties
 */
export default function restError(status, id, description, details = null) {
  if (details && details.type !== 'object') {
    throw new Error('restError: details.type must be object')
  }

  return {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: 'http://ex.ample/restError/' + id,
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
  }
}
