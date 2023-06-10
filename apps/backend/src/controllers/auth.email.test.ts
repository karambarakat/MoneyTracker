import '../../tests/helpers/initJest'
import { app } from '../server'
import request from 'supertest'
import {
  BadBasicToken,
  EmailOrPasswordIncorrect,
  UserAlreadyExist,
  ValidationError,
} from '@utils/httpError/errTypes'
import { ProfileShape } from '../../tests/helpers/shapes'
import db_conn, { disconnect } from '@config/db-conn'
import mongoose from 'mongoose'
import { clone } from 'lodash'

beforeAll(() => db_conn())
afterAll(() => disconnect())

describe('auth email', () => {
  jest.setTimeout(5000)

  afterAll(async () => {
    const dbName =
      process.env.MONGO_STRING &&
      new URL(process.env.MONGO_STRING).pathname.split('/')[2]
    const db = mongoose.connection.getClient().db(dbName)
    await Promise.all([db.dropCollection('users')])
  })

  describe('/auth/local/register', () => {
    const req = () => request(app).post('/api/v1/auth/local/register')
    const shape = ProfileShape
    test('security > BasicToken', async () => {
      const res = await req().send({})

      const expectedError = BadBasicToken()

      expect(res.body.error).toMatchHttpError(expectedError)
      expect(res.statusCode).toBe(expectedError.status)
    })

    test('2xx: optional fields omitted', async () => {
      const token =
        'Basic ' +
        Buffer.from(['auth@example.com', 'password'].join(':')).toString(
          'base64',
        )

      const res = await req().set('Authorization', token).send()

      expect(res.body.data).toBeInTheShapeOf(Null(shape, [], ['picture']))
      expect(res.body.data).toLeastEqual({
        email: 'auth@example.com',
      })
    })

    test('2xx: all fields', async () => {
      const token =
        'Basic ' +
        Buffer.from(['e2@example.com', 'password'].join(':')).toString('base64')

      const res = await req()
        .set('Authorization', token)
        .send({ displayName: 'Karam' })

      expect(res.body.data).toBeInTheShapeOf(Null(shape, [], ['picture']))
      expect(res.body.data).toLeastEqual({
        email: 'e2@example.com',
        displayName: 'Karam',
      })
    })

    test('2xx: type checks', async () => {
      const token =
        'Basic ' +
        Buffer.from(['e3@example.com', 'password'].join(':')).toString('base64')

      const res = await req()
        .set('Authorization', token)
        .send({ displayName: 1234 })

      expect(res.body.data).toBeInTheShapeOf(Null(shape, [], ['picture']))
      expect(res.body.data).toLeastEqual({
        email: 'e3@example.com',
        displayName: '1234',
      })
    })

    test('400', async () => {
      const token =
        'Basic ' +
        Buffer.from(['invalidEmail', 'password'].join(':')).toString('base64')

      const res = await req().set('Authorization', token).send()

      const expectedError = ValidationError({
        msg: '',
        errors: { email: '' },
      })

      expect(res.body.error).toMatchHttpError(expectedError)
      expect(res.statusCode).toBe(expectedError.status)
    })

    test('409', async () => {
      const token =
        'Basic ' +
        Buffer.from(['auth@example.com', 'password'].join(':')).toString(
          'base64',
        )

      await req().set('Authorization', token).send()

      const res = await req().set('Authorization', token).send()

      expect(res.body.error).toMatchHttpError(UserAlreadyExist())
    })
  })

  describe('/auth/local/login', () => {
    const req = () => request(app).post('/api/v1/auth/local/login')
    const shape = ProfileShape
    test('security > BasicToken', async () => {
      const res = await req().send({})

      const expectedError = BadBasicToken()

      expect(res.body.error).toMatchHttpError(expectedError)
      expect(res.statusCode).toBe(expectedError.status)
    })

    test('2xx', async () => {
      const token =
        'Basic ' +
        Buffer.from(['auth@example.com', 'password'].join(':')).toString(
          'base64',
        )

      const res = await req().set('Authorization', token)

      expect(res.body.data).toBeInTheShapeOf(Null(shape, [], ['picture']))
    })

    test('401', async () => {
      const token =
        'Basic ' +
        Buffer.from(['auth@example.com', 'WrongPassword'].join(':')).toString(
          'base64',
        )

      const res = await req().set('Authorization', token)

      const expectedError = EmailOrPasswordIncorrect()

      expect(res.body.error).toMatchHttpError(expectedError)
      expect(res.statusCode).toBe(expectedError.status)
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
