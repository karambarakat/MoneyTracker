import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  use: {
    baseURL: 'http://localhost:4201',
  },
  fullyParallel: true,
  projects: [
    {
      name: 'setup',
      testMatch: /_.*\.setup\.ts/,
    },
    {
      name: 'base',
      expect: {},
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'base',
      expect: {},
      use: {
        ...devices['Desktop Firefox'],
      },
    },
  ],
  reporter: process.env.CI ? 'github' : 'list',
})
