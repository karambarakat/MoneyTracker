// import fetch from 'node-fetch'
import { disconnect } from '@config/db-conn'
import supertest from 'supertest'
import app from '../../src/app'

describe('general test on the app', () => {
  test('api is working', async function () {
    const res = await supertest(app).get('/')

    expect(res.body.message).toBe('api is working')

    return Promise.resolve('done')
  })

  afterAll((done) => {
    disconnect().then(() => done())
  })
})
