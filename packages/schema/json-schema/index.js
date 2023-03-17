// @ts-check
import Ajv from 'ajv'
import ajvFormat from 'ajv-formats'

import * as req from './requests'
import * as modules from './modules'
import * as restErrors from './restErrors'
import prune from '../utils/prune.js'

const schemas = [
  ...Object.values(req).map(prune),
  ...Object.values(modules).map(prune),
  ...Object.values(restErrors).map(prune),
]

const ajv = new Ajv({
  schemas,
  allErrors: true,
})

export default ajv
