import { test, expect } from '@playwright/test'

test.setTimeout(120000) //I have to build vite first to reduce this timeout

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5333/auth/signup')
  await page.getByLabel('Email').click()
  await page.getByLabel('Email').fill('k2@gmail.com')
  await page.getByLabel('Username').fill('user')
  await page.getByLabel('Password', { exact: true }).fill('pass22##secret')
  await page.getByLabel('Confirm Password').fill('pass22##secret')
  await page.getByRole('button', { name: 'Submit' }).click()

  await new Promise(resolve => setTimeout(resolve, 1000))

  expect(page.url()).toBe('http://localhost:5333/')
})

test('main', async ({ page, context }) => {
  await page.goto('http://localhost:5333/')
  await page.getByLabel('Title').click()
  await page.getByLabel('Title').fill('first log')
  await page.getByLabel('Title').press('Tab')
  await page.getByLabel('Amount').fill('4')
  await page.getByLabel('Amount').press('Tab')
  await page.getByLabel('Note').fill('random amount')
  await page.getByRole('button', { name: 'Submit' }).click()
  await page.getByText('success: created').click()
  await page.getByLabel('Title').click()
  await page.getByLabel('Title').fill('another log')
  await page.getByLabel('Title').press('Tab')
  await page.getByLabel('Amount').fill('41')
  await page.getByLabel('Amount').press('Tab')
  await page.getByRole('button', { name: 'Submit' }).click()
  await page
    .locator('div')
    .filter({ hasText: /^no categoryfirst lograndom amount4expand$/ })
    .getByRole('button', { name: 'expand' })
    .click()
  await page.getByRole('button', { name: 'click to edit' }).click()
  await page.getByRole('textbox', { name: 'Title', exact: true }).click()
  await page
    .getByRole('textbox', { name: 'Title', exact: true })
    .fill('first log new name')
  await page
    .locator('form')
    .filter({ hasText: 'IdTitleAmountNoteCategorySubmit' })
    .getByRole('button', { name: 'Submit' })
    .click()
  await page.getByText('first log new name').click()
  await page.getByRole('button', { name: 'click to delete' }).click()
})
