import { test, expect } from '@playwright/test'

test.setTimeout(120000) //I have to build vite first to reduce this timeout

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5333/auth/signup')
  await page.getByLabel('Email').click()
  await page.getByLabel('Email').fill('k4@gmail.com')
  await page.getByLabel('Username').fill('user')
  await page.getByLabel('Password', { exact: true }).fill('pass22##secret')
  await page.getByLabel('Confirm Password').fill('pass22##secret')
  await page.getByRole('button', { name: 'Submit' }).click()

  await new Promise(resolve => setTimeout(resolve, 1000))

  expect(page.url()).toBe('http://localhost:5333/')
})

test('main', async ({ page }) => {
  await page.goto('http://localhost:5333/profile')

  await page.getByText('Email: k4@gmail.com').click()
  // todo: bug
  // await page.getByText('Name: user-7b59835c').click()

  // update profile
  await page.getByRole('button', { name: 'Update Profile' }).click()
  await page.getByLabel('Display Name').click()
  await page.getByLabel('Display Name').fill('new name')
  await page.getByLabel('Picture').click()
  await page.getByLabel('Picture').fill('new picture')
  await page.getByRole('button', { name: 'Submit' }).click()
  await page.getByText('Name: new name').click()
  await page.getByText('Picture: new picture').click()
  await page.getByRole('button', { name: 'Update Profile' }).click()

  // update password
  await page.getByRole('button', { name: 'Reset Password' }).click()
  await page.getByLabel('Old Password').click()
  await page.getByLabel('Old Password').fill('pass22##secret')
  await page.getByLabel('New Password').click()
  await page.getByLabel('New Password').fill('new pass')
  await page.getByRole('button', { name: 'Submit' }).click()
  await page.getByText('success: password changed').click()

  // logout
  await page.getByRole('button', { name: 'log out' }).click()
  await new Promise(resolve => setTimeout(resolve, 1000))
  expect(page.url()).toBe('http://localhost:5333/auth/login')

  // use updated password
  await page.getByLabel('Email').click()
  await page.getByLabel('Email').fill('k4@gmail.com')
  await page.getByLabel('Password').click()
  await page.getByLabel('Password').fill('new pass')
  await page.getByRole('button', { name: 'Submit' }).click()
  await new Promise(resolve => setTimeout(resolve, 1000))
  expect(page.url()).toBe('http://localhost:5333/')
})
