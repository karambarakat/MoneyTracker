import { app } from '../src/server'
import request from 'supertest'

describe('general test', () => {
  test('response to /', async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toBe(404)
    expect(res.text).toBe('go to /api/v1')
  })
})
