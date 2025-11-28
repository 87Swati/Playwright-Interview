// @ts-check
const { defineConfig, devices, chromium } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config= defineConfig({
  testDir: './tests',
  // default time out is 30 second
  timeout: 30*1000,
  expect:{
    timeout: 5000,
  },
  reporter: 'html',
  /* Run tests in files in parallel */
  
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',//off //on //only-on-failure
    trace: 'retain-on-failure',//off //on //retain-on-failure
    viewport: { width: 1280, height: 720 },
   
  },

  
});
module.exports= config

