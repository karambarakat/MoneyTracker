/// <reference types="node" />
import * as Schemas from '../json-schema'
import { writeFileSync } from 'fs'

async function main(obj: object) {
  Object.values(obj).map(schema => {
    writeFileSync(
      `./dist/json${schema.$id}.json`,
      JSON.stringify(
        {
          ...schema,
          $id: 'https://expamle.com' + schema.$id,
        },
        null,
        2,
      ),
      {
        encoding: 'utf-8',
        flag: 'w+',
      },
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
