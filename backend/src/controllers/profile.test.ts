import '../../tests/helpers/initJest'
import { app } from "../server"
import request from 'supertest'
import { FieldsRequired, TokenFailed } from "@httpErrors/errTypes"
import { ProfileShape } from '../../tests/helpers/shapes'
import db_conn, { disconnect } from '@config/db-conn'
import mongoose from 'mongoose'
import { IProfile } from '@models/User'
import { clone } from 'lodash'

beforeAll(() => db_conn())
afterAll(() => disconnect())

describe('profile', () => {
  jest.setTimeout(5000)
  var user: ReturnType<IProfile['doc']>

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/v1/auth/local/register')
      .set('Authorization', 'Basic ' + Buffer.from(
        ['e1profile@example.com', 'password']
          .join(':')).toString('base64'))
      .send()

    if (!res?.body?.data || !res?.body?.data.token) {
      throw new Error('new user failed to be created')
    }

    user = res.body.data
  })

  afterAll(() => {
    const dbName = process.env.MONGO_STRING && new URL(process.env.MONGO_STRING).pathname.split('/')[2]
    const db = mongoose.connection.getClient().db(dbName)
    return Promise.all([
      db.dropCollection('users'),
    ])
  })

  describe('/profile/status', () => {
    const req = () => request(app)
      .get('/api/v1/profile/status')
    const shape = ProfileShape

    test('2xx', async () => {
      const res = await req()
        .send({ email: "e@g.com" })

      expect(res.body.data).toEqual([])

      await request(app)
        .post('/api/v1/auth/local/register')
        .set('Authorization', 'Basic ZUBnLmNvbTpwYXNzd29yZA==')
        .send()

      const res2 = await req()
        .send({ email: "e@g.com" })

      expect(res2.body.data).toEqual(['local'])
    })

    test('400', async () => {
      const res = await req()

      const expectedError = FieldsRequired(['email'])

      expect(res.body.error).toMatchHttpError(expectedError)
      expect(res.statusCode).toBe(expectedError.status)
    })
  })


  describe('/profile get', () => {
    const req = () => request(app)
      .get('/api/v1/profile')
    const shape = ProfileShape

    test('401', async () => {
      const res = await req().send()

      const expectedError = TokenFailed('NoTokenWasProvided')
      // other more complete token test can be found at `/src/controllers/bearerAuth.test.ts`

      expect(res.body.error).toMatchHttpError(expectedError)
      expect(res.status).toEqual(401)
    })

    test('2xx', async () => {
      const res = await req()
        .set('Authorization', 'Bearer ' + user.token)
        .send()

      expect(res.statusCode).toEqual(200)
      expect(res.body.data).toBeInTheShapeOf(Null(shape, [], ['picture']))
    })
  })


  describe('/profile put', () => {
    const req = () => request(app)
      .put('/api/v1/profile')
    const shape = ProfileShape

    test('401', async () => {
      const res = await req().send()

      const expectedError = TokenFailed('NoTokenWasProvided')
      // other more complete token test can be found at `/src/controllers/bearerAuth.test.ts`

      expect(res.body.error).toMatchHttpError(expectedError)
      expect(res.status).toEqual(401)
    })

    test('2xx', async () => {
      const res = await req()
        .set('Authorization', 'Bearer ' + user.token)
        .send()

      expect(res.statusCode).toEqual(200)
      expect(res.body.data).toBeInTheShapeOf(Null(shape, ['picture']))
    })

    test('2xx: all fields', async () => {
      const res = await req()
        .set('Authorization', 'Bearer ' + user.token)
        .send({
          displayName: 'newDisplayName',
          picture: 'newPicture'
        })

      expect(res.statusCode).toEqual(200)
      expect(res.body.data).toBeInTheShapeOf(shape)
      expect(res.body.data?.displayName).toEqual('newDisplayName')
      expect(res.body.data?.picture).toEqual('newPicture')
    })
  })


  describe('/profile/password put', () => {
    const req = () => request(app)
      .put('/api/v1/profile/password')
    const shape = ProfileShape

    test('401', async () => {
      const res = await req().send()

      const expectedError = TokenFailed('NoTokenWasProvided')
      // other more complete token test can be found at `/src/controllers/bearerAuth.test.ts`

      expect(res.body.error).toMatchHttpError(expectedError)
      expect(res.status).toEqual(401)
    })

    test('400: local user', async () => {
      const res = await req()
        .set('Authorization', 'Bearer ' + user.token)
        .send()

      const expectedError = FieldsRequired(['oldPassword', 'newPassword'])

      expect(res.statusCode).toEqual(400)
      expect(res.body.error).toMatchHttpError(expectedError)
    })

    // test.todo('400: non-local user'/**, async () => {
    //   const res = await req()
    //     .set('Authorization', 'Bearer ' + user.token)
    //     .send()

    //   const expectedError = FieldsRequired(['newPassword'])

    //   expect(res.statusCode).toEqual(400)
    //   expect(res.body.error).toMatchHttpError(expectedError)
    // } */)

    test('2xx', async () => {
      const res = await req()
        .set('Authorization', 'Bearer ' + user.token)
        .send({ oldPassword: 'password', newPassword: 'newPass' })

      expect(res.statusCode).toEqual(200)

      await request(app)
        .post('/api/v1/auth/local/login')
        .set('Authorization', 'Basic ' + Buffer.from(
          ['e1profile@example.com', 'password']
            .join(':')).toString('base64'))
        .expect(401)

      await request(app)
        .post('/api/v1/auth/local/login')
        .set('Authorization', 'Basic ' + Buffer.from(
          ['e1profile@example.com', 'newPass']
            .join(':')).toString('base64'))
        .expect(200)

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