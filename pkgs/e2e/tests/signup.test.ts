import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:5333/auth/signup')
  await page.getByLabel('Email').click()
  await page.getByLabel('Email').fill('k@gmail.com')
  await page.getByLabel('Username').fill('user')
  await page.getByLabel('Password', { exact: true }).fill('pass22##secret')
  await page.getByLabel('Confirm Password').fill('pass22##secret')
  await page.getByRole('button', { name: 'Submit' }).press('Enter')

  await page.getByText('success: signed in').click()
})
