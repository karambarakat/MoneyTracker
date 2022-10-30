// import fetch from 'node-fetch'
import connect, { disconnect } from '@config/db-conn'
import { generateToken } from '@utils/tokens'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from './../app'

const user1 = {
  userName: 'new user name',
  email: 'k99.barakat@gmail.com',
  providers: ['google'],
  createdAt: {
    $date: {
      $numberLong: '1660114728680',
    },
  },
  updatedAt: {
    $date: {
      $numberLong: '1660130801246',
    },
  },
  __v: 1,
  googleInfo: {
    accessToken:
      'ya29.A0AVA9y1vp6Owx7tj20SbUOhiGqAGY2A-uISV989pYrq3Vo06fzCRNAhHRsEN3G8NODFQ0X1mFebcxvIok4qni9hl67OzOPkjk31x7jmAPkaVu2RdY47gB6DhifIvAw5OyzirLA-N8nwRl9tPwgGglcbHP6405aCgYKATASATASFQE65dr807cdnKYCPCvEAnjcCrloaw0163',
    refreshToken: null,
    json: {
      sub: '112306898574216446214',
      name: 'Karam Barakat',
      given_name: 'Karam',
      family_name: 'Barakat',
      picture:
        'https://lh3.googleusercontent.com/a/AItbvmkBIO2dZgGZbu6dvu24423J_NYyO2ajAnQL9dsp=s96-c',
      email: 'k99.barakat@gmail.com',
      email_verified: true,
      locale: 'en',
    },
  },
  picture: 'google.com',
}
var user1Token = ''

const user2 = {
  userName: 'karam barakat',
  email: 'karam.barakat.99@gmail.com',
  providers: ['google', 'local'],
  googleInfo: {
    accessToken:
      'ya29.A0AVA9y1u6El5Y2NIR-LyqUkwlNRO8hJdwxsm6fqVd-G0Hcu4sZ-CFYrKilf45i5TEyRqAh1ou0hm6N3rBWTjAU9mDVGA5gLi_22KxcYRzA0cZBquiyyXLqHIHiuZbsd-53OBuD8sB_HJpguloDrnNtan3qoonaCgYKATASATASFQE65dr883hbkoO_o9fVLjR-PmRkBQ0163',
    json: {
      sub: '115676006631634204900',
      name: 'karam barakat',
      given_name: 'karam',
      family_name: 'barakat',
      picture:
        'https://lh3.googleusercontent.com/a-/AFdZucr6DhW103ingyV3zgAo5TvlVP1cF5QZKUTdfcyeZQ=s96-c',
      email: 'karam.barakat.99@gmail.com',
      email_verified: true,
      locale: 'en-GB',
    },
  },
  picture:
    'https://lh3.googleusercontent.com/a-/AFdZucr6DhW103ingyV3zgAo5TvlVP1cF5QZKUTdfcyeZQ=s96-c',
  createdAt: {
    $date: {
      $numberLong: '1660126129575',
    },
  },
  updatedAt: {
    $date: {
      $numberLong: '1660130988396',
    },
  },
  __v: 1,
  password:
    '19ebed30d245b6c3beddbf0f532ac9bace5e37d731eca5de406f2693c0caa34cd79d5e45b02b58b1812406434fe58b6c7680574b40c9218897f88b42925db823',
}
var user2Token = ''

describe('AUTH_EMAIL', () => {
  beforeAll((done) => {
    async function main() {
      await connect()
      await mongoose.connection.db.dropCollection('users')
      const user1Doc = await mongoose.connection.db
        .collection('users')
        .insertOne(user1)

      user1Token = generateToken(user1Doc.insertedId.toString(), user1.email)

      const user2Doc = await mongoose.connection.db
        .collection('users')
        .insertOne(user2)

      user2Token = generateToken(user2Doc.insertedId.toString(), user1.email)
    }
    main().then(() => done())
  })

  /**
   * @path : /auth/local/register
   */
  test('/profile/status : nobody', async function () {
    const res = await supertest(app).get('/api/v1/profile/status').send({})

    expect(res.status).toBe(400)
    expect(res.body.error.name).toBeDefined()
    expect(res.body.error.details.errors.email).toBeDefined()
  })

  test('/profile/status', async function () {
    const res = await supertest(app)
      .get('/api/v1/profile/status')
      .send({ email: user1.email })
    expect(res.body.data).toEqual(['google'])

    const res2 = await supertest(app)
      .get('/api/v1/profile/status')
      .send({ email: user2.email })
    expect(res2.body.data).toEqual(['google', 'local'])

    const res3 = await supertest(app)
      .get('/api/v1/profile/status')
      .send({ email: 'newEmail@gmail.com' })
    expect(res3.body.data).toEqual([])
  })

  // todo: to continue (check postman project)

  afterAll((done) => {
    disconnect().then(() => done())
  })
})
