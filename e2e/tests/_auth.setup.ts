import { test as setup, expect } from '@playwright/test'

setup('authenticate', async ({ page, baseURL }) => {
  await page.goto('/')
  expect(page.url()).toBe(baseURL + '/auth')

  await page.getByRole('link', { name: 'Create an account' }).click()
  await page.getByLabel('Display Name').fill('sample name')
  await page.getByLabel('Email').fill('setup@gmail.com')
  await page.getByLabel('Password', { exact: true }).fill('test-password')
  await page.getByLabel('Confirm The Password').fill('test-password')
  await page.getByRole('button', { name: 'Register' }).press('Enter')

  await page.context().storageState({ path: '.auth/setup.json' })
})
