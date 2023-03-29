import { inspect } from 'util'
import getDoc from './lib/openapi/proxy'
import _ from './lib/openapi/builder'

const doc = getDoc({
  info: { title: 'myPocket', version: '1.0.0' },
})

doc.paths['/get/get'].put = _.build([{ type: 'byId' }])

console.log('doc', inspect(doc, { depth: 10, colors: true }))
console.log('/index.ts')
