import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './src/tests',
  timeout: 60000,
  workers: 2,
  expect: { timeout: 10000 },
  reporter: [['list'], ['html', { open: 'on-failure' }]],
  use: {
    headless: false,
    ignoreHTTPSErrors: true,
    baseURL: 'https://www.advantageonlineshopping.com'
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }
    }
  ]
};
export default config;