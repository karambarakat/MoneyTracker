import readFilesFromDir from '../utils/readFilesFromDir'
import { BASE_URL } from '../utils/constants'
import { getDefinitions, getIds } from '../utils/json-traverse'
import writeFile from '../utils/writeFile'

function BuildJsonRef() {
  const refs = Array<string>()

  const res = readFilesFromDir<{ $id: string }>('./dist/json', ({ out }) =>
    JSON.parse(out),
  )

  refs.push(...res.map(({ $id }) => $id.replace(BASE_URL, '')))

  res
    .map(one => getDefinitions(one).map(ref => ref.replace(BASE_URL, '')))
    .forEach(one => {
      refs.push(...one)
    })

  res
    .map(one => getIds(one).map(o => o.replace(BASE_URL, '')))
    .forEach(one => {
      refs.push(...one)
    })

  const results = `// don't edit directly
type refs = 
  ${refs.map(ref => `'${ref}'`).join(' |\n  ')}

export default refs
` // end of file

  writeFile('./dist/helpers/refs.ts', results)

  console.log('build-json-helper: file written ./dist/helpers/refs.ts')
}

BuildJsonRef()
