import log from '@utils/log'
import mongoose from 'mongoose'
import { NextFunction, Request, Response } from 'express'
import _ from 'express-async-handler'

async function main() {
  log('database', 'connecting ...')

  var url = process.env.MONGO_STRING as string
  await mongoose
    .connect(url)
    .then(() => log('database', 'connected'))
    .catch((err) => log('database', 'failed', err))
}

export const express_conn = _(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  await main()
  next()
})

export const disconnect = mongoose.disconnect

export default main
