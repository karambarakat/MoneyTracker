// @ts-check
import schemas from './index.js'
import fs from 'fs/promises'
import { get } from 'http'
import path from 'path'

it('all files are imported', async function () {
  const s = await fs.readdir('./json-schema', { withFileTypes: true })

  var allFiles = 0

  for (const value of s) {
    if (value.isDirectory()) {
      const arr = await ArrayFromAsyncGen(
        recursiveGetAll(path.join('.', 'json-schema', value.name))
      )

      console.log(arr)
      allFiles += arr.length
    }
  }
  expect(schemas.length).toEqual(allFiles)
})

async function ArrayFromAsyncGen(gen) {
  const rt = []
  for await (const iterator of gen) {
    rt.push(iterator)
  }
  return rt
}

async function* recursiveGetAll(cd = '.') {
  const s = await fs.readdir(cd, { withFileTypes: true })

  for (const subP of s) {
    if (subP.isFile()) {
      if (subP.name === 'index.js') continue
      yield path.join(cd, subP.name)
      continue
    }

    if (subP.isDirectory()) {
      yield* recursiveGetAll(path.join(cd, subP.name))
    }
  }
}
