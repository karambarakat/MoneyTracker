// import fetch from 'node-fetch'
import connect, { disconnect } from '@config/db-conn'
import log from '@utils/log'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from './../../src/app'

describe('USER', () => {
  beforeAll((done) => {
    async function main() {
      await connect()
      await mongoose.connection.db.dropCollection('users')
    }
    main().then(() => done())
  })

  var token: string

  test('/auth/local/register : no body', async function () {
    const res = await supertest(app)
      .post('/api/v1/auth/local/register')
      .send({})

    expect(res.status).toBe(400)
    expect(res.body.error.name).toBe('ValidationError')
    expect(res.body.error.details.errors.email.message).toBeDefined()
    expect(res.body.error.details.errors.password.message).toBeDefined()
  })

  test('/auth/local/register : invalid email', async function () {
    const res = await supertest(app).post('/api/v1/auth/local/register').send({
      email: 'karam@gmailcom',
      password: '123456',
    })

    expect(res.status).toBe(400)
    expect(res.body.error.name).toBe('ValidationError')
    expect(res.body.error.details.errors.email.message).toBeDefined()
  })

  test('/auth/local/register : valid', async function () {
    const res = await supertest(app).post('/api/v1/auth/local/register').send({
      email: 'karam@gmail.com',
      password: '123456',
    })

    expect(res.status).toBe(201)
    expect(res.body.data.userName).toBeDefined()
    expect(res.body.data.email).toBe('karam@gmail.com')
    expect(res.body.data.password).toBeUndefined()
    expect(res.body.data._id).toBeDefined()
    expect(res.body.data.createdAt).toBeDefined()
    expect(res.body.data.updatedAt).toBeDefined()
    expect(res.body.data.token).toBeDefined()
  })

  test('/auth/local/register : valid with username', async function () {
    const res = await supertest(app).post('/api/v1/auth/local/register').send({
      email: 'karam.99n@gmail.com',
      userName: 'karam',
      password: '123456',
    })

    expect(res.status).toBe(201)
    expect(res.body.data.email).toBe('karam.99n@gmail.com')
    expect(res.body.data.userName).toBe('karam')
    expect(res.body.data.password).toBeUndefined()
    expect(res.body.data._id).toBeDefined()
    expect(res.body.data.createdAt).toBeDefined()
    expect(res.body.data.updatedAt).toBeDefined()
    expect(res.body.data.token).toBeDefined()
  })

  test('/auth/local/register : user exist', async function () {
    const res = await supertest(app).post('/api/v1/auth/local/register').send({
      email: 'karam@gmail.com',
      password: '123456',
    })

    expect(res.status).toBe(400)
    expect(res.body.error.name).toBe('UserAlreadyExist')
  })

  test('/auth/local/login : valid', async function () {
    const res = await supertest(app).post('/api/v1/auth/local/login').send({
      email: 'karam@gmail.com',
      password: '123456',
    })

    expect(res.status).toBe(200)
    expect(res.body.data.userName).toBeDefined()
    expect(res.body.data.email).toBe('karam@gmail.com')
    expect(res.body.data.password).toBeUndefined()
    expect(res.body.data._id).toBeDefined()
    expect(res.body.data.createdAt).toBeDefined()
    expect(res.body.data.updatedAt).toBeDefined()
    expect(res.body.data.token).toBeDefined()
  })

  test('/auth/local/login :  failed', async function () {
    const res = await supertest(app).post('/api/v1/auth/local/login').send({
      email: 'karam@gmail.com',
      password: '1234567',
    })

    expect(res.status).toBe(401)
    expect(res.body.error.name).toBe('EmailOrPasswordIncorrect')
    expect(res.body.error.message).toBeDefined()
  })

  test('/profile : get current user info', async function () {
    const login = await supertest(app).post('/api/v1/auth/local/login').send({
      email: 'karam@gmail.com',
      password: '123456',
    })

    expect(login.status).toBe(200)

    token = login.body.data.token

    const res = await supertest(app)
      .get('/api/v1/profile')
      .set('Authorization', `Bearer ${token}`)

    expect(res.body.data.userName).toBeDefined()
    expect(res.body.data.email).toBe('karam@gmail.com')
    expect(res.body.data.password).toBeUndefined()
    expect(res.body.data._id).toBeDefined()
    expect(res.body.data.createdAt).toBeDefined()
    expect(res.body.data.updatedAt).toBeDefined()
    expect(res.body.data.token).toBeDefined()
  })

  test('/profile : no token', async function () {
    const res = await supertest(app).get('/api/v1/profile').expect(401)
  })

  test('PUT /profile : no field', async function () {
    const res = await supertest(app)
      .put('/api/v1/profile')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(400)
    expect(res.body.error.name).toBe('HttpErrorMissingFields')
    expect(res.body.error.message).toBeDefined()
  })

  test('PUT /profile : change password', async function () {
    const res = await supertest(app)
      .put('/api/v1/profile')
      .send({ password: 'password 123456' })
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    await supertest(app)
      .post('/api/v1/auth/local/login')
      .send({ email: 'karam@gmail.com', password: 'password 123456' })

    expect(res.status).toBe(200)
  })

  test('PUT /profile : change others', async function () {
    await supertest(app)
      .put('/api/v1/profile')
      .send({ email: 'new@gmail.com', userName: 'new user' })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const res2 = await supertest(app)
      .get('/api/v1/profile')
      .set('Authorization', `Bearer ${token}`)

    expect(res2.status).toBe(200)
    expect(res2.body.data.userName).toBe('new user')
    expect(res2.body.data.email).toBe('new@gmail.com')
  })

  afterAll((done) => {
    disconnect().then(() => done())
  })
})
