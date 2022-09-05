import {
  FailedToDelete,
  NoCategory,
  PrivateRoute,
  ResourceWasNotFound,
} from '@httpErrors/errTypes'
import { httpError, requiredFields, throwQuickHttpError } from '@httpErrors'

import auth from '@middlewares/auth'

import { NextFunction, Request, Response, Router } from 'express'
import _ from 'express-async-handler'
import { ObjectId } from 'mongodb'
import { category_create, category_update } from 'types/routes/category'
import Category from '@models/Category'
import Log from '@models/Log'

const router = Router()

/**
 *   @desc      get all logs
 *   @route     GET /api/v__/category
 *   @response  CategoryDoc[]
 *   @access    Private
 */
async function find(req: Request, res: Response, next: NextFunction) {
  if (!req.user) throw httpError(PrivateRoute)

  const categories = await Category.find({
    createdBy: new ObjectId(req.user._id),
  })

  res.json({ data: categories.map((e) => e.doc()) })
}

/**
 *   @desc      add one log
 *   @route     POST /api/v__/category
 *   @body      category_create
 *   @response  CategoryDoc
 *   @access    Private
 */
async function create(req: Request, res: Response, next: NextFunction) {
  if (!req.user) throw httpError(PrivateRoute)
  req.user._id

  const { title, color, icon } = req.body as category_create

  requiredFields({ title })

  const category = await Category.create({
    title,
    color,
    icon,
    createdBy: req.user._id,
  })
  res.status(201).json({ data: category.doc() })
}

/**
 * helper functions
 */
async function findCategory(req: Request, res: Response, next: NextFunction) {
  if (!req.user) throw httpError(PrivateRoute)

  const found = await Category.findOne({
    createdBy: new ObjectId(req.user._id),
    _id: new ObjectId(req.params.id),
  })

  if (found) {
    req.category = found
    next()
  } else {
    throw httpError(ResourceWasNotFound)
  }
}

/**
 *   @desc      get log by its id
 *   @route     GET /api/v__/category/:id
 *   @param     id of the log
 *   @response  CategoryDoc
 *   @access    Private, ifCategoryExists
 */
async function findOne(req: Request, res: Response, next: NextFunction) {
  if (!req.category) throw httpError(NoCategory)

  res.json({
    data: req.category.doc(),
  })
}

/**
 *   @desc      get all logs by their category id
 *   @route     GET /api/v__/category/:id
 *   @param     id of the category
 *   @response  LogDoc[]
 *   @access    Private, ifCategoryExists
 */
async function findAllLogs(req: Request, res: Response, next: NextFunction) {
  if (!req.category) throw httpError(NoCategory)
  if (!req.user) throw httpError(PrivateRoute)

  const logs = await Log.find({
    category: req.category._id,
    createdBy: req.user._id,
  })

  res.json({
    data: logs.map((e) => e.doc()),
  })
}

/**
 *   @desc      update log by its id
 *   @route     PUT /api/v__/category/:id
 *   @param     id of the log
 *   @body      category_update
 *   @response  CategoryDoc
 *   @access    Private, ifCategoryExists
 */
async function update(req: Request, res: Response, next: NextFunction) {
  if (!req.category) throw httpError(NoCategory)

  const { title, color, icon } = req.body as category_update

  req.category.title = title || req.category.title
  req.category.color = color || req.category.color
  req.category.icon = icon || req.category.icon

  await req.category.save()

  res.json({ data: req.category.doc() })
}

/**
 *   @desc      delete log by its id
 *   @route     DELETE /api/v__/category/:id
 *   @param     id of the log
 *   @response  null
 *   @access    Private, ifCategoryExists
 */
async function delete_(req: Request, res: Response, next: NextFunction) {
  if (!req.category) throw httpError(NoCategory)

  const deleted = await Category.deleteOne({ _id: req.category._id })

  if (!deleted) throw httpError(FailedToDelete)
  else res.json({ data: null })
}

router.route('/').get(auth, _(find))
router.route('/').post(auth, _(create))
router.route('/:id').get(auth, _(findCategory), _(findOne))
router.route('/:id').put(auth, _(findCategory), _(update))
router.route('/:id').delete(auth, _(findCategory), _(delete_))
router.route('/:id/logs').get(auth, _(findCategory), _(findAllLogs))

export default router
