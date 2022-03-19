import log from '@utils/log'
import dotenv from 'dotenv'
import path from 'path'

const { error } = dotenv.config({ path: path.join('.env') })

if (error) {
  log('environment', 'loading failed')
  process.exit(1)
}
log('environment', 'loaded')

export default true
