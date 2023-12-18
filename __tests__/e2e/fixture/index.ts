import { Page, test as base, expect } from '@playwright/test'
import { AuthUserInterface, UserInterface, createUser } from './pattern'
import { BACKEND, HELPER, HELPER_CLEAN_USER } from '../constants'

interface Extensions {
  unAuth: { user: string }
  auth: { user: AuthUserInterface; token: string }
}

export const test = base.extend<Extensions>({
  unAuth: [
    async ({}, use, workerInfo) => {
      const user = 'user-' + workerInfo.workerIndex

      await use({ user })
    },
    { scope: 'worker' as never },
  ],

  auth: async ({ browser, request, context }, use, workerInfo) => {
    const unAuthUser: UserInterface = {
      displayName: 'user-e' + workerInfo.workerIndex,
      email: 'user-e' + workerInfo.workerIndex + '@gmail.com',
      password: 'verysecure',
    }
    const page = await browser.newPage()

    let user = undefined as any
    let token = undefined as any

    context.route(BACKEND + '/auth/local/register', async route => {
      const response = await route.fetch()
      const json = await response.json()
      user = json
      token = response.headers()['X-Token']

      route.fulfill({ response, json })
    })

    await createUser(page, unAuthUser)

    expect(user).toBeDefined()
    expect(token).toBeDefined

    await page.close()

    await use({ user, token })

    await request.get(HELPER_CLEAN_USER(user.email))
  },
})
