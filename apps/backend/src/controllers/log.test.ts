import '../../tests/helpers/initJest'
import { app } from '../server'
import request from 'supertest'
import {
  FieldsRequired,
  ResourceWasNotFound,
  TokenFailed
} from '@utils/httpError/errTypes'
import { LogShape } from '../../tests/helpers/shapes'
import db_conn, { disconnect } from '@config/db-conn'
import mongoose from 'mongoose'
import { clone } from 'lodash'
import { IProfile } from '@models/User'
import { ICategory } from '@models/Category'
import { ILog } from '@models/Log'

beforeAll(() => db_conn())
afterAll(() => disconnect())

describe('log', () => {
  jest.setTimeout(5000)
  // @ts-ignore
  const data: {
    first: ReturnType<IProfile['doc']>
    second: ReturnType<IProfile['doc']>
    category: ReturnType<ICategory['doc']>
    logs: ReturnType<ILog['doc']>[]
  } = { logs: [] }

  beforeAll(async () => {
    data.first = (
      await request(app)
        .post('/api/v1/auth/local/register')
        .set(
          'Authorization',
          'Basic ' +
            Buffer.from(['e1log@example.com', 'password'].join(':')).toString(
              'base64'
            )
        )
        .send()
    ).body.data

    data.second = (
      await request(app)
        .post('/api/v1/auth/local/register')
        .set(
          'Authorization',
          'Basic ' +
            Buffer.from(['e2log@example.com', 'password'].join(':')).toString(
              'base64'
            )
        )
        .send()
    ).body.data

    data.category = (
      await request(app)
        .post('/api/v1/category')
        .set('Authorization', 'Bearer ' + data.first.token)
        .send({
          title: 'new Entery',
          color: 'sdf',
          icon: 'sdf'
        })
    ).body.data

    if (!data.first?._id || !data.second?._id || !data.category?._id) {
      console.error('failed to fetch data:', data)
      throw new Error('failed to fetch data:')
    }
  })

  afterAll(() => {
    const dbName =
      process.env.MONGO_STRING &&
      new URL(process.env.MONGO_STRING).pathname.split('/')[2]
    const db = mongoose.connection.getClient().db(dbName)
    return Promise.all([
      db.dropCollection('users'),
      db.dropCollection('categories'),
      db.dropCollection('logs')
    ])
  })

  describe('/log get', () => {
    const req = () => request(app).get('/api/v1/log/')
    const shape = LogShape
    test('401', async () => {
      const res = await req().send({})

      const expectedError = TokenFailed('NoTokenWasProvided')

      expect(res.body.error).toMatchHttpError(expectedError)
      expect(res.statusCode).toBe(expectedError.status)
    })

    test('2xx: empty', async () => {
      const res = await req()
        .set('Authorization', 'Bearer ' + data.first.token)
        .send()

      expect(res.body.data).toBeInTheShapeOf([])
    })

    test('2xx: full', async () => {
      const log = await request(app)
        .post('/api/v1/log')
        .set('Authorization', 'Bearer ' + data.first.token)
        .send({
          title: 'new entry',
          amount: 12,
          category: data.category._id,
          note: 'some notes'
        })

      if (!log.body.data?._id) throw new Error("couldn't fetch category")

      data.logs.push(log.body.data)

      const res = await req()
        .set('Authorization', 'Bearer ' + data.first.token)
        .send()

      expect(res.body.data).toBeInTheShapeOf([shape])
    })
  })

  describe('/log post', () => {
    const req = () => request(app).post('/api/v1/log')
    const shape = LogShape

    test('401', async () => {
      const res = await req().send({})

      const expectedError = TokenFailed('NoTokenWasProvided')
      // other more complete token test can be found at `/src/controllers/TokenFailedbearerAuth.test.ts`

      expect(res.body.error).toMatchHttpError(expectedError)
      expect(res.statusCode).toBe(expectedError.status)
    })

    test('400', async () => {
      const res = await req().set('Authorization', 'Bearer ' + data.first.token)

      expect(res.body.error).toMatchHttpError(
        FieldsRequired(['title', 'amount'])
      )
      expect(res.statusCode).toBe(400)
    })

    test('2xx: required', async () => {
      const res = await req()
        .set('Authorization', 'Bearer ' + data.first.token)
        .send({
          title: 'new entry',
          amount: 12
        })

      expect(res.body.data).toBeInTheShapeOf(Null(shape, ['category', 'note']))
      expect(res.body.data?.title).toBe('new entry')
      expect(res.body.data?.amount).toBe(12)
    })

    test('2xx: all', async () => {
      const res = await req()
        .set('Authorization', 'Bearer ' + data.first.token)
        .send({
          title: 'new entry',
          amount: 12,
          note: 'notes',
          category: data.category._id
        })

      expect(res.body.data).toBeInTheShapeOf(shape)
      expect(res.body.data?.title).toBe('new entry')
      expect(res.body.data?.amount).toBe(12)
      expect(res.body.data?.note).toBe('notes')
      expect(res.body.data?.category?._id).toBe(data.category._id)

      data.logs.push(res.body.data)
    })
  })

  describe('/log/:id get', () => {
    const req = (id: string) => request(app).get('/api/v1/log/' + id)
    const shape = LogShape

    test('401', async () => {
      const res = await req('').send({})

      const expectedError = TokenFailed('NoTokenWasProvided')
      // other more complete token test can be found at `/src/controllers/TokenFailedbearerAuth.test.ts`

      expect(res.body.error).toMatchHttpError(expectedError)
      expect(res.statusCode).toBe(401)
    })

    test('404', async () => {
      const res = await req('63f86fa47822eec8d37b8469').set(
        'Authorization',
        'Bearer ' + data.first.token
      )

      expect(res.body.error).toMatchHttpError(ResourceWasNotFound())
      expect(res.statusCode).toBe(404)
    })

    test('400', async () => {
      const res = await req('invalid').set(
        'Authorization',
        'Bearer ' + data.first.token
      )

      expect(res.body.error).toMatchHttpError(FieldsRequired(['_id']))
      expect(res.statusCode).toBe(400)
    })

    test('2xx', async () => {
      const res = await req(data.logs[1]._id)
        .set('Authorization', 'Bearer ' + data.first.token)
        .send()

      expect(res.body.data).toBeInTheShapeOf(shape)
    })
  })

  describe('/log/:id put', () => {
    const req = (id: string) => request(app).put('/api/v1/log/' + id)
    const shape = LogShape

    test('401', async () => {
      const res = await req('63f86fa47822eec8d37b8469').send({})

      const expectedError = TokenFailed('NoTokenWasProvided')
      // other more complete token test can be found at `/src/controllers/TokenFailedbearerAuth.test.ts`
      expect(res.body.error).toMatchHttpError(expectedError)
      expect(res.statusCode).toBe(401)
    })

    test('404', async () => {
      const res = await req('63f86fa47822eec8d37b8469').set(
        'Authorization',
        'Bearer ' + data.first.token
      )

      expect(res.body.error).toMatchHttpError(ResourceWasNotFound())
      expect(res.statusCode).toBe(404)
    })

    test('400', async () => {
      const res = await req('invalid').set(
        'Authorization',
        'Bearer ' + data.first.token
      )

      expect(res.body.error).toMatchHttpError(FieldsRequired(['_id']))
      expect(res.statusCode).toBe(400)
    })

    test('2xx: no change', async () => {
      const res = await req(data.logs[1]._id)
        .set('Authorization', 'Bearer ' + data.first.token)
        .send()

      expect(res.body.data).toBeInTheShapeOf(shape)
      expect(res.body.data).toLeastEqual(data.logs[1])
    })

    test('2xx', async () => {
      const res = await req(data.logs[1]._id)
        .set('Authorization', 'Bearer ' + data.first.token)
        .send({
          title: 'put request',
          amount: 99,
          note: 'put request'
        })

      expect(res.body.data).toBeInTheShapeOf(shape)
      expect(res.body.data).toLeastEqual({
        title: 'put request',
        amount: 99,
        note: 'put request'
      })
    })
  })

  describe('/log/:id delete', () => {
    const req = (id: string) => request(app).delete('/api/v1/log/' + id)
    const shape = LogShape

    test('401', async () => {
      const res = await req('63f86fa47822eec8d37b8469').send({})

      const expectedError = TokenFailed('NoTokenWasProvided')
      // other more complete token test can be found at `/src/controllers/TokenFailedbearerAuth.test.ts`

      expect(res.body.error).toMatchHttpError(expectedError)
      expect(res.statusCode).toBe(401)
    })

    test('404', async () => {
      const res = await req('63f86fa47822eec8d37b8469').set(
        'Authorization',
        'Bearer ' + data.first.token
      )

      expect(res.body.error).toMatchHttpError(ResourceWasNotFound())
      expect(res.statusCode).toBe(404)
    })

    test('2xx', async () => {
      const res = await req(data.logs[1]._id)
        .set('Authorization', 'Bearer ' + data.first.token)
        .send()

      expect(res.body.data).toBeNull()

      await request(app)
        .get('/api/v1/log/' + data.logs[1]._id)
        .set('Authorization', 'Bearer ' + data.first.token)
        .send()
        .expect(404)
    })
  })
})

function Null<S>(Shape: S, nullify?: (keyof S)[], exclude?: (keyof S)[]) {
  const newShape = clone(Shape) as {
    [K in keyof S]?: S[K] | null
  }
  for (const i of nullify || []) {
    newShape[i] = null
  }
  for (const i of exclude || []) {
    delete newShape[i]
  }
  return newShape
}
