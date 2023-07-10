import { test, expect } from '@playwright/test'

test.setTimeout(120000) //I have to build vite first to reduce this timeout

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5333/auth/signup')
  await page.getByLabel('Email').click()
  await page.getByLabel('Email').fill('k3@gmail.com')
  await page.getByLabel('Username').fill('user')
  await page.getByLabel('Password', { exact: true }).fill('pass22##secret')
  await page.getByLabel('Confirm Password').fill('pass22##secret')
  await page.getByRole('button', { name: 'Submit' }).click()

  await new Promise(resolve => setTimeout(resolve, 1000))

  expect(page.url()).toBe('http://localhost:5333/')
})

test('main', async ({ page, context }) => {
  await page.goto('http://localhost:5333/categories')
  await page.getByLabel('Title').click()
  await page.getByLabel('Title').fill('new cat')
  await page.getByRole('button', { name: 'Submit' }).click()
  await page.getByLabel('Title').click()
  await page.getByLabel('Title').fill('second cat')
  await page.getByLabel('Title').press('Tab')
  await page.getByLabel('Color', { exact: true }).fill('red')
  await page.getByLabel('Color', { exact: true }).press('Tab')
  await page.getByLabel('Note').fill('notes')
  await page.getByLabel('Note').press('Tab')
  await page.getByLabel('Icon').fill('icon')
  await page.getByLabel('Icon').press('Tab')
  await page.getByRole('button', { name: 'Submit' }).press('Enter')
  await page
    .locator('div')
    .filter({ hasText: /^second caticonredexpand$/ })
    .getByRole('button', { name: 'expand' })
    .click()
  await page.getByRole('button', { name: 'click to edit' }).click()
  await page.getByRole('textbox', { name: 'Title', exact: true }).click()
  await page
    .getByRole('textbox', { name: 'Title', exact: true })
    .fill('second cat new title')
  await page
    .locator('form')
    .filter({ hasText: 'IdTitleColorNoteIconSubmit' })
    .getByRole('button', { name: 'Submit' })
    .click()
  await page.getByText('second cat new title').click()
  await page.getByRole('button', { name: 'expand' }).click()
  await page.getByRole('button', { name: 'click to delete' }).click()
})
