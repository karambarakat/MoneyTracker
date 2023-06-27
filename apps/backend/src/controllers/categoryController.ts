import {
  FailedToDelete,
  FieldsRequired,
  NoCategory,
  PrivateRoute,
  ResourceWasNotFound,
} from '@utils/httpError/errTypes'
import { requiredFieldsMiddleware } from '@utils/httpError'

import bearerAuth from '@middlewares/bearerAuth'

import { NextFunction, Request, Response, Router } from 'express'
import _ from 'express-async-handler'
import { ObjectId } from 'mongodb'
import { SchemaCategoryIn } from 'types/dist/ts/schema'
import Category from '@models/Category'
import Log from '@models/Log'
import of from '@utils/omitFalsy'

const router = Router()

/**
 *   @desc      get all logs
 *   @route     GET /api/v__/category
 *   @response  CategoryDoc[]
 *   @access    Private
 */
async function find(req: Request, res: Response, next: NextFunction) {
  if (!req.user) throw PrivateRoute()

  const categories = await Category.find({
    createdBy: new ObjectId(req.user._id),
  })

  res.json({ data: categories.map(e => e.doc()) })
}

/**
 *   @desc      add one log
 *   @route     POST /api/v__/category
 *   @body      category_create
 *   @response  CategoryDoc
 *   @access    Private
 */
async function create(req: Request, res: Response, next: NextFunction) {
  if (!req.user) throw PrivateRoute()
  req.user._id

  const { title, color, icon } = of(req.body) as SchemaCategoryIn

  requiredFieldsMiddleware({ title })

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
const isIdHex = (str: unknown) =>
  typeof str === 'string' && str.length === 24 && str.match(/(?![0-9a-fA-F])/g)
async function findCategory(req: Request, res: Response, next: NextFunction) {
  if (!req.user) throw PrivateRoute()

  if (!req.params.id || !isIdHex(req.params.id)) {
    throw FieldsRequired(['_id'])
  }

  const found = await Category.findOne({
    createdBy: new ObjectId(req.user._id),
    _id: new ObjectId(req.params.id),
  })

  if (found) {
    req.category = found
    next()
  } else {
    throw ResourceWasNotFound()
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
  if (!req.category) throw NoCategory()

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
  if (!req.category) throw NoCategory()
  if (!req.user) throw PrivateRoute()

  const logs = await Log.find({
    category: req.category._id,
    createdBy: req.user._id,
  })

  res.json({
    data: logs.map(e => e.doc()),
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
  if (!req.category) throw NoCategory()

  const { title, color, icon } = of(req.body) as Partial<SchemaCategoryIn>

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
  if (!req.category) throw NoCategory()

  const deleted = await Category.deleteOne({ _id: req.category._id })

  if (!deleted) throw FailedToDelete()
  else res.json({ data: null })
}

router.route('/').get(bearerAuth, _(find))
router.route('/').post(bearerAuth, _(create))
router.route('/:id').get(bearerAuth, _(findCategory), _(findOne))
router.route('/:id').put(bearerAuth, _(findCategory), _(update))
router.route('/:id').delete(bearerAuth, _(findCategory), _(delete_))
router.route('/:id/logs').get(bearerAuth, _(findCategory), _(findAllLogs))

export default router
