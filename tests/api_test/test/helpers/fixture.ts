import { clean_user } from './db'
import api from './api'
import { get } from 'lodash'
import { User, getRandomUser } from './utils'
import { faker } from '@faker-js/faker'

export function random(cb: (info: User) => Promise<void>) {
  return async () => {
    await cb(getRandomUser())
  }
}

export function user(
  seed: number,
  cb: (info: {
    user: User
    res: any
    _id: string
    token: string
  }) => Promise<void>,
) {
  return async () => {
    faker.seed(seed)
    const user = getRandomUser()

    const test = await api('/auth/local/register', {
      method: 'POST',
      json: {
        displayName: user.displayName,
      },
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(`${user.email}:${user.password}`).toString('base64'),
      },
    })

    if (!test.res?.data) {
      console.log('error', test.res)
      throw new Error('no data')
    }

    const _id = test.res.data._id
    if (!_id) throw new Error('no _id')
    const token = test.res.data.token
    if (!token) throw new Error('no token')

    await cb({ _id, user, res: test.res.data, token })

    await clean_user(_id)
  }
}
