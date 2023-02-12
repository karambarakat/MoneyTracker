// import { app } from "../src/server"
// import request from 'supertest';

describe('general test', () => {
  test('response to /', async () => {
    console.log(process.env.NODE_ENV)
    // const res = await request(app).get('/')
    // expect(res.statusCode).toBe(404)
    // expect(res.text).toBe('go to /api/v1')
  })
})