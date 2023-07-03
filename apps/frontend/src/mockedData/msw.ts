import { rest } from 'msw'
import { categories, logs, profile } from '.'

export const $ = import.meta.env.VITE_BACKEND_API

export const empty_data = [
  rest.all($ + '/category', (req, res, ctx) => {
    return res(ctx.json({ data: [] }))
  }),
  rest.get($ + '/log', (req, res, ctx) => {
    return res(ctx.json({ data: [] }))
  }),
]

export const categories_data = rest.all($ + '/category', (req, res, ctx) => {
  return res(ctx.json(categories))
})

export const category_data = rest.all($ + '/category/:id', (req, res, ctx) => {
  return res(
    ctx.json({ data: categories.data.find(e => e._id === req.params.id) }),
  )
})

export const logs_data = rest.get($ + '/log', (req, res, ctx) => {
  return res(ctx.json(logs))
})

export const logs_data_small = rest.get($ + '/log', (req, res, ctx) => {
  return res(ctx.json({ data: logs.data.slice(0, 3) }))
})

export const log_data = rest.get($ + '/log/:id', (req, res, ctx) => {
  return res(ctx.json({ data: logs.data.find(e => e._id === req.params.id) }))
})

export const profile_data = rest.get($ + '/profile', (req, res, ctx) => {
  return res(ctx.json(profile))
})
