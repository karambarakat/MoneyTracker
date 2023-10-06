import { rest } from 'msw'

export const rejectGraphql = rest.all(
  'http://localhost:8080/graphql',
  (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ error: 'error' }))
  },
)
