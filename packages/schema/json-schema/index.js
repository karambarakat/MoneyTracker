// @ts-check
import Ajv from 'ajv'
import * as importAll from './import.js'
import { format01 } from '../src/avj/formatRelationship.js'
import ajvMerge from 'ajv-merge-patch'
import prune from '../src/utils/prune.js'
import { keywordMod } from '../src/avj/KeywordMod.js'

const schemas = []

Object.values(importAll).forEach((v) =>
  Object.values(v).forEach((v) => schemas.push(prune(v)))
)

// export { schemas }

const myAjv = new Ajv({
  schemas,
  allErrors: true,
  formats: { ...format01 },
  keywords: [keywordMod],
})

export default myAjv
