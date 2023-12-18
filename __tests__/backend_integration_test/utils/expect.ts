import { expect } from '@jest/globals'
import { Response } from 'node-fetch'

expect.extend({
  toSuccess(received: string) {
    const pass = received[0] === '2'
    if (pass) {
      return {
        message: () => `Received: ${received}`,
        pass: true,
      }
    } else {
      return {
        message: () => `Expected: 2xx (any 200s)\nReceived: ${received}`,
        pass: false,
      }
    }
  },
})

// extends typescript's Matchers

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/ban-types
    interface Matchers<R, T = {}> {
      toSuccess(): R
    }
  }
}

export function expectResponse(res: Response) {
  // @ts-expect-error ts(2339)
  expect(String(res.status)).toSuccess()
  expect(res.headers.get('x-token'))
}

export const profileRest = {
  created_at: expect.any(Number),
  updated_at: expect.any(Number),
  id: expect.any(String),
}

export const profileGQL = {
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  id: expect.any(String),
}

export const categoryGQL = {
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  createdBy: {
    ...profileGQL,
  },
  id: expect.any(String),
}

export const entryGQL = {
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  createdBy: {
    ...profileGQL,
  },
  category: {
    ...categoryGQL,
  },
  id: expect.any(String),
}

export const entryNoCat = {
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  createdBy: {
    ...profileGQL,
  },
  id: expect.any(String),
}

export const entryInput = {
  category: expect.any(String),
}
