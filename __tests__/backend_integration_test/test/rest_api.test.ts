import { it, expect } from '@jest/globals'
import { REST_API } from '../utils/constants'
import fetch from 'node-fetch'

it('api is working', async () => {
  const input = [REST_API + '/', {}] as const
  const res = await fetch(...input).then(res => res.body?.read().toString())

  expect(res).toMatchSnapshot()
})

it('not found', async () => {
  // const res = await fetch(REST_API + "/notFound");
  const input = [REST_API + '/notFound', {}] as const
  const res = await fetch(...input).then(res => res.json())

  expect(res).toMatchSnapshot()
})
