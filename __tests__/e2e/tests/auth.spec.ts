import { expect } from '@playwright/test'
import { test } from '../fixture'
import { UserInterface } from '../fixture/pattern'

test('test', async ({ page, baseURL, unAuth }) => {
  const user: UserInterface = {
    email: unAuth.user + '@gmail.com',
    password: 'very-sercure',
    displayName: unAuth.user,
  }

  // unauthenticated user
  await page.goto('/')
  await page.waitForTimeout(1000)
  expect(page.url()).toBe(baseURL + '/auth/login')

  // user was not found
  await page.getByLabel('Email').fill(user.email)
  await page.getByLabel('Password').fill(user.password)
  await page.getByRole('button', { name: 'Login' }).click()
  await page.getByText('Error: ', { exact: false }).click()

  // register user
  await page.getByRole('link', { name: 'Create an account' }).click()
  await page.getByLabel('Display Name').fill(user.displayName)
  await page.getByLabel('Email').fill(user.email)
  await page.getByLabel('Password', { exact: true }).fill(user.password)
  await page.getByLabel('Confirm The Password').fill(user.password)
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
  await page.getByLabel('Email').fill(user.email)
  await page.getByLabel('Password').fill(user.password)
  await page.getByRole('button', { name: 'Login' }).click()

  // automatically routed to home
  await page.waitForTimeout(1000)
  expect(page.url()).toBe(baseURL + '/')
  await page.getByRole('heading', { name: 'Home' }).click()
})
