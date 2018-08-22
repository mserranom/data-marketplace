//https://medium.com/@dalvifahim/network-throttling-in-puppeteer-e23170ff18f0

import puppeteer from "puppeteer";

const APP = "http://localhost:3000";

const width = 1024;
const height = 768;

export const wait = ms =>
  new Promise(resolve => setTimeout(() => resolve(), ms));

export default function createDriver() {
  let browser;
  let page;
  return {
    open: async () => {
      browser = await puppeteer.launch({
        // uncomment for debugging
        // headless: false,
        // slowMo: 100,
        // devtools: true,
        args: [`--window-size=${width},${height}`]
      });
      page = await browser.newPage();
      await page.setViewport({ width, height });
      await page.goto(APP);
    },
    close: async () => {
      await browser.close();
    },
    header: {
      openSignupForm: async () => {
        await page.click("#signupButton");
        await page.waitForSelector("#signupForm");
      },
      openLoginForm: async () => {
        await page.click("#loginButton");
        await page.waitForSelector("#loginForm");
      },
      clickSignOut: async () => {
        await page.click("#profileDropDown");
        await page.click("#signoutLink");
      },
      waitUntilSignupAndLoginButtonsAreVisible: async () => {
        await page.waitForSelector("#signupButton");
        await page.waitForSelector("#loginButton");
      }
    },
    loginForm: {
      fill: async (username, password) => {
        await page.click("#loginUsernameInput");
        await page.keyboard.type(username);
        await page.click("#loginPasswordInput");
        await page.keyboard.type(password);
      },
      clickLoginButton: async () => {
        await page.click("#loginProceedButton");
      },

      loginButtonIsDisabled: async () => {
        const loginButton = await page.$("#loginProceedButton");
        const valueHandle = await loginButton.getProperty("disabled");
        const value = await valueHandle.jsonValue();
        return value == true;
      },
      waitUntilLoginButtonIsEnabled: async () => {
        //TODO: fix this copy paste, write a proper polling using puppeteer apis
        for (let i = 0; i < 15; i++) {
          const signupButton = await page.$("#loginProceedButton");
          const property = await signupButton.getProperty("disabled");
          const value = await property.jsonValue();
          if (!value) {
            return true;
          }
          await wait(300);
        }
        return false;
      },
      waitUntilFormIsClosed: async () => {
        await page.waitForSelector("#loginProceedButton", { hidden: true });
      },
      errorMessage: async () => {
        const alert = await page.waitForSelector("#loginErrorAlert");
        const property = await alert.getProperty("innerText");
        return await property.jsonValue();
      }
    },
    signupForm: {
      fill: async (username, password, email) => {
        await page.click("#signupUsernameInput");
        await page.keyboard.type(username);
        await page.click("#signupUsernamePassword");
        await page.keyboard.type(password);
        await page.click("#signupUsernameEmail");
        await page.keyboard.type(email);
      },
      clickSignupButton: async () => {
        await page.click("#signupUsernameProceedButton");
      },

      clickSignupButtonAndWaitForConfirmation: async () => {
        await page.click("#signupUsernameProceedButton");
        await page.waitForSelector("#confirmSignupButton");
      },

      signupButtonIsDisabled: async () => {
        const signupButton = await page.$("#signupUsernameProceedButton");
        const property = await signupButton.getProperty("disabled");
        const value = await property.jsonValue();
        return value == true;
      },
      errorMessage: async () => {
        const alert = await page.waitForSelector("#signupErrorAlert");
        const property = await alert.getProperty("innerText");
        return await property.jsonValue();
      }
    },
    signupConfirmationForm: {
      isVisible: async () => {
        await page.waitForSelector("#confirmSignupButton");
      },
      fill: async code => {
        await page.click("#signupConfirmationCodeInput");
        await page.keyboard.type(code);
      },

      signupConfirmationButtonIsDisabled: async () => {
        const signupButton = await page.$("#confirmSignupButton");
        const valueHandle = await signupButton.getProperty("disabled");
        const value = await valueHandle.jsonValue();
        return value == true;
      },

      clickSignupConfirmationButton: async () => {
        await page.click("#confirmSignupButton");
      }
    }
  };
}
