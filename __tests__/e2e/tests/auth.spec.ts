import { expect } from '@playwright/test'
import { test as base } from '../fixture'

const test = base.extend<{ workerUser: { user: string } }>({
  workerUser: [
    async ({}, use, workerInfo) => {
      const user = 'user-' + workerInfo.workerIndex

      await use({ user })
    },
    { scope: 'worker' as 'test' },
  ],
})

test('test', async ({ page, baseURL, workerUser }) => {
  const email = workerUser.user + '@gmail.com'
  const password = 'very-sercure'
  const display = workerUser.user

  // unauthenticated user
  await page.goto('/')
  await page.waitForTimeout(1000)
  expect(page.url()).toBe(baseURL + '/auth/login')

  // user was not found
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
  await page.getByText('Error: ', { exact: false }).click()

  // register user
  await page.getByRole('link', { name: 'Create an account' }).click()
  await page.getByLabel('Display Name').fill(display)
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password', { exact: true }).fill(password)
  await page.getByLabel('Confirm The Password').fill(password)
  await page.getByRole('button', { name: 'Register' }).click()

  // automatically routed to home
  await page.waitForTimeout(1000)
  expect(page.url()).toBe(baseURL + '/')
  await page.getByRole('heading', { name: 'Home' }).click()

  // log out
  await page.getByRole('button', { name: 'log out' }).click()
  await page.waitForTimeout(1000)
  expect(page.url()).toBe(baseURL + '/auth/login')

  // test the new user
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()

  // automatically routed to home
  await page.waitForTimeout(1000)
  expect(page.url()).toBe(baseURL + '/')
  await page.getByRole('heading', { name: 'Home' }).click()
})
