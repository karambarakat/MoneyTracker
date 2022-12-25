import log from '@utils/log'
import dotenv from 'dotenv'
import path from 'path'

async function main() {
  var _path = path.join(__dirname, '..', '..', '.env')
  const { parsed, error } = dotenv.config({ path: _path })

  if (error) throw error

  log('environment', `loaded for env:${process.env.NODE_ENV}`)
}

main().catch((e) => {
  log('environment', 'loading failed')
  console.error(e)
  process.exit(1)
})

export default true
