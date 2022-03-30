import log from '@utils/log'
import dotenv from 'dotenv'
import path from 'path'
try {
  var envError: undefined | Error
  var envPath: string
  switch (process.env.NODE_ENV) {
    case 'production':
      envPath = path.join(__dirname, '..', '..', '.env.prod')
      envError = dotenv.config({ path: envPath }).error
      break

    case 'development':
      envPath = path.join(__dirname, '..', '..', '.env.dev')
      envError = dotenv.config({ path: envPath }).error
      break

    case 'test':
      envPath = path.join(__dirname, '..', '..', '.env.test')
      envError = dotenv.config({ path: envPath }).error
      break
  }

  envPath = path.join(__dirname, '..', '..', '.env')
  const allError = dotenv.config({ path: envPath }).error

  if (allError) throw allError
  if (envError) throw envError

  log('environment', `loaded for env:${process.env.NODE_ENV}`)
} catch (e) {
  log('environment', 'loading failed')
  console.error(e)
  process.exit(1)
}

export default true
