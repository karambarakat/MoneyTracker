/// <reference types="node" />
import * as Schemas from '../json-schema'
import writeFile from '../utils/writeFile'

async function main(obj: object) {
  Object.values(obj).map(schema => {
    writeFile(
      `./dist/json${schema.$id}.json`,
      JSON.stringify(
        {
          ...schema,
          $id: 'https://expamle.com' + schema.$id,
        },
        null,
        2,
      ),
    )

    console.log('build-json: file written ./dist/json' + schema.$id + '.json')
  })
}

Object.entries(Schemas).forEach(([name, schema]) => {
  if (name === 'default') {
    return
  }
  main(schema)
})
