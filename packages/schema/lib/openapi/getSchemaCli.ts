// see ./getSchema.ts
import { getSchemaAsync } from './getSchema'

const [__, _, a, b] = process.argv

if (typeof a !== 'string' || (b && typeof b !== 'string'))
  throw new Error('a is not a string')

const a0 = a.split('___').slice(1).join('___')
const b0 = b && b.split('___').slice(1).join('___')

// this may sound stupid but see `lib/openapi/getSchema.ts@cliGetSchema`
async function main() {
  const schema = await getSchemaAsync(a0 as any, b0)
  console.log(JSON.stringify(schema))
}

main()
