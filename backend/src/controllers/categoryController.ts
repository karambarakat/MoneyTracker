import { ResourceWasNotFound } from '@httpErrors/errTypes'
import { throwHttpError, throwQuickHttpError } from '@httpErrors'

import auth from '@middlewares/auth'
import Category from '@models/Category'
import CategoryInterface from 'types/models/CategoryInterface'

import Log from '@models/Log'
import UserInterface from 'types/models/UserInterface'

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
 *   @access  Private, ifCategoryExist
 */
async function findOne(req: Request, res: Response, next: NextFunction) {
  res.json({
    data:
      // @ts-ignore
      req.category,
  })
}

/**
 *   @desc    get all logs that belong to specific category
 *   @route   GET /api/v__/category/:id/logs
 *   @access  Private, ifCategoryExist
 */
async function findAllLogs(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const reqCategory = req.category

  const logs = await Log.find({
    category: reqCategory._id,
    createdBy: reqCategory.createdBy,
  }).select('-category')

  res.json({
    data: { ...reqCategory._doc, logs },
  })
}

/**
 *   @desc    update log by its id
 *   @route   PUT /api/v__/category/:id
 *   @access  Private, ifCategoryExist
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
 *   @access  Private, ifCategoryExist
 */
async function delete_(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const category = req.category

  const deleted = await Category.deleteOne({ _id: category._id })

  if (!deleted) throwQuickHttpError(400, 'failed to delete')
  else res.json({ data: null })
}

router.route('/').get(auth, _(find)).post(auth, _(create))
router
  .route('/:id')
  .get(auth, _(findCategory), _(findOne))
  .put(auth, _(findCategory), _(update))
  .delete(auth, _(findCategory), _(delete_))
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
    throwHttpError(ResourceWasNotFound)
  }
}

export default router
