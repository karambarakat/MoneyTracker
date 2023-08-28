import { it, expect, describe, beforeAll, afterAll } from '@jest/globals'
import fetch from 'node-fetch'
import { HELPER_SERVER, REST_API } from '../utils/constants'
import { expectResponse, profileRest } from '../utils/expect'

const ctx: any = {
  ids: [],
}

describe('basic token', () => {
  it('protected by token', async () => {
    const input = [REST_API + '/auth/local', {}] as const
    const res = await fetch(...input).then(res => res.json())

    expect(res).toMatchSnapshot()
  })

  it('protected by token: login', async () => {
    const input = [
      REST_API + '/auth/local/login',
      {
        method: 'POST',
      },
    ] satisfies Parameters<typeof fetch>
    const res = await fetch(...input).then(res => res.json())

    expect(res).toMatchSnapshot()
  })

  it('protected by token: register', async () => {
    const input = [
      REST_API + '/auth/local/register',
      {
        method: 'POST',
      },
    ] satisfies Parameters<typeof fetch>
    const res = await fetch(...input).then(res => res.json())

    expect(res).toMatchSnapshot()
  })

  it('bad basic token', async () => {
    const input = [
      REST_API + '/auth/local/register',
      {
        method: 'POST',
        headers: {
          authorization: 'Basic badToken',
        },
      },
    ] satisfies Parameters<typeof fetch>

    const res = await fetch(...input).then(res => res.json())

    expect(res).toMatchSnapshot()
  })

  it('not a basic token', async () => {
    const input = [
      REST_API + '/auth/local/register',
      {
        method: 'POST',
        headers: {
          authorization: 'Bearer badToken',
        },
      },
    ] satisfies Parameters<typeof fetch>

    const res = await fetch(...input).then(res => res.json())

    expect(res).toMatchSnapshot()
  })

  it('good basic token', async () => {
    const input = [
      REST_API + '/auth/local/register',
      {
        method: 'POST',
        headers: {
          content: 'application/json',
          authorization:
            'Basic ' + Buffer.from('admin:pass').toString('base64'),
        },
        body: JSON.stringify({}),
      },
    ] satisfies Parameters<typeof fetch>

    const res = await fetch(...input)
    const json: any = await res.json()

    expectResponse(res)
    ctx.user = Object.assign({}, json)
    ctx.ids.push(json.id)
    ctx.user.token = res.headers.get('x-token')

    expect(json.email).toBe('admin')

    expect(json).toMatchSnapshot(profileRest)
  })
  console // left intentionally
})

describe('local auth', () => {
  it('login', async () => {
    const input = [
      REST_API + '/auth/local/login',
      {
        method: 'POST',
        headers: {
          content: 'application/json',
          authorization:
            'Basic ' + Buffer.from('admin:pass').toString('base64'),
        },
        body: JSON.stringify({}),
      },
    ] satisfies Parameters<typeof fetch>

    const res = await fetch(...input)
    const json: any = await res.json()

    expectResponse(res)

    expect(json).toMatchSnapshot(profileRest)
  })

  it('usable returned token', async () => {
    const input = [
      REST_API + '/graphql',
      {
        method: 'POST',
        body: JSON.stringify({
          query: 'query {}',
          variables: {},
        }),
        headers: {
          content: 'application/json',
          authorization: `Bearer ${ctx.user.token}`,
        },
      },
    ] satisfies Parameters<typeof fetch>

    const res = await fetch(...input)

    expectResponse(res)
  })

  console // left intentionally
})

afterAll(async () => {
  await Promise.all(
    ctx.ids.map((id: string) =>
      fetch(HELPER_SERVER + '/remove_user_data/' + id),
    ),
  )
})
