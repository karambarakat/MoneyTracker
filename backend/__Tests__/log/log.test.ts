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
  var user1Category1: string
  var user1Category2: string
  var user2Category1: string

  beforeAll((done) => {
    async function main() {
      await connect()
      const cl1 = mongoose.connection.db.dropCollection('logs')
      const cl2 = mongoose.connection.db.dropCollection('users')
      const cl3 = mongoose.connection.db.dropCollection('categories')

      await Promise.all([cl1, cl2, cl3]).catch((error) => {
        if (error.message !== 'ns not found') throw error
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
          password: '123456',
        })
        .then((res) => {
          user2Token = res.body.data.token
        })

      await Promise.all([db1, db2]).catch((error) => {
        console.error('users were not created')
        throw error
      })

      const db3 = supertest(app)
        .post('/api/v1/category')
        .set({ Authorization: 'Bearer ' + user1Token })
        .send({
          title: 'new Entery',
          color: '#6971fa',
        })
        .then((res) => {
          user1Category1 = res.body.data._id
        })

      const db4 = supertest(app)
        .post('/api/v1/category')
        .set({ Authorization: 'Bearer ' + user1Token })
        .send({
          title: 'new Entery',
          color: '#6971fa',
        })
        .then((res) => {
          user1Category2 = res.body.data._id
        })

      const db5 = supertest(app)
        .post('/api/v1/category')
        .set({ Authorization: 'Bearer ' + user2Token })
        .send({
          title: 'new Entery',
          color: '#6971fa',
        })
        .then((res) => {
          user2Category1 = res.body.data._id
        })

      await Promise.all([db1, db2, db3, db4, db5]).catch((error) => {
        console.error('operation on db failed')
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
    await supertest(app).get('/api/v1/log').expect(401)
    await supertest(app).post('/api/v1/log').expect(401)
    await supertest(app).get('/api/v1/log/13254678961').expect(401)
    await supertest(app).put('/api/v1/log/13254678961').expect(401)
    await supertest(app).delete('/api/v1/log/13254678961').expect(401)
  })

  test('find: empty', async function () {
    const res = await supertest(app)
      .get('/api/v1/log')
      .set({ Authorization: 'Bearer ' + user1Token })

    expect(res.status).toBe(200)
    expect(res.body.data).toEqual([])
  })

  test('create: invalid', async function () {
    const res = await supertest(app)
      .post('/api/v1/log')
      .set({ Authorization: 'Bearer ' + user1Token })
      .send({})

    expect(res.status).toBe(400)
    expect(res.body.error.name).toBe('ValidationError')
    expect(res.body.error.message).toBeDefined()
    expect(res.body.error.details.errors.title).toBeDefined()
    expect(res.body.error.details.errors.amount).toBeDefined()
  })

  //create 0
  test('create: valid', async function () {
    const res = await supertest(app)
      .post('/api/v1/log')
      .set({ Authorization: 'Bearer ' + user1Token })
      .send({
        title: 'log title',
        amount: 84,
      })

    expect(res.status).toBe(201)
    expect(res.body.data.title).toBe('log title')
    expect(res.body.data.amount).toBe(84)
    expect(res.body.data.createdBy).toBe(
      JSON.parse(b64Decoder(user1Token.split('.')[1])).sub
    )
    expect(res.body.data._id).toBeDefined()
    expect(res.body.data.createdAt).toBeDefined()
    expect(res.body.data.updatedAt).toBeDefined()
  })

  //create 1
  test('create: valid, all fields', async function () {
    const res = await supertest(app)
      .post('/api/v1/log')
      .set({ Authorization: 'Bearer ' + user1Token })
      .send({
        title: 'log title',
        amount: 84,
        note: 'Aliquip consequat velit officia amet cupidatat et labore elit excepteur. Officia exercitation dolor et id nostrud id. Aliqua culpa qui do sit ipsum laborum eiusmod velit laborum quis adipisicing aute non aliquip. Commodo aliquip esse mollit commodo mollit velit. Ex est amet aliqua et culpa laborum commodo ut est cupidatat.',
      })

    expect(res.status).toBe(201)
    expect(res.body.data.note).toBe(
      'Aliquip consequat velit officia amet cupidatat et labore elit excepteur. Officia exercitation dolor et id nostrud id. Aliqua culpa qui do sit ipsum laborum eiusmod velit laborum quis adipisicing aute non aliquip. Commodo aliquip esse mollit commodo mollit velit. Ex est amet aliqua et culpa laborum commodo ut est cupidatat.'
    )
  })

  test('create: invalid, wrong category', async function () {
    const res = await supertest(app)
      .post('/api/v1/log')
      .set({ Authorization: 'Bearer ' + user1Token })
      .send({
        title: 'log title',
        amount: 84,
        category: '',
      })

    expect(res.status).toBe(400)
    expect(res.body.error.name).toBe('ValidationError')
    expect(res.body.error.details.errors.category.name).toBe('CastError')

    const res2 = await supertest(app)
      .post('/api/v1/log')
      .set({ Authorization: 'Bearer ' + user1Token })
      .send({
        title: 'log title',
        amount: 84,
        category: '62420888157b107c8cdda033', //random ObjectId
      })

    expect(res2.status).toBe(400)
    expect(res2.body.error.name).toBe('ValidationError')
    expect(res2.body.error.details.errors.category).toBeDefined()
    expect(res2.body.error.details.errors.category.name).toBe('relationError')
  })

  //create 2
  test('create: valid, with category', async function () {
    const res = await supertest(app)
      .post('/api/v1/log')
      .set({ Authorization: 'Bearer ' + user1Token })
      .send({
        title: 'log title',
        amount: 84,
        category: user1Category1,
      })

    expect(res.status).toBe(201)
    expect(res.body.data.category).toBeDefined()
    expect(res.body.data.category._id).toBe(user1Category1)
    expect(res.body.data.category.title).toBeDefined()
    expect(res.body.data.category.color).toBeDefined()
  })

  var createdLogs: string[]

  test('find what was created', async function () {
    const res = await supertest(app)
      .get('/api/v1/log')
      .set({ Authorization: 'Bearer ' + user1Token })

    createdLogs = res.body.data.map((e: any) => e._id)

    expect(res.status).toBe(200)
    expect(res.body.data.length).toBe(3)

    await supertest(app)
      .get('/api/v1/log/' + res.body.data[0]._id)
      .set({ Authorization: 'Bearer ' + user1Token })
      .expect(200)

    await supertest(app)
      .get('/api/v1/log/' + res.body.data[1]._id)
      .set({ Authorization: 'Bearer ' + user1Token })
      .expect(200)

    await supertest(app)
      .get('/api/v1/log/' + res.body.data[2]._id)
      .set({ Authorization: 'Bearer ' + user1Token })
      .expect(200)

    await supertest(app)
      .get('/api/v1/log/' + '62420888157b107c8cdda033') //random objectId
      .set({ Authorization: 'Bearer ' + user1Token })
      .expect(404)
  })

  test('update', async function () {
    const res = await supertest(app)
      .put('/api/v1/log/' + createdLogs[0])
      .set({ Authorization: 'Bearer ' + user1Token })
      .send({
        amount: 86,
        title: 'new updated title',
        note: 'new updated notes',
        // category: user1Category1,
      })

    expect(res.status).toBe(200)
    expect(res.body.data.amount).toBe(86)
    expect(res.body.data.title).toBe('new updated title')
    expect(res.body.data.note).toBe('new updated notes')
  })

  test('update categories', async function () {
    // [0] => null
    // [1] => null
    // [2] => user1Category1

    const res = await supertest(app)
      .put('/api/v1/log/' + createdLogs[0])
      .set({ Authorization: 'Bearer ' + user1Token })
      .send({
        category: user1Category1,
      })
      .expect(200)
    // [0] => user1Category1
    // [1] => null
    // [2] => user1Category1
    expect(res.body.data.category._id).toBe(user1Category1)

    const res2 = await supertest(app)
      .put('/api/v1/log/' + createdLogs[1])
      .set({ Authorization: 'Bearer ' + user1Token })
      .send({
        category: user1Category2,
      })
      .expect(200)
    // [0] => user1Category1
    // [1] => user1Category2
    // [2] => user1Category1
    expect(res2.body.data.category._id).toBe(user1Category2)

    const res3 = await supertest(app)
      .put('/api/v1/log/' + createdLogs[2])
      .set({ Authorization: 'Bearer ' + user1Token })
      .send({
        category: user1Category2,
      })
      .expect(200)
    // [0] => user1Category1
    // [1] => user1Category2
    // [2] => user1Category2
    expect(res3.body.data.category._id).toBe(user1Category2)
  })

  test('delete', async function () {
    const res = await supertest(app)
      .delete('/api/v1/log/' + createdLogs[2])
      .set({ Authorization: 'Bearer ' + user1Token })
      .expect(200)
    // [0] => user1Category1
    // [1] => user1Category2
    // gone => user1Category2
  })

  test('different users different logs ', async function () {
    const res = await supertest(app)
      .post('/api/v1/log')
      .set({ Authorization: 'Bearer ' + user2Token })
      .send({
        title: 'log title',
        amount: 84,
      })
      .expect(201)
    const catRes = await supertest(app)
      .get('/api/v1/category')
      .set({ Authorization: 'Bearer ' + user2Token })
      .expect(200)

    expect(catRes.body.data.length).toBe(1)

    const res2 = await supertest(app)
      .post('/api/v1/log')
      .set({ Authorization: 'Bearer ' + user2Token })
      .send({
        title: 'log title',
        amount: 84,
        //can't access different user's category
        category: user1Category1,
      })
      .expect(400)

    expect(res2.body.error.name).toBe('ValidationError')
    expect(res2.body.error.details.errors.category).toBeDefined()

    const res3 = await supertest(app)
      .put('/api/v1/log/' + createdLogs[0])
      .set({ Authorization: 'Bearer ' + user1Token })
      .send({
        category: user2Category1,
      })
      .expect(400)

    expect(res3.body.error.name).toBe('ValidationError')
    expect(res2.body.error.details.errors.category).toBeDefined()
  })

  afterAll((done) => {
    disconnect().then(() => done())
  })
})
