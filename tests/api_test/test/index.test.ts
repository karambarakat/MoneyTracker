import api from './helpers/api'
import { it, expect } from '@jest/globals'
import fetch from 'node-fetch'

it('root', async () => {
  const test = await fetch('http://localhost:4200/')
  const res = await test.text()
  expect(res).toMatchSnapshot()
})

it('root', async () => {
  const test = await api('/')

  expect(test).toMatchSnapshot()
})
