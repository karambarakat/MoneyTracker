import { test as base, expect } from '@playwright/test'

const test = base.extend<{ ClearDb: object }>({
  ClearDb: [
    async ({ request }, use) => {
      // await request.get('http://localhost:4202')
      await use({})
    },
    { auto: true },
  ],
})

test('test @db', async ({ page, baseURL }) => {
  // unauthenticated user
  await page.goto('/')
  await page.waitForTimeout(1000)
  expect(page.url()).toBe(baseURL + '/auth')

  // user was not found
  await page.getByLabel('Email').fill('test@gmail.com')
  await page.getByLabel('Password').fill('verysecure')
  await page.getByRole('button', { name: 'Login' }).click()
  await page.getByText('Error: ', { exact: false }).click()

  // register user
  await page.getByRole('link', { name: 'Create an account' }).click()
  await page.getByLabel('Display Name').fill('test display')
  await page.getByLabel('Email').fill('test@gmail.com')
  await page.getByLabel('Password', { exact: true }).fill('verysecure')
  await page.getByLabel('Confirm The Password').fill('verysecure')
  await page.getByRole('button', { name: 'Register' }).click()

  // automatically routed to home
  await page.waitForTimeout(1000)
  expect(page.url()).toBe(baseURL + '/')
  await page.getByRole('heading', { name: 'Home' }).click()

  // log out
  await page.getByRole('button', { name: 'log out' }).click()
  await page.waitForTimeout(1000)
  expect(page.url()).toBe(baseURL + '/auth')

  // test the new user
  await page.getByLabel('Email').fill('test@gmail.com')
  await page.getByLabel('Password').fill('verysecure')
  await page.getByRole('button', { name: 'Login' }).click()

  // automatically routed to home
  await page.waitForTimeout(1000)
  expect(page.url()).toBe(baseURL + '/')
  await page.getByRole('heading', { name: 'Home' }).click()
})
