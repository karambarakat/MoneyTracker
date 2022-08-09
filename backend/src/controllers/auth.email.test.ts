// import fetch from 'node-fetch'
import connect, { disconnect } from "@config/db-conn"
import mongoose from "mongoose"
import supertest from "supertest"
import app from "./../app"

describe("AUTH_EMAIL", () => {
  beforeAll((done) => {
    async function main() {
      await connect()
      await mongoose.connection.db.dropCollection("users")
    }
    main().then(() => done())
  })

  /**
   * @path : /auth/local/register
   */
  test("/auth/local/register : valid", async function () {
    const res = await supertest(app).post("/api/v1/auth/local/register").send({
      email: "test@g.c",
      password: "123456789",
    })

    expect(res.status).toBe(201)
    expect(res.body.data.email).toBe("test@g.c")
    expect(res.body.data.userName).toBeDefined()
    expect(res.body.data.password).not.toBeDefined()
    expect(res.body.data.providers).toContain("local")
    expect(res.body.data._id).toBeDefined()
    expect(res.body.data.token).toBeDefined()
    expect(res.body.data.createdAt).toBeDefined()
    expect(res.body.data.updatedAt).toBeDefined()
  })

  test("/auth/local/register : no body", async function () {
    const res = await supertest(app)
      .post("/api/v1/auth/local/register")
      .send({})

    expect(res.status).toBe(400)
    expect(res.body.error.name).toBe("ValidationError")
    expect(res.body.error.details.errors.email).toBeDefined()
    // expect(res.body.error.details.errors.password).toBeDefined()
  })

  test("/auth/local/register : no password", async function () {
    const res = await supertest(app).post("/api/v1/auth/local/register").send({
      email: "k@g.c",
    })

    expect(res.status).toBe(400)
    expect(res.body.error.name).toBe("ValidationError")
    expect(res.body.error.details.errors.password).toBeDefined()
  })

  test("/auth/local/register : invalid email", async function () {
    const res = await supertest(app).post("/api/v1/auth/local/register").send({
      email: "karam@gmailcom",
      password: "123456",
    })

    expect(res.status).toBe(400)
    expect(res.body.error.name).toBe("ValidationError")
    expect(res.body.error.details.errors.email).toBeDefined()
  })

  test("/auth/local/register : user exist", async function () {
    const res = await supertest(app).post("/api/v1/auth/local/register").send({
      email: "test@g.c",
      password: "123456",
    })

    expect(res.status).toBe(400)
    expect(res.body.error.name).toBe("UserAlreadyExist")
  })

  test("/auth/local/register : valid with username", async function () {
    const res = await supertest(app).post("/api/v1/auth/local/register").send({
      email: "test2@g.c",
      userName: "some user name",
      password: "123456",
    })

    expect(res.status).toBe(201)
    expect(res.body.data.email).toBe("test2@g.c")
    expect(res.body.data.userName).toBe("some user name")
    expect(res.body.data.password).not.toBeDefined()
    expect(res.body.data.providers).toContain("local")
    expect(res.body.data._id).toBeDefined()
    expect(res.body.data.token).toBeDefined()
    expect(res.body.data.createdAt).toBeDefined()
    expect(res.body.data.updatedAt).toBeDefined()
  })

  /**
   * @path : /auth/local/login
   */

  test("/auth/local/login : valid", async function () {
    const res = await supertest(app).post("/api/v1/auth/local/login").send({
      email: "test@g.c",
      password: "123456789",
    })

    expect(res.status).toBe(200)
    expect(res.body.data.email).toBe("test@g.c")
    expect(res.body.data.userName).toBeDefined()
    expect(res.body.data.password).not.toBeDefined()
    expect(res.body.data.providers).toContain("local")
    expect(res.body.data._id).toBeDefined()
    expect(res.body.data.token).toBeDefined()
    expect(res.body.data.createdAt).toBeDefined()
    expect(res.body.data.updatedAt).toBeDefined()
  })

  test("/auth/local/login :  failed", async function () {
    const res = await supertest(app).post("/api/v1/auth/local/login").send({
      email: "test@g.c",
      password: "123456789xxxxx",
    })

    expect(res.status).toBe(401)
    expect(res.body.error.name).toBe("EmailOrPasswordIncorrect")
    expect(res.body.error.message).toBeDefined()
  })

  afterAll((done) => {
    disconnect().then(() => done())
  })
})
