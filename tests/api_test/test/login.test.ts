import { faker } from '@faker-js/faker'
import api from './helpers/api'
import { it, expect } from '@jest/globals'
import { getRandomUser } from './helpers/utils'
import { userMatcher } from './helpers/matcher'
import { clean_user } from './helpers/db'
import { user } from './helpers/fixture'

it('invalid token: not provided', async () => {
  const test = await api('/auth/local/login', {
    method: 'POST',
  })

  expect(test).toMatchSnapshot()
})

it(
  'invalid token: not formated',
  user(21111, async ({ _id, res, user }) => {
    const test = await api('/auth/local/login', {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(`${user.email}${user.password}`).toString('base64'),
      },
    })

    expect(test).toMatchSnapshot()
  }),
)

it(
  'success',
  user(21112, async ({ _id, res, user }) => {
    const test = await api('/auth/local/login', {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(`${user.email}:${user.password}`).toString('base64'),
      },
    })

    expect(test).toMatchSnapshot(userMatcher)
    expect(test.res?.data?._id).toBe(_id)
  }),
)

it(
  'invalid password',
  user(21113, async ({ _id, res, user }) => {
    const test = await api('/auth/local/login', {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(`${user.email}:ops${user.password}`).toString('base64'),
      },
    })

    expect(test).toMatchSnapshot()
  }),
)

it(
  'non existing user',
  user(21114, async ({ _id, res, user }) => {
    const test = await api('/auth/local/login', {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(`${user.email}ops:${user.password}`).toString('base64'),
      },
    })

    expect(test).toMatchSnapshot()
  }),
)

// TypeError: Request with GET/HEAD method cannot have body
it.skip(
  'email status',
  user(21115, async ({ _id, res, user }) => {
    const test = await api('/profile/status', {
      json: {
        email: faker.internet.email(),
      },
    })

    expect(test).toMatchSnapshot()

    const test2 = await api('/profile/status', {
      json: {
        email: user.email,
      },
    })

    expect(test2).toMatchSnapshot()
  }),
)
