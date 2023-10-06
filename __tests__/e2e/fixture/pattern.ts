import { Page } from '@playwright/test'
import { User } from 'types/gql/graphql'

export interface UserInterface {
  email: string
  password: string
  displayName: string
}

export interface AuthUserInterface extends UserInterface {
  updatedAt: string
  createdAt: string
  providers: string
  id: string
  avatar: string
  token: string
}

export async function createUser(page: Page, info: UserInterface) {
  await page.goto('/')
  await page.getByRole('link', { name: 'Create an account' }).click()
  await page.getByLabel('Display Name').fill(info.displayName)
  await page.getByLabel('Email').fill(info.email)
  await page.getByLabel('Password', { exact: true }).fill(info.password)
  await page.getByLabel('Confirm The Password').fill(info.password)
  await page.getByRole('button', { name: 'Register' }).press('Enter')
}

// eslint-disable-next-line
const testTypescript = (cb: any) => {}

testTypescript(() => {
  type FrontendInfo = { password: string; token: string }
  null as unknown as AuthUserInterface satisfies User & FrontendInfo
})
