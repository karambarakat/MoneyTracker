import { JSONSchema7 } from 'json-schema'
import refs from '../../dist/helpers/refs'

type Refed = Omit<JSONSchema7, '$ref'>

export type JSONSchema =
  | { $ref: refs }
  | (Omit<
      Refed,
      | 'items'
      | '$defs'
      | 'additionalItems'
      | 'contains'
      | 'properties'
      | 'patternProperties'
      | 'additionalProperties'
      | 'propertyNames'
      | 'if'
      | 'then'
      | 'else'
      | 'allOf'
      | 'anyOf'
      | 'oneOf'
      | 'not'
      | 'definitions'
    > & {
      items?: JSONSchema | JSONSchema[] | undefined
      $defs?:
        | {
            [key: string]: JSONSchema
          }
        | undefined
      additionalItems?: JSONSchema | undefined
      contains?: JSONSchema | undefined
      properties?: { [key: string]: JSONSchema } | undefined
      patternProperties?: { [key: string]: JSONSchema } | undefined
      additionalProperties?: JSONSchema
      propertyNames?: JSONSchema | undefined
      if?: JSONSchema | undefined
      then?: JSONSchema | undefined
      else?: JSONSchema | undefined
      allOf?: JSONSchema | undefined
      anyOf?: JSONSchema | undefined
      oneOf?: JSONSchema | undefined
      not?: JSONSchema | undefined
      definitions?: { [key: string]: JSONSchema } | undefined
    })
