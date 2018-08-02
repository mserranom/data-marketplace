import createDriver, { wait } from "./driver";
import { deleteUser, getUser, TEST_USER_NAME, TEST_USER_PASS } from "./debug";

let driver;

beforeEach(async () => {
  driver = createDriver();
  await driver.open();
});
afterEach(async () => {
  await driver.close();
});

describe("signup", () => {
  test(
    "signup button opens signup form",
    async () => {
      await driver.header.openSignupForm();
    },
    16000
  );
  test(
    "'proceed with signup' button is disabled until form inputs are filled",
    async () => {
      await driver.header.openSignupForm();
      expect(await driver.signupForm.signupButtonIsDisabled()).toBe(true);
      await driver.signupForm.fill(
        "new_user_42461",
        "G5127sfs$SDG_",
        "mserranom@gmail.com"
      );
      expect(await driver.signupForm.signupButtonIsDisabled()).toBe(false);
    },
    16000
  );

  test(
    "'proceed with signup' button is disabled after being clicked",
    async () => {
      await driver.header.openSignupForm();
      await driver.signupForm.fill("aa", "bb", "cc");
      expect(await driver.signupForm.signupButtonIsDisabled()).toBe(false);
      await driver.signupForm.clickSignupButton();
      expect(await driver.signupForm.signupButtonIsDisabled()).toBe(true);
    },
    16000
  );

  test("on invalid data input an error message is displayed", async () => {
    await driver.header.openSignupForm();
    await driver.signupForm.fill("aa", "bb", "cc");
    await driver.signupForm.clickSignupButton();
    expect(await driver.signupForm.errorMessage()).toBe(
      "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6"
    );
  });

  describe("tests requiring cleanup", () => {
    const TEST_USER = "new_user_42461";

    afterEach(async () => {
      try {
        await deleteUser(TEST_USER);
      } catch (err) {
        //no need to catch
      }
    });

    test(
      "signup confirmation is displayed after signing up",
      async () => {
        await driver.header.openSignupForm();
        await driver.signupForm.fill(
          TEST_USER,
          "G5127sfs$SDG_",
          "mserranom+test@gmail.com"
        );
        await driver.signupForm.clickSignupButton();
        await driver.signupConfirmationForm.isVisible();
      },
      16000
    );

    test(
      "'confirm signup' button is disabled until form inputs are filled",
      async () => {
        await driver.header.openSignupForm();
        await driver.signupForm.fill(
          TEST_USER,
          "G5127sfs$SDG_",
          "mserranom+test@gmail.com"
        );
        await driver.signupForm.clickSignupButtonAndWaitForConfirmation();
        expect(
          await driver.signupConfirmationForm.signupConfirmationButtonIsDisabled()
        ).toBe(true);

        await driver.signupConfirmationForm.fill("321");

        expect(
          await driver.signupConfirmationForm.signupConfirmationButtonIsDisabled()
        ).toBe(false);
      },
      16000
    );

    test(
      "'confirm signup' button is disabled after being clicked",
      async () => {
        await driver.header.openSignupForm();
        await driver.signupForm.fill(
          TEST_USER,
          "G5127sfs$SDG_",
          "mserranom+test@gmail.com"
        );
        await driver.signupForm.clickSignupButtonAndWaitForConfirmation();
        await driver.signupConfirmationForm.fill("321");

        expect(
          await driver.signupConfirmationForm.signupConfirmationButtonIsDisabled()
        ).toBe(false);
        await driver.signupConfirmationForm.clickSignupConfirmationButton();
        expect(
          await driver.signupConfirmationForm.signupConfirmationButtonIsDisabled()
        ).toBe(true);
      },
      16000
    );
  });
});

describe("login", () => {
  beforeAll(async () => {
    const user = await getUser(TEST_USER_NAME);
    expect(user).not.toBeFalsy();
  });

  test(
    "login button opens login form",
    async () => {
      await driver.header.openLoginForm();
    },
    16000
  );

  test(
    "'proceed with login' button is disabled until form inputs are filled",
    async () => {
      await driver.header.openLoginForm();
      expect(await driver.loginForm.loginButtonIsDisabled()).toBe(true);
      await driver.loginForm.fill("aa", "bb");
      expect(await driver.loginForm.loginButtonIsDisabled()).toBe(false);
    },
    16000
  );

  test(
    "'proceed with login' button is disabled after being clicked",
    async () => {
      await driver.header.openLoginForm();
      await driver.loginForm.fill(TEST_USER_NAME, TEST_USER_PASS);
      await driver.loginForm.clickLoginButton();
      expect(await driver.loginForm.loginButtonIsDisabled()).toBe(true);
    },
    16000
  );

  test(
    "login form closes after successful login",
    async () => {
      await driver.header.openLoginForm();
      await driver.loginForm.fill(TEST_USER_NAME, TEST_USER_PASS);
      await driver.loginForm.clickLoginButton();
      await driver.loginForm.waitUntilFormIsClosed();
    },
    16000
  );

  describe("login errors", () => {
    test("on invalid credentials an error message is displayed", async () => {
      await driver.header.openLoginForm();
      await driver.loginForm.fill("foo", "bar");
      await driver.loginForm.clickLoginButton();
      expect(await driver.loginForm.errorMessage()).toBe(
        "User does not exist."
      );
    });

    test("after a login error the 'proceed with login' button is reenabled", async () => {
      await driver.header.openLoginForm();
      await driver.loginForm.fill("foo", "bar");
      await driver.loginForm.clickLoginButton();
      expect(await driver.loginForm.loginButtonIsDisabled()).toBe(true);
      await driver.loginForm.waitUntilLoginButtonIsEnabled();
    });
  });
});

test(
  "user can signout",
  async () => {
    // login first
    await driver.header.openLoginForm();
    await driver.loginForm.fill(TEST_USER_NAME, TEST_USER_PASS);
    await driver.loginForm.clickLoginButton();
    await driver.loginForm.waitUntilFormIsClosed();

    // signout
    await driver.header.clickSignOut();
    await driver.header.waitUntilSignupAndLoginButtonsAreVisible();
  },
  16000
);
