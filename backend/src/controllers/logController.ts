import {
  FailedToDelete,
  NoLog,
  PrivateRoute,
  ResourceWasNotFound,
} from '@httpErrors/errTypes'
import { requiredFields } from '@httpErrors'

import auth from '@middlewares/auth'
import Log from '@models/Log'
import UserInterface from 'types/models/UserModel'
import LogInterface from 'types/models/LogModel'

import { NextFunction, Request, Response, Router } from 'express'
import _ from 'express-async-handler'
import { ObjectId } from 'mongodb'
import { log_create, log_update } from 'types/routes/log'
import of from '@utils/omitFalsy'

const router = Router()

/**
 *   @desc      get all logs
 *   @route     GET /api/v__/log
 *   @response  LogDoc[]
 *   @access    Private
 */
/**
 * @openapi
 * /api/v1/log/:
 *   get:
 *     description: get all logs
 *     responses:
 *       200:
 *         description: Everything went fine.
 */
async function find(req: Request, res: Response, next: NextFunction) {
  if (!req.user) throw PrivateRoute()
  // if (!req.filterQuery) throw new Error()

  const logs = await Log.find({
    // ...req.filterQuery,
    createdBy: new ObjectId(req.user._id),
  })

  res.json({ data: logs.map((e) => e.doc()) })
}

/**
 *   @desc      add one log
 *   @route     POST /api/v__/log
 *   @body      log_create
 *   @response  LogDoc
 *   @access    Private
 */
/**
 * @openapi
 * /api/v1/log/:
 *   post:
 *     description: add one log
 *     responses:
 *       200:
 *         description: get all logs.
 */
async function create(req: Request, res: Response, next: NextFunction) {
  if (!req.user) throw PrivateRoute()

  const { title, amount, category, note } = of(req.body) as log_create

  requiredFields({ title, amount })

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
async function findLog(req: Request, res: Response, next: NextFunction) {
  if (!req.user) throw PrivateRoute()

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

  const { title, amount, category, note } = of(req.body) as log_update

  req.log.title = title || req.log.title
  req.log.amount = amount || req.log.amount
  req.log.category = category || req.log.category
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

router.route('/').get(auth, _(find))
router.route('/').post(auth, _(create))
router.route('/:id').get(auth, _(findLog), _(findOne))
router.route('/:id').put(auth, _(findLog), _(update))
router.route('/:id').delete(auth, _(findLog), _(delete_))

export default router
