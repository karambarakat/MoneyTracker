import log from '@utils/log'
import dotenv from 'dotenv'
import path from 'path'
try {
  var envError: undefined | Error
  switch (process.env.NODE_ENV) {
    case 'production':
      envError = dotenv.config({ path: path.join('.env.prod') }).error
      break
    case 'development':
      envError = dotenv.config({ path: path.join('.env.dev') }).error
      break
    case 'test':
      envError = dotenv.config({ path: path.join('.env.test') }).error
      break
  }
  const allError = dotenv.config({ path: path.join('.env') }).error

  if (allError) throw allError
  if (envError) throw envError

  log('environment', `loaded for env:${process.env.NODE_ENV}`)
} catch {
  log('environment', 'loading failed')
  process.exit(1)
}

export default true
