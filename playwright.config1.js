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
const config = defineConfig({
  testDir: './tests',
  // default time out is 30 second
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  use: {
    viewport:null,
  },
   // fullyParallel: true,  
  /* Run tests in files in parallel */


    


  projects: [
    {
      name: 'Testing on Chrome',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'only-on-failure',//off //on //only-on-failure
        trace: 'retain-on-failure',//off //on //retain-on-failure
        viewport: { width: 720, height: 720 },
        //...devices[' Desktop Chrome' ],
        ignoreHTTPSErrors: true,
        permissions: ['geolocation', 'notifications', 'midi', 'camera', 'microphone' ],
        video: 'retain-on-failure',   
      
            

      },
    },  
    {

      name: 'Testing on Firefox ',
      use: {
        browserName: 'firefox',
        headless: true,
        screenshot: 'only-on-failure',//off //on //only-on-failure
        trace: 'retain-on-failure',//off //on //retain-on-failure
        viewport: { width: 1280, height: 720 },
      },

    },
    {
      name: 'Testing on Webkit',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'only-on-failure',//off //on //only-on-failure
        trace: 'retain-on-failure',//off //on //retain-on-failure
      
...devices['iphone 12'],

      }
    }
  ],
});
module.exports = config

