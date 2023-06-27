import {
  FailedToDelete,
  FieldsRequired,
  NoLog,
  PrivateRoute,
  ResourceWasNotFound,
} from '@utils/httpError/errTypes'
import { requiredFieldsMiddleware } from '@utils/httpError'

import bearerAuth from '@middlewares/bearerAuth'
import Log, { ILog } from '@models/Log'

import { NextFunction, Request, Response, Router } from 'express'
import _ from 'express-async-handler'
import { ObjectId } from 'mongodb'
// import { log_create, log_update } from 'types/src/api/routes/log'
import { SchemaLogIn } from 'types/dist/ts/schema'
import of from '@utils/omitFalsy'

const router = Router()

/**
 * @desc      get all logs
 * @route     GET /api/v__/log
 * @response  LogDoc[]
 * @access    Private
 */
async function find(req: Request, res: Response, next: NextFunction) {
  if (!req.user) throw PrivateRoute()
  // if (!req.filterQuery) throw new Error()

  const logs = await Log.find({
    // ...req.filterQuery,
    createdBy: new ObjectId(req.user._id),
  })

  res.json({ data: logs.map(e => e.doc()) })
}

/**
 * @desc      add one log
 * @route     POST /api/v__/log
 * @body      log_create
 * @response  LogDoc
 * @access    Private
 */
async function create(req: Request, res: Response, next: NextFunction) {
  if (!req.user) throw PrivateRoute()

  const { title, amount, category, note } = of(req.body) as SchemaLogIn

  requiredFieldsMiddleware({ title, amount })

  const log = await Log.create({
    title,
    amount,
    category,
    note,
    createdBy: req.user._id,
  })
  res.status(201).json({ data: log.doc() })
}

/**
 * helper functions
 */
const isIdHex = (str: unknown) =>
  typeof str === 'string' && str.length === 24 && str.match(/(?![0-9a-fA-F])/g)
async function findLog(req: Request, res: Response, next: NextFunction) {
  if (!req.user) throw PrivateRoute()

  if (!req.params.id || !isIdHex(req.params.id)) {
    throw FieldsRequired(['_id'])
  }

  const foundLog = await Log.findOne({
    createdBy: new ObjectId(req.user._id),
    _id: new ObjectId(req.params.id),
  })

  if (foundLog) {
    req.log = foundLog
    next()
  } else {
    throw ResourceWasNotFound()
  }
}

/**
 *   @desc      get log by its id
 *   @route     GET /api/v__/log/:id
 *   @param     id of the log
 *   @response  LogDoc
 *   @access    Private, ifLogExists
 */
async function findOne(req: Request, res: Response, next: NextFunction) {
  if (!req.log) throw NoLog()

  res.json({
    data: req.log.doc(),
  })
}

/**
 *   @desc      update log by its id
 *   @route     PUT /api/v__/log/:id
 *   @param     id of the log
 *   @body      log_update
 *   @response  LogDoc
 *   @access    Private, ifLogExists
 */
async function update(req: Request, res: Response, next: NextFunction) {
  if (!req.log) throw NoLog()

  const { title, amount, category, note } = of(req.body) as Partial<SchemaLogIn>

  req.log.title = title || req.log.title
  req.log.amount = amount || req.log.amount
  ;(req.log.category as unknown as string) =
    category || (req.log.category as unknown as string)
  req.log.note = note || req.log.note

  await req.log.save()

  res.json({ data: req.log.doc() })
}

/**
 *   @desc      delete log by its id
 *   @route     DELETE /api/v__/log/:id
 *   @param     id of the log
 *   @response  null
 *   @access    Private, ifLogExists
 */
async function delete_(req: Request, res: Response, next: NextFunction) {
  if (!req.log) throw NoLog()

  const deleted = await Log.deleteOne({ _id: req.log._id })

  if (!deleted) throw FailedToDelete()

  res.json({ data: null })
}

router.route('/').get(bearerAuth, _(find))
router.route('/').post(bearerAuth, _(create))
router.route('/:id').get(bearerAuth, _(findLog), _(findOne))
router.route('/:id').put(bearerAuth, _(findLog), _(update))
router.route('/:id').delete(bearerAuth, _(findLog), _(delete_))

export default router
