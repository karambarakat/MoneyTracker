import { JSONSchemaType } from 'ajv'
import { JSONSchema7 } from 'json-schema'
import { traverseFn } from '../../utils/schemaInterface'

export const jsonSchema: JSONSchemaType<JSONSchema7['x-error']> = {
  type: 'number',
  minimum: 400,
  maximum: 499,
}

export const traverse: traverseFn = async function (this, schema, {}) {
  return
}
