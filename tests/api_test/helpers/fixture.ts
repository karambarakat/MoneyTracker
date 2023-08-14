import { test as it } from '@jest/globals'
import { faker } from '@faker-js/faker'
import fetch from './fetch'
import { get } from 'lodash'

interface User {
  email: string
  displayName: string
  password: string
}

function getRandomUser() {
  return {
    email: faker.internet.email(),
    displayName: faker.person.firstName(),
    password: faker.internet.password(),
  } as User
}

export function random(cb: (info: User) => Promise<void>) {
  return async () => {
    await cb(getRandomUser())
  }
}

export function user(cb: (info: { user: User }) => Promise<void>) {
  return async () => {
    const user = getRandomUser()

    const test = await fetch('/auth/local/register', {
      method: 'POST',
      json: {
        displayName: user.displayName,
      },
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(`${user.email}:${user.password}}`).toString('base64'),
      },
    })

    const _id = get(test.res, 'data._id')
    if (_id) throw new Error('no _id')

    await cb({ user })

    await fetch('http://localhost:4202/remove_user_data/' + _id)
  }
}
