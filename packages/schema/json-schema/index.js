// @ts-check
import Ajv from 'ajv'
import ajvFormat from 'ajv-formats'
import ajvMerge from 'ajv-merge-patch'
import * as importAll from './importAll.js'
import prune from '../utils/prune.js'

const schemas = []
Object.values(importAll).forEach((v) =>
  Object.values(v).forEach((v) => schemas.push(prune(v)))
)

console.log(schemas)

/**
 * @type {Record<string, import('ajv').Format>}
 */
const format01 = { 'relation::<name>': true }

/**
 * @type {import('ajv').Vocabulary extends Array<infer R> ? R : never}
 */
const keywordRemoveReadOnly = {
  type: 'object',
  schemaType: 'boolean',
  keyword: 'x-remove_read_only',
  // macro: (schema, parentSchema, ctx) => {
  //   /**
  //    * @type {import("json-schema").ThisSchema}
  //    */
  //   const rtSchema = {}
  //   return {}
  // },
}

/**
 * @type {import('ajv').Vocabulary extends Array<infer R> ? R : never}
 */
const keywordPartial = {
  type: 'object',
  schemaType: 'boolean',
  keyword: 'x-partial',
  // macro: (schema, parentSchema, ctx) => {
  //   applyPatch(
  //     parentSchema,
  //     [
  //         op: 'remove',
  //         path: '/required',
  //       },
  //     ],
  //     true
  //   )
  //   console.log(parentSchema)
  //   const current = ctx.self.getSchema(
  //     ctx.baseId.toString() + ctx.schemaPath.str
  //   )
  //   console.log(current)

  //   // if (
  //   //   schemaBeingValidated.type === 'object' &&
  //   //   schemaBeingValidated.required
  //   // ) {
  //   //   console.log('hit')
  //   //   delete schemaBeingValidated.required
  //   // }

  //   // if (
  //   //   schemaBeingValidated.type === 'object' &&
  //   //   schemaBeingValidated.properties
  //   // ) {
  //   //   console.log('hit')
  //   //   for (var prop in schemaBeingValidated.properties) {
  //   //     var propSchema = schemaBeingValidated.properties[prop]
  //   //     if (propSchema.required) {
  //   //       delete propSchema.required
  //   //     }
  //   //   }
  //   // }

  //   // console.log(schemaBeingValidated)

  //   return true
  // },
}

const myAjv = new Ajv({
  schemas,
  allErrors: true,
  formats: { ...format01 },
  keywords: [keywordRemoveReadOnly],
})

ajvMerge(myAjv)

export default myAjv
