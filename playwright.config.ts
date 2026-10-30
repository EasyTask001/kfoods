import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['html', { outputFolder: 'artifacts/playwright-report', open: 'never' }]],
  outputDir: 'artifacts/test-results',
  use: {
    baseURL: process.env.TEST_BASE_URL || 'http://127.0.0.1:18766',
    browserName: 'chromium',
    launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || '/usr/bin/google-chrome' },
    trace: 'retain-on-failure',
  },
})
