import { expect } from '@playwright/test'

import { test } from '../fixture'

test('main', async ({ page, context, auth }) => {
  await page.goto('/categories')
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
