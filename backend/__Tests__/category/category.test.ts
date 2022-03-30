// import fetch from 'node-fetch'
import { decode as b64Decoder } from 'js-base64'
import connect, { disconnect } from '@config/db-conn'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from './../../src/app'

describe('LOG', () => {
  jest.setTimeout(10000)
  var user1Token: string
  var user2Token: string

  beforeAll((done) => {
    async function main() {
      await connect()
      const cl1 = mongoose.connection.db.dropCollection('logs')
      const cl2 = mongoose.connection.db.dropCollection('users')
      const cl3 = mongoose.connection.db.dropCollection('categories')

      await Promise.all([cl1, cl2, cl3]).catch((error) => {
        if (error.message !== 'ns not found') {
          console.error('database initialization failed')
          throw error
        }
      })

      const db1 = supertest(app)
        .post('/api/v1/auth/local/register')
        .send({
          email: 'test1@gmail.com',
          password: '123456',
        })
        .then((res) => {
          user1Token = res.body.data.token
        })
      const db2 = supertest(app)
        .post('/api/v1/auth/local/register')
        .send({
          email: 'test2@gmail.com',
          password: '654321',
        })
        .then((res) => {
          user2Token = res.body.data.token
        })

      await Promise.all([db1, db2]).catch((error) => {
        console.error('users were not created')
        throw error
      })
    }

    main()
      .then(() => done())
      .catch((e) => {
        console.error('beforeAll failed')
        done()
      })
  })

  test('all routes are protected', async function () {
    await supertest(app).get('/api/v1/category').expect(401)
    await supertest(app).post('/api/v1/category').expect(401)
    await supertest(app).get('/api/v1/category/13254678961').expect(401)
    await supertest(app).put('/api/v1/category/13254678961').expect(401)
    await supertest(app).delete('/api/v1/category/13254678961').expect(401)
  })

  test('find: empty', async function () {
    const res = await supertest(app)
      .get('/api/v1/category')
      .set({ Authorization: 'Bearer ' + user1Token })

    expect(res.status).toBe(200)
    expect(res.body.data).toEqual([])
  })

  test('create: invalid', async function () {
    const res = await supertest(app)
      .post('/api/v1/category')
      .set({ Authorization: 'Bearer ' + user1Token })
      .send({})

    expect(res.status).toBe(400)
    expect(res.body.error.name).toBe('ValidationError')
    expect(res.body.error.message).toBeDefined()
    expect(res.body.error.details.errors.title).toBeDefined()
  })

  var createdCategories: any[] = []

  //create 0
  test('create: valid', async function () {
    const res = await supertest(app)
      .post('/api/v1/category')
      .set({ Authorization: 'Bearer ' + user1Token })
      .send({
        title: 'category title',
      })

    expect(res.status).toBe(201)
    expect(res.body.data.title).toBe('category title')
    expect(res.body.data.createdBy).toBe(
      JSON.parse(b64Decoder(user1Token.split('.')[1])).sub
    )
    expect(res.body.data._id).toBeDefined()

    createdCategories.push(res.body.data)
  })

  //create 1
  test('create: valid, all fields', async function () {
    const res = await supertest(app)
      .post('/api/v1/category')
      .set({ Authorization: 'Bearer ' + user1Token })
      .send({
        title: 'log title',
        color: '#468575',
        icon: '/dfsfa/sdfa.svg',
      })

    expect(res.status).toBe(201)
    expect(res.body.data.title).toBe('log title')
    expect(res.body.data.color).toBe('#468575')
    expect(res.body.data.icon).toBe('/dfsfa/sdfa.svg')

    createdCategories.push(res.body.data)
  })

  test('create: invalid, invalid color', async function () {
    const res = await supertest(app)
      .post('/api/v1/category')
      .set({ Authorization: 'Bearer ' + user1Token })
      .send({
        title: 'log title',
        color: '#46575',
        icon: '/dfsfa/sdfa.svg',
      })

    expect(res.status).toBe(400)
    expect(res.body.error.message).toBeDefined()
    expect(res.body.error.name).toBe('ValidationError')
    expect(res.body.error.details.errors.color).toBeDefined()
    expect(res.body.error.details.errors.color.name).toBeDefined()
    expect(res.body.error.details.errors.color.message).toBeDefined()
  })

  test('find what was created', async function () {
    const res = await supertest(app)
      .get('/api/v1/category')
      .set({ Authorization: 'Bearer ' + user1Token })

    expect(res.status).toBe(200)
    expect(res.body.data.length).toBe(createdCategories.length)
    expect(res.body.data).toEqual(createdCategories)

    await supertest(app)
      .get('/api/v1/category/' + createdCategories[0]._id)
      .set({ Authorization: 'Bearer ' + user1Token })
      .expect(200)

    await supertest(app)
      .get('/api/v1/category/' + createdCategories[1]._id)
      .set({ Authorization: 'Bearer ' + user1Token })
      .expect(200)

    await supertest(app)
      .get('/api/v1/category/' + '62420888157b107c8cdda033') //random objectId
      .set({ Authorization: 'Bearer ' + user1Token })
      .expect(404)
  })

  var createdLogs: any[] = []

  test('find all logs with category', async function () {
    const log1 = await supertest(app)
      .post('/api/v1/log')
      .set({ Authorization: 'Bearer ' + user1Token })
      .send({
        title: 'log one title',
        amount: 50,
        category: createdCategories[0]._id,
      })
    createdLogs.push(log1.body.data)

    const log2 = await supertest(app)
      .post('/api/v1/log')
      .set({ Authorization: 'Bearer ' + user1Token })
      .send({
        title: 'log one title',
        amount: 50,
        category: createdCategories[0]._id,
      })
    createdLogs.push(log2.body.data)

    const res = await supertest(app)
      .get('/api/v1/category/' + createdCategories[0]._id + '/logs')
      .set({ Authorization: 'Bearer ' + user1Token })
      .expect(200)

    expect(res.body.data._id).toBe(createdCategories[0]._id)
    expect(res.body.data.title).toBe(createdCategories[0].title)
    expect(res.body.data.color).toBe(createdCategories[0].color)
    expect(res.body.data.createdBy).toBe(createdCategories[0].createdBy)

    expect(res.body.data.logs).toEqual(
      createdLogs.map((log) => {
        log.category = null
        return log
      })
    )
  })

  test('update', async function () {
    const res = await supertest(app)
      .put('/api/v1/category/' + createdCategories[0]._id)
      .set({ Authorization: 'Bearer ' + user1Token })
      .send({
        title: 'new log title',
        color: '#ffffff',
        icon: '/new-path/image.svg',
      })

    expect(res.status).toBe(200)
    expect(res.body.data.title).toBe('new log title')
    expect(res.body.data.color).toBe('#ffffff')
    expect(res.body.data.icon).toBe('/new-path/image.svg')
  })

  test('delete', async function () {
    const res = await supertest(app)
      .delete('/api/v1/category/' + createdCategories[0]._id)
      .set({ Authorization: 'Bearer ' + user1Token })
      .expect(200)
  })

  test('different users different category ', async function () {
    await supertest(app)
      .post('/api/v1/category')
      .set({ Authorization: 'Bearer ' + user2Token })
      .send({
        title: 'log title',
      })
      .expect(201)

    const catRes = await supertest(app)
      .get('/api/v1/category')
      .set({ Authorization: 'Bearer ' + user2Token })
      .expect(200)

    expect(catRes.body.data.length).toBe(1)
  })

  afterAll((done) => {
    disconnect().then(() => done())
  })
})
