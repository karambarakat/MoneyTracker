import '../../tests/helpers/initJest'
import { app } from '../server'
import request from 'supertest'
import { TokenFailed } from '@utils/httpError/errTypes'
import { ProfileShape } from '../../tests/helpers/shapes'
import db_conn, { disconnect } from '@config/db-conn'
import mongoose from 'mongoose'
import { IProfile } from '@models/User'
import { Jwt } from 'types/dist/api'
import jwt from 'jsonwebtoken'

const jwtParse = (token: string) => {
  try {
    return JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    ) as Jwt
  } catch {
    return undefined
  }
}

const jwtGen = (payload: Jwt, secret?: string) => {
  return jwt.sign(payload, secret || (process.env.JWT_SECRET as string), {
    algorithm: 'HS256',
  })
}

beforeAll(() => db_conn())
afterAll(() => disconnect())

describe('bearer token', () => {
  jest.setTimeout(5000)

  let user: ReturnType<IProfile['doc']>
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/v1/auth/local/register')
      .set(
        'Authorization',
        'Basic ' +
          Buffer.from(['e1@example.com', 'password'].join(':')).toString(
            'base64',
          ),
      )
      .send()

    if (!res?.body?.data || !res?.body?.data.token) {
      throw new Error('new user failed to be created')
    }

    user = res.body.data
  })

  afterAll(() => {
    const dbName =
      process.env.MONGO_STRING &&
      new URL(process.env.MONGO_STRING).pathname.split('/')[2]
    const db = mongoose.connection.getClient().db(dbName)
    return Promise.all([db.dropCollection('users')])
  })

  const req = () => request(app).get('/api/v1/profile')
  const shape = ProfileShape

  test('pass', async () => {
    const res = await req()
      .set('Authorization', 'Bearer ' + user.token)
      .send()

    expect(res.body.data).toBeDefined()
  })

  test('NoTokenWasProvided', async () => {
    const res = await req().send()

    const expectedError = TokenFailed('NoTokenWasProvided')

    expect(res.body.error).toMatchHttpError(expectedError)
  })

  test('TokenExpiredError', async () => {
    const token = jwtParse(user.token) as Jwt
    const res = await req()
      .set(
        'Authorization',
        'Bearer ' + jwtGen({ ...token, exp: new Date().getUTCSeconds() - 10 }),
      )
      .send()

    const expectedError = TokenFailed('TokenExpiredError', ' ')

    expect(res.body.error).toMatchHttpError(expectedError)
  })

  test('JsonWebTokenError', async () => {
    const res = await req()
      .set('Authorization', 'Bearer sabotage' + user.token)
      .send()

    const expectedError = TokenFailed('JsonWebTokenError')

    expect(res.body.error).toMatchHttpError(expectedError)
  })

  test('invalid secret', async () => {
    const token = jwtParse(user.token) as Jwt
    const res = await req()
      .set('Authorization', 'Bearer ' + jwtGen(token, 'random secrets'))
      .send()

    const expectedError = TokenFailed('JsonWebTokenError')

    expect(res.body.error).toMatchHttpError(expectedError)
  })
})
