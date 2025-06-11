import { type PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: 'e2e',
  use: {
    baseURL: 'http://localhost:3000',
    browserName: 'chromium',
    headless: true,
  },
  webServer: {
    command: 'PORT=3000 pnpm --filter site dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
}
export default config
