import { ResourceWasNotFound } from '@error/Errors'
import HttpError, { HttpQuickError } from '@error/HttpError'
import auth from '@middlewares/auth'
import Category, { CategoryInterface } from '@models/Category'
import { UserInterface } from '@models/User'

import { NextFunction, Request, Response, Router } from 'express'
import _ from 'express-async-handler'
import { ObjectId } from 'mongodb'

const router = Router()

/**
 *   @desc    get all logs
 *   @route   GET /api/v__/category
 *   @access  Private
 */
async function find(req: Request, res: Response, next: NextFunction) {
  const reqUser = req.user as UserInterface

  const categories = await Category.find({
    createdBy: new ObjectId(reqUser._id),
  })

  res.json({ data: categories })
}

/**
 *   @desc    add one log
 *   @route   POST /api/v__/category
 *   @access  Private
 */
async function create(req: Request, res: Response, next: NextFunction) {
  const reqUser = req.user as UserInterface

  const newData: CategoryInterface = {
    title: req.body.title,
    color: req.body.color,
    icon: req.body.icon,
    createdBy: reqUser._id,
  }

  const category = await Category.create(newData)

  res.status(201).json({ data: category })
}

/**
 *   @desc    get log by its id
 *   @route   GET /api/v__/category/:id
 *   @access  Private
 */
async function findOne(req: Request, res: Response, next: NextFunction) {
  res.json({
    data:
      // @ts-ignore
      req.category,
  })
}

/**
 *   @desc    get log by its id
 *   @route   GET /api/v__/category/:id/logs
 *   @access  Private
 */
async function findAllLogs(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const rc = req.category

  const category = await Category.findOne({ _id: rc._id }).populate('logs')

  res.json({
    data: category,
  })
}

/**
 *   @desc    update log by its id
 *   @route   PUT /api/v__/category/:id
 *   @access  Private
 */
async function update(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const category = req.category

  const newData: CategoryInterface = {
    title: req.body.title,
    color: req.body.color,
    icon: req.body.icon,
  }

  await Category.findOneAndUpdate(
    {
      createdBy: new ObjectId(category.createdBy),
      _id: new ObjectId(category._id),
    },
    newData,
    { runValidators: true }
  )

  const updatedCategory = await Category.findOne({
    createdBy: new ObjectId(category.createdBy),
    _id: new ObjectId(category._id),
  })

  res.json({ data: updatedCategory })
}
/**
 *   @desc    delete log by its id
 *   @route   DELETE /api/v__/category/:id
 *   @access  Private
 */
async function deleteFN(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const category = req.category

  const deleted = await Category.findByIdAndDelete(category._id)

  if (!deleted) HttpQuickError(400, 'failed to delete')
  else res.json({ data: deleted })
}

router.route('/').get(auth, _(find)).post(auth, _(create))
router
  .route('/:id')
  .get(auth, _(findCategory), _(findOne))
  .put(auth, _(findCategory), _(update))
  .delete(auth, _(findCategory), _(deleteFN))
router.route('/:id/logs').get(auth, _(findCategory), _(findAllLogs))

/**
 * helper functions
 */
async function findCategory(req: Request, res: Response, next: NextFunction) {
  const categoryId = req.params.id
  const reqUser = req.user as UserInterface

  const foundCategory = await Category.findOne({
    createdBy: new ObjectId(reqUser._id),
    _id: new ObjectId(categoryId),
  })
  if (foundCategory) {
    // @ts-ignore
    req.category = foundCategory
    next()
  } else {
    HttpError(ResourceWasNotFound)
  }
}

export default router
