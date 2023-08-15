import { faker } from '@faker-js/faker'
import { it, expect } from '@jest/globals'
import api from './helpers/api'
import { getRandomUser } from './helpers/utils'
import { userMatcher } from './helpers/matcher'
import { clean_user } from './helpers/db'

it('invalid token: not provided', async () => {
  faker.seed(11111)
  const info = getRandomUser()

  const test = await api('/auth/local/register', {
    method: 'POST',
    json: {
      displayName: info.displayName,
    },
  })

  expect(test).toMatchSnapshot()
})

it('invalid token: not formatted', async () => {
  faker.seed(11112)
  const info = getRandomUser()

  const test = await api('/auth/local/register', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(`${info.email}${info.password}`).toString('base64'),
    },
    json: {
      displayName: info.displayName,
    },
  })

  expect(test).toMatchSnapshot()
})

it('success', async () => {
  faker.seed(11113)
  const info = getRandomUser()

  const test = await api('/auth/local/register', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(`${info.email}:${info.password}`).toString('base64'),
    },
    json: {
      displayName: info.displayName,
    },
  })

  expect(test).toMatchSnapshot(userMatcher)
  // todo json doesn't work
  // expect(test.res?.data?.displayName).toBe(info.displayName)
  await clean_user(test.res?.data?._id)
})

it('success: only required', async () => {
  faker.seed(11114)
  const info = getRandomUser()

  const test = await api('/auth/local/register', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(`${info.email}:${info.password}`).toString('base64'),
    },
  })

  expect(test).toMatchSnapshot(userMatcher)
  await clean_user(test.res?.data?._id)
})

it('user exist', async () => {
  faker.seed(11115)
  const info = getRandomUser()

  const old = await api('/auth/local/register', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(`${info.email}:${info.password}`).toString('base64'),
    },
  })

  const test = await api('/auth/local/register', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(`${info.email}:${info.password}`).toString('base64'),
    },
  })

  expect(test).toMatchSnapshot()
  await clean_user(old.res?.data?._id)
})
