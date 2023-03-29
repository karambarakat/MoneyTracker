// @ts-check
import auth_local from './paths/auth_local.js'
import category from './paths/category.js'
import log from './paths/log.js'
import profile from './paths/profile.js'

import OpenApiDoc from '../src/wrappers/openapi/index.js'

const oapi_doc = new OpenApiDoc()

auth_local(oapi_doc)
profile(oapi_doc)
category(oapi_doc)
log(oapi_doc)

export default () => JSON.parse(JSON.stringify(oapi_doc._doc))
