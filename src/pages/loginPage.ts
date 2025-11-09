import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';
import UtilFunctions from '../utils/UtilFunctions';

export default class LoginPage extends BasePage {
  readonly utilFunctions: UtilFunctions;

  readonly RemeberMe_CheckBox: Locator;
  readonly Login_usernameInput: Locator;
  readonly Login_passwordInput: Locator;
  readonly signInButton: Locator;
  readonly createAccountLink: Locator;
  readonly loggedInUser: Locator;
  readonly Icon_Advantage: Locator;
  readonly loginHeading: Locator;
  readonly forgot_pswd_link: Locator;
  readonly SiginInResult: Locator;
  readonly LogoutLink: Locator;

  

  constructor(page: Page) {
    super(page);
    this.utilFunctions = new UtilFunctions(page);

    // Login form locators
    this.Icon_Advantage = page.locator('div.login img[src*="logo.png"]')
    this.Login_usernameInput = page.locator('input[name="username"]')
    this.Login_passwordInput = page.locator('input[name="password"]');
    this.signInButton = page.locator('#sign_in_btn');
    this.RemeberMe_CheckBox = page.locator('input[name="remember_me"]')

    // Navigation and related elements
    this.forgot_pswd_link =page.getByRole('link', { name: 'Forgot your password?' });
    this.createAccountLink = page.getByRole('link', { name: 'CREATE NEW ACCOUNT' });

    // Verification elements
    this.loggedInUser = page.locator('#menuUserLink span.hi-user');
    this.loginHeading = page.getByRole('heading', { name: /user login/i });
    this.SiginInResult = page.locator('#signInResultMessage')
    this.LogoutLink = page.getByRole('link', { name: 'Sign out' });
  
  }

   async validate_Login_ModelContents(){

    await this.utilFunctions.verifyElementPresence(this.Icon_Advantage,"Icon_Advantage")
    await this.utilFunctions.verifyElementPresence(this.Login_usernameInput,"Username Text Field")    
    await this.utilFunctions.verifyElementPresence(this.Login_passwordInput,"Password Text Field")
    await this.utilFunctions.verifyElementPresence(this.signInButton,"Sign In Button")
    await this.utilFunctions.verifyElementPresence(this.RemeberMe_CheckBox,"RemeberMe_CheckBox")
    await this.utilFunctions.verifyElementPresence(this.forgot_pswd_link,"forgot_pswd_link")
    await this.utilFunctions.verifyElementPresence(this.createAccountLink,"createAccountLink")

    
   }

   async fillLoginFields(data: { [key: string]: string }) {
  await this.page.waitForLoadState('networkidle');

  const fieldMap: Record<string, Locator> = {
    username: this.Login_usernameInput,
    password: this.Login_passwordInput,
  };

  for (const [key, value] of Object.entries(data)) {
    const field = fieldMap[key];
    if (!field) continue;

    await expect(field).toBeVisible();
    await field.fill(value);
    console.log(`Filled ${key}: ${value}`);
  }
}

async  FillLoginForm(data: { [key: string]: string }) {
  await this.fillLoginFields(data);
}

}
