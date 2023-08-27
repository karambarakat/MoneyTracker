import { expect } from '@jest/globals'
import { Response } from 'node-fetch'

export function expectResponse(res: Response) {
  expect(String(res.status)[0]).toBe('2')
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
