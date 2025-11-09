import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';
import UtilFunctions from '../utils/UtilFunctions';


export default class AuthPage extends BasePage {
  readonly createAccountLink: Locator;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly signInButton: Locator;
  readonly registrationHeading: Locator;
  readonly I_Agree_CheckBox: Locator;
  readonly utilFunctions: UtilFunctions;
  readonly loggedInUser: Locator;

   // Additional form fields
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly countryDropdown: Locator;
  readonly cityInput: Locator;
  readonly addressInput: Locator;
  readonly stateInput: Locator;
  readonly postalCodeInput: Locator;
  readonly phoneNumberInput: Locator;

  constructor(page: Page) {
    super(page);
    this.utilFunctions = new UtilFunctions(page)
    this.createAccountLink = page.getByRole('link', { name: 'CREATE NEW ACCOUNT' });
    this.usernameInput = page.locator('input[name="usernameRegisterPage"]');
    this.emailInput = page.locator('input[name="emailRegisterPage"]');
    this.passwordInput = page.locator('input[name="passwordRegisterPage"]');
    this.I_Agree_CheckBox = page.locator('input[name="i_agree"]')

    this.confirmPasswordInput = page.locator('input[name="confirm_passwordRegisterPage"]');
    this.registerButton = page.getByRole('button', { name: 'REGISTER' });
    this.signInButton = page.getByRole('button', { name: 'SIGN IN' });
    this.registrationHeading = page.getByRole('heading', { name: /create account/i })
    //homepage
     this.loggedInUser = page.locator('#menuUserLink span.hi-user');

     // Extended registration details
    this.firstNameInput = page.locator('input[name="first_nameRegisterPage"]');
    this.lastNameInput = page.locator('input[name="last_nameRegisterPage"]');
    this.countryDropdown = page.locator('select[name="countryListboxRegisterPage"]');
    this.cityInput = page.locator('input[name="cityRegisterPage"]');
    this.addressInput = page.locator('input[name="addressRegisterPage"]');
    this.stateInput = page.locator('input[name="state_/_province_/_regionRegisterPage"]');
    this.postalCodeInput = page.locator('input[name="postal_codeRegisterPage"]');
     this.phoneNumberInput = page.locator('input[name="phone_numberRegisterPage"]');
  }

  

  async openRegistrationForm() {
    await this.createAccountLink.click();
     await expect(this.registrationHeading).toBeVisible({ timeout: 15000 });
    // verify heading text content and verify URL contains #/register
    await this.utilFunctions.verifyHeadingVisible(this.registrationHeading, 'create account');
    await this.utilFunctions.verifyUrlContains('#/register')
  
  }

  
 async fillRegistrationFields(data: { [key: string]: string }) {
    await this.page.waitForLoadState('networkidle');

    const fieldMap: Record<string, Locator> = {
      username: this.usernameInput,
      email: this.emailInput,
      password: this.passwordInput,
      confirmPassword: this.confirmPasswordInput,
      firstName: this.firstNameInput,
      lastName: this.lastNameInput,
      phoneNumber: this.phoneNumberInput,
      country: this.countryDropdown,
      city: this.cityInput,
      address: this.addressInput,
      state: this.stateInput,
      pin: this.postalCodeInput,
    };

    for (const [key, value] of Object.entries(data)) {
      const field = fieldMap[key];
      if (!field) continue;

      if (key === 'country') {
        await field.selectOption({ label: value });
      } else {
        await expect(field).toBeVisible();
        await field.fill(value);
      }
      console.log(`Filled ${key}: ${value}`);
    }
  }

 async registerWithFields(data: { [key: string]: string }) {
    await this.fillRegistrationFields(data);
  }

  

 async verifyRegisterButtonDisabled() {
    await this.utilFunctions.verifyButtonDisabled(this.registerButton, 'Register button');
  }
 async verifyRegisterButtonEnabled() {
    await this.utilFunctions.verifyButtonEnabled(this.registerButton, 'Register button');
  }

   async verifyLoggedInUsername(expectedUsername: string) {
    await this.utilFunctions.verifyTextMatch(this.loggedInUser, expectedUsername, 'Username');
  }


}