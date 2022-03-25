import log from '@utils/log'
import dotenv from 'dotenv'
import path from 'path'
try {
  if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: path.join('.env.prod') })
  }
  if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: path.join('.env.dev') })
  }
  dotenv.config({ path: path.join('.env') })
  console.log(process.env)
  log('environment', 'loaded')
} catch {
  log('environment', 'loading failed')
  process.exit(1)
}

export default true
