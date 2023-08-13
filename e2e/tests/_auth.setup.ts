import { test as setup, expect } from '@playwright/test'

setup('init e2e', async ({ request }) => {
  // clean database
  await request.get('http://localhost:4202')
})
