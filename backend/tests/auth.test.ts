import { app } from "../src/server"
import request from 'supertest';


describe('Local Authorization', () => {
  test('/auth/local/register', async () => {
    const res = await request(app)
      .post('/api/v1/auth/local/register')
      .set('Authorization', 'Basic ' + Buffer.from(['newUser', 'password'].join(':')).toString('base64'))
      .send({userName: 'KaramBarakat'})

    
    expect(res.statusCode).toBe(401)
    console.log(res.body)
    expect(res.text).toBe('go to /api/v1')
  })
})