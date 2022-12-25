import log from '@utils/log'
import app from './app'
import db_conn from '@config/db-conn'
/**
 * this file is used in production/development
 * in test `./app.ts` will be imported without listening on any port or connecting to any database
 */
async function main() {
  await db_conn()

  const PORT = process.env.PORT || 8811
  app.listen(PORT, () => log('app', `listening at port ${PORT}`))
}

main().catch(console.error)
