import { ResourceWasNotFound } from '@httpErrors/errTypes'
import { throwHttpError, throwQuickHttpError } from '@httpErrors'

import auth from '@middlewares/auth'
import Log from '@models/Log'
import UserInterface from 'types/models/UserModel'
import LogInterface from 'types/models/LogModel'

import { NextFunction, Request, Response, Router } from 'express'
import _ from 'express-async-handler'
import { ObjectId } from 'mongodb'

declare global {
  namespace Express {
    interface User extends UserInterface {}
  }
}

const router = Router()

/**
 *   @desc    get all logs
 *   @route   GET /api/v__/log
 *   @access  Private
 */
async function find(req: Request, res: Response, next: NextFunction) {
  const reqUser = req.user as UserInterface

  const logs = await Log.find({ createdBy: new ObjectId(reqUser._id) })

  res.json({ data: logs })
}

/**
 *   @desc    add one log
 *   @route   POST /api/v__/log
 *   @access  Private
 */
async function create(req: Request, res: Response, next: NextFunction) {
  const reqUser = req.user as UserInterface

  const newData: LogInterface = {
    title: req.body.title,
    amount: req.body.amount,
    category: req.body.category,
    note: req.body.note,
    createdBy: reqUser._id,
  }

  const log = await Log.create(newData)

  res.status(201).json({ data: log })
}

/**
 *   @desc    get log by its id
 *   @route   GET /api/v__/log/:id
 *   @access  Private, ifLogExists
 */
async function findOne(req: Request, res: Response, next: NextFunction) {
  res.json({
    data:
      // @ts-ignore
      req.log,
  })
}

/**
 *   @desc    update log by its id
 *   @route   PUT /api/v__/log/:id
 *   @access  Private, ifLogExists
 */
async function update(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const log = req.log

  const newData: LogInterface = {
    title: req.body.title,
    amount: req.body.amount,
    category: req.body.category,
    note: req.body.note,
  }

  await Log.findOneAndUpdate(
    { createdBy: new ObjectId(log.createdBy), _id: new ObjectId(log._id) },
    newData,
    { runValidators: true }
  )

  const updatedLog = await Log.findOne({
    createdBy: new ObjectId(log.createdBy),
    _id: new ObjectId(log._id),
  })

  res.json({ data: updatedLog })
}
/**
 *   @desc    delete log by its id
 *   @route   DELETE /api/v__/log/:id
 *   @access  Private, ifLogExists
 */
async function delete_(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const log = req.log

  const deleted = await Log.deleteOne({ _id: log._id })

  if (!deleted) throwQuickHttpError(400, 'failed to delete')
  else res.json({ data: null })
}

router.route('/').get(auth, _(find)).post(auth, _(create))
router
  .route('/:id')
  .get(auth, _(findLog), _(findOne))
  .put(auth, _(findLog), _(update))
  .delete(auth, _(findLog), _(delete_))

/**
 * helper functions
 */
async function findLog(req: Request, res: Response, next: NextFunction) {
  const logId = req.params.id
  const reqUser = req.user as UserInterface

  const foundLog = await Log.findOne({
    createdBy: new ObjectId(reqUser._id),
    _id: new ObjectId(logId),
  })

  if (foundLog) {
    // @ts-ignore
    req.log = foundLog
    next()
  } else {
    throwHttpError(ResourceWasNotFound)
  }
}

export default router
