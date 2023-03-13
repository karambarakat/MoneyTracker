import '../../tests/helpers/initJest'
import { app } from '../server'
import request from 'supertest'
import { FieldsRequired, ResourceWasNotFound, TokenFailed } from '@utils/httpError/errTypes'
import { CatShape } from '../../tests/helpers/shapes'
import db_conn, { disconnect } from '@config/db-conn'
import mongoose from 'mongoose'
import { clone } from 'lodash'
import { IProfile } from '@models/User'
import { ILog } from '@models/Log'

beforeAll(() => db_conn())
afterAll(() => disconnect())

describe('category', () => {
  jest.setTimeout(5000)

  // @ts-ignore
  const data: {
    first: ReturnType<IProfile['doc']>,
    second: ReturnType<IProfile['doc']>,
    categories: ReturnType<ILog['doc']>[]
  } = { categories: [] }

  beforeAll(async () => {
    data.first = (await request(app)
      .post('/api/v1/auth/local/register')
      .set('Authorization', 'Basic ' + Buffer.from(
        ['e1cat@example.com', 'password']
          .join(':')).toString('base64'))
      .send()).body.data

    data.second = (await request(app)
      .post('/api/v1/auth/local/register')
      .set('Authorization', 'Basic ' + Buffer.from(
        ['e2cat@example.com', 'password']
          .join(':')).toString('base64'))
      .send()).body.data

    if (
      !data.first?._id ||
      !data.second?._id
    ) {
      console.error('failed to fetch data:', data)
      throw new Error('failed to fetch data:')
    }
  })

  afterAll(() => {
    const dbName = process.env.MONGO_STRING && new URL(process.env.MONGO_STRING).pathname.split('/')[2]
    const db = mongoose.connection.getClient().db(dbName)
    return Promise.all([
      db.dropCollection('users'),
      db.dropCollection('categories'),
    ])
  })

  describe('/category get', () => {
    const req = () => request(app)
      .get('/api/v1/category/')
    const shape = CatShape
    test('401', async () => {
      const res = await req()
        .send({})

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
      const cat = await request(app)
        .post('/api/v1/category')
        .set('Authorization', 'Bearer ' + data.first.token)
        .send({
          title: 'new entry',
          color: '#eee',
          icon: 'SomeIcon'
        })

      if (!cat.body.data?._id) throw new Error('couldn\'t fetch category')

      data.categories.push(cat.body.data)

      const res = await req()
        .set('Authorization', 'Bearer ' + data.first.token)
        .send()

      expect(res.body.data).toBeInTheShapeOf([shape])
    })
  })

  describe('/category post', () => {
    const req = () => request(app)
      .post('/api/v1/category')
    const shape = CatShape

    test('401', async () => {
      const res = await req()
        .send({})

      const expectedError = TokenFailed('NoTokenWasProvided')
      // other more complete token test can be found at `/src/controllers/TokenFailedbearerAuth.test.ts`

      expect(res.body.error).toMatchHttpError(expectedError)
      expect(res.statusCode).toBe(expectedError.status)
    })

    test('400', async () => {
      const res = await req()
        .set('Authorization', 'Bearer ' + data.first.token)

      expect(res.body.error).toMatchHttpError(FieldsRequired(['title']))
      expect(res.statusCode).toBe(400)
    })

    test('2xx: required', async () => {
      const res = await req()
        .set('Authorization', 'Bearer ' + data.first.token)
        .send({
          title: 'new entry',
        })

      expect(res.body.data).toBeInTheShapeOf(Null(shape, ['color', 'icon'],))
      expect(res.body.data?.title).toBe('new entry')
    })

    test('2xx: all', async () => {
      const res = await req()
        .set('Authorization', 'Bearer ' + data.first.token)
        .send({
          title: 'new entry',
          color: '#eee',
          icon: 'SomeIcon'
        })

      expect(res.body.data).toBeInTheShapeOf(shape)
      expect(res.body.data?.title).toBe('new entry')
      expect(res.body.data?.color).toBe('#eee')
      expect(res.body.data?.icon).toBe('SomeIcon')

      data.categories.push(res.body.data)
    })
  })

  describe('/category/:id get', () => {
    const req = (id: string) => request(app)
      .get('/api/v1/category/' + id)
    const shape = CatShape

    test('401', async () => {
      const res = await req('')
        .send({})

      const expectedError = TokenFailed('NoTokenWasProvided')
      // other more complete token test can be found at `/src/controllers/TokenFailedbearerAuth.test.ts`

      expect(res.body.error).toMatchHttpError(expectedError)
      expect(res.statusCode).toBe(401)
    })

    test('404', async () => {
      const res = await req('63f86fa47822eec8d37b8469')
        .set('Authorization', 'Bearer ' + data.first.token)

      expect(res.body.error).toMatchHttpError(ResourceWasNotFound())
      expect(res.statusCode).toBe(404)
    })

    test('400', async () => {
      const res = await req('invalid')
        .set('Authorization', 'Bearer ' + data.first.token)

      expect(res.body.error).toMatchHttpError(FieldsRequired(['_id']))
      expect(res.statusCode).toBe(400)
    })

    test('2xx', async () => {
      const res = await req(data.categories[1]._id)
        .set('Authorization', 'Bearer ' + data.first.token)
        .send()

      expect(res.body.data).toBeInTheShapeOf(shape)
    })
  })

  describe('/category/:id put', () => {
    const req = (id: string) => request(app)
      .put('/api/v1/category/' + id)
    const shape = CatShape

    test('401', async () => {
      const res = await req('63f86fa47822eec8d37b8469')
        .send({})

      const expectedError = TokenFailed('NoTokenWasProvided')
      // other more complete token test can be found at `/src/controllers/TokenFailedbearerAuth.test.ts`
      expect(res.body.error).toMatchHttpError(expectedError)
      expect(res.statusCode).toBe(401)
    })

    test('404', async () => {
      const res = await req('63f86fa47822eec8d37b8469')
        .set('Authorization', 'Bearer ' + data.first.token)

      expect(res.body.error).toMatchHttpError(ResourceWasNotFound())
      expect(res.statusCode).toBe(404)
    })

    test('400', async () => {
      const res = await req('invalid')
        .set('Authorization', 'Bearer ' + data.first.token)

      expect(res.body.error).toMatchHttpError(FieldsRequired(['_id']))
      expect(res.statusCode).toBe(400)
    })

    test('2xx: no change', async () => {
      const res = await req(data.categories[1]._id)
        .set('Authorization', 'Bearer ' + data.first.token)
        .send()

      expect(res.body.data).toBeInTheShapeOf(shape)
      expect(res.body.data).toLeastEqual(data.categories[1])
    })



    test('2xx', async () => {
      const res = await req(data.categories[1]._id)
        .set('Authorization', 'Bearer ' + data.first.token)
        .send({ title: 'put request', color: 'putRequest', icon: 'put request' })

      expect(res.body.data).toBeInTheShapeOf(shape)
      expect(res.body.data).toLeastEqual({ title: 'put request', color: 'putRequest', icon: 'put request' })
    })
  })

  describe('/category/:id delete', () => {
    const req = (id: string) => request(app)
      .delete('/api/v1/category/' + id)
    const shape = CatShape

    test('401', async () => {
      const res = await req('63f86fa47822eec8d37b8469')
        .send({})

      const expectedError = TokenFailed('NoTokenWasProvided')
      // other more complete token test can be found at `/src/controllers/TokenFailedbearerAuth.test.ts`

      expect(res.body.error).toMatchHttpError(expectedError)
      expect(res.statusCode).toBe(401)
    })

    test('404', async () => {
      const res = await req('63f86fa47822eec8d37b8469')
        .set('Authorization', 'Bearer ' + data.first.token)

      expect(res.body.error).toMatchHttpError(ResourceWasNotFound())
      expect(res.statusCode).toBe(404)
    })

    test('2xx', async () => {
      const res = await req(data.categories[1]._id)
        .set('Authorization', 'Bearer ' + data.first.token)
        .send()

      expect(res.body.data).toBeNull()

      await request(app)
        .get('/api/v1/category/' + data.categories[1]._id)
        .set('Authorization', 'Bearer ' + data.first.token)
        .send()
        .expect(404)

    })
  })
})

function Null<S>(Shape: S, nullify?: (keyof S)[], exclude?: (keyof S)[]) {
  const newShape = clone(Shape) as ({
    [K in keyof S]?: S[K] | null
  })
  for (const i of nullify || []) {
    newShape[i] = null
  }
  for (const i of exclude || []) {
    delete newShape[i]
  }
  return newShape
}