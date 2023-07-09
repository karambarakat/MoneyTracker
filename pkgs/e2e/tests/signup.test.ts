import { test, expect } from '@playwright/test'

test.setTimeout(120000) //I have to build vite first to reduce this timeout

test('main', async ({ page }) => {
  await page.goto('http://localhost:5333/auth/signup')
  await page.getByLabel('Email').click()
  await page.getByLabel('Email').fill('k@gmail.com')
  await page.getByLabel('Username').fill('user-7b59835c')
  await page.getByLabel('Password', { exact: true }).fill('pass22##secret')
  await page.getByLabel('Confirm Password').fill('pass22##secret')
  await page.getByRole('button', { name: 'Submit' }).click()

  await new Promise(resolve => setTimeout(resolve, 1000))

  expect(page.url()).toBe('http://localhost:5333/')
})
