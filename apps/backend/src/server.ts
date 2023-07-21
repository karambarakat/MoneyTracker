import log from '@utils/log'
import db_conn from '@config/db-conn'
import { app } from 'app'

async function main() {
  await db_conn()
  const PORT = process.env.PORT || 8080
  app.listen(PORT, () => log('app', `listening at port ${PORT}`))
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
