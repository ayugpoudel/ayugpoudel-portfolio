import { defineConfig, devices } from '@playwright/test';
const deploymentURL = process.env.PLAYWRIGHT_BASE_URL;
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  timeout: 45000,
  use: {
    baseURL: deploymentURL || 'http://127.0.0.1:3000',
    channel: process.env.CI ? undefined : 'chrome',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } },
    },
  ],
  reporter: 'list',
  webServer: deploymentURL
    ? undefined
    : {
        command: 'npm run start',
        url: 'http://127.0.0.1:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
      },
});
