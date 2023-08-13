import { Page, test as base, expect } from '@playwright/test'

interface Extensions {
  authenticated: { username: string; password: string; email: string }
  withSomeData: object
}

async function createUser(
  page: Page,
  info: { username: string; password: string; email: string },
) {
  await page.goto('/')
  await page.getByRole('link', { name: 'Create an account' }).click()
  await page.getByLabel('Display Name').fill(info.username)
  await page.getByLabel('Email').fill(info.email)
  await page.getByLabel('Password', { exact: true }).fill(info.password)
  await page.getByLabel('Confirm The Password').fill(info.password)
  await page.getByRole('button', { name: 'Register' }).press('Enter')
}

export const test = base.extend<Extensions>({
  // not used yet
  authenticated: async ({ browser, baseURL }, use, workerInfo) => {
    const username = 'user-e' + workerInfo.workerIndex
    const email = 'user-e' + workerInfo.workerIndex + '@gmail.com'
    const password = 'verysecure'

    const page = await browser.newPage()
    await createUser(page, { username, password, email })
    await page.close()

    await use({ username, password, email })
  },
  withSomeData: async ({ request, context }, use, workerInfo) => {
    // data to commit
    const data1 = { title: 'new title' }

    // commit data
    const userPage = await context.newPage()
    await userPage.close()

    // pass data to the test
    await use({ data1 })

    // clear after test
    await request.get('http://localhost:4202/removeDataForCurrentUser')
  },
})

export { expect }
