import { doc } from './index'
import express from 'express'

const app = express()
app.use(doc)

app.listen(3000, () => {
  console.log('listening on 3000')
})
