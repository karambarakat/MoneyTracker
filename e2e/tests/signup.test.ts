/// <reference
import { test, expect } from '@playwright/test'

test.skip('main', async ({ page }) => {
  await page.goto('http://localhost:5333/')
  expect(page.url()).toBe('http://localhost:5333/auth')

  // no user registered yet
  await page.getByLabel('Email').fill('test@gmail.com')
  await page.getByLabel('Password').fill('test-password')
  await page.getByRole('button', { name: 'Login' }).press('Enter')
  await page.getByText('Error: ', { exact: false }).click()

  await page.getByRole('link', { name: 'Create an account' }).click()
  await page.getByLabel('Display Name').fill('sample name')
  await page.getByLabel('Email').fill('test@gmail.com')
  await page.getByLabel('Password', { exact: true }).fill('test-password')
  await page.getByLabel('Confirm The Password').fill('test-password')
  await page.getByRole('button', { name: 'Register' }).press('Enter')

  // automatically routed to home
  await page.waitForTimeout(1000)
  expect(page.url()).toBe('http://localhost:5333/')
  await page.getByRole('heading', { name: 'Home' }).click()

  await page.context().storageState({ path: '.auth/state.json' })
})
