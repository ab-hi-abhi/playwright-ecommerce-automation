import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';
import { randomEmail, randomString, defaultPassword } from '../utils/testData';
import { UserDataManager } from '../utils/userDataManager';
import UtilFunctions from '../utils/UtilFunctions';
let home: HomePage;
let auth: AuthPage;
let utils: UtilFunctions;

test.describe('Registartion Tests', () => {

    test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    auth = new AuthPage(page);
    utils = new UtilFunctions(page);
  });

  test('Registartion : validate  new user registartion with only Required Fields', async ({ page }) => {

    await home.open();
    await home.openLogin();
    await auth.openRegistrationForm();
    
    const username = randomString('u');
    const email = randomEmail();
    const password = defaultPassword;
    
    await auth.registerWithFields({username, email, password , confirmPassword: password});
    //checking I agree check box
    await utils.checkCheckbox(auth.I_Agree_CheckBox, 'I Agree');
    //checking registerbutton is enabled after filling the from
    await auth.verifyRegisterButtonEnabled()
    await utils.clickButton(auth.registerButton, 'Register');

    await auth.verifyLoggedInUsername(username);

  });


  test('Registartion : validate  new user registartion with All Fields', async ({ page }) => {

    await home.open();
    await home.openLogin();
    await auth.openRegistrationForm();
    
    const username = randomString('u');
    const email = randomEmail();
    const password = defaultPassword;
    const firstName = randomString('FisrtName');
    const lastName = randomString('LastName');
    const Country = 'India'
    const city = 'calicut'
    const address = 'test address Uesr 1'
    const state = 'Kerala'
    const pin = '678901'
    const phoneNumber = '90899089908'
    
    //checking registerbutton is disabled before filling the from
    await auth.verifyRegisterButtonDisabled()
    await auth.registerWithFields({username, email, password,confirmPassword: password,firstName,lastName,Country,city,address,state,pin,phoneNumber});
        //checking I agree check box
    await utils.checkCheckbox(auth.I_Agree_CheckBox, 'I Agree');
    //checking registerbutton is enabled after filling the from
    await auth.verifyRegisterButtonEnabled()
    await utils.clickButton(auth.registerButton, 'Register');
    
    await auth.verifyLoggedInUsername(username);

    UserDataManager.addUser({ username, email, password});

  });

 

    test('Registartion : validate  that register Button Will be disabled Util user fill all required fields and check terms and condtion ', async ({ page }) => {

    await home.open();
    await home.openLogin();
    await auth.openRegistrationForm();
    
    const username = randomString('u');
    const email = randomEmail();
    const password = defaultPassword;
    // fill only user name and check register button is disabled
    await auth.registerWithFields({username});
    await utils.checkCheckbox(auth.I_Agree_CheckBox, 'I Agree');
    await auth.verifyRegisterButtonDisabled()
    
    // fill oonly user name and  password and check register button is disabled
    await auth.registerWithFields({username, password , confirmPassword: password});
    await utils.checkCheckbox(auth.I_Agree_CheckBox, 'I Agree');
    await auth.verifyRegisterButtonDisabled()

    // fill oonly user name , password and email and check register button is disabled
    await auth.registerWithFields({username, email, password , confirmPassword: password});
    await utils.uncheckCheckbox(auth.I_Agree_CheckBox, 'I Agree');
    await auth.verifyRegisterButtonDisabled()

    // now check I agree check box and verify register button is enabled
    await utils.checkCheckbox(auth.I_Agree_CheckBox, 'I Agree');
    await auth.verifyRegisterButtonEnabled()
    
    
  

  });
  
test('Registartion : Validate the inline error messages shown for password field', async ({ page }) => {

    await home.open();
    await home.openLogin();
    await auth.openRegistrationForm();

    // Fill password with less than required characters
    await auth.fillRegistrationFields({ password: 'ABC' });
    //clicking out side of the password field to trigger validation
    await page.locator('body').click();
    await utils.validateInlineErrorMessage(auth.passwordInput,"Use  4 character or longer")

    //Fill password without uppercase letter
    await auth.fillRegistrationFields({ password: 'abhi@12' });
    //clicking out side of the password field to trigger validation
    await page.locator('body').click();
    await utils.validateInlineErrorMessage(auth.passwordInput,"One upper letter required")


  //Fill password without number
    await auth.fillRegistrationFields({ password: 'Abhi' });
    //clicking out side of the password field to trigger validation
    await page.locator('body').click();
    await utils.validateInlineErrorMessage(auth.passwordInput,"One number required")

   
    //Fill password with more than 12 charectors
    await auth.fillRegistrationFields({ password: 'Abhi1234567890' });
    //clicking out side of the password field to trigger validation
    await page.locator('body').click();
    await utils.validateInlineErrorMessage(auth.passwordInput,"Use maximum 12 character")

    //Fill invalid email without domain
    await auth.fillRegistrationFields({ password: '' });
    //clicking out side of the password field to trigger validation
    await page.locator('body').click();
    await utils.validateInlineErrorMessage(auth.passwordInput,"Password field is required")

  });

  test('Registartion : Validate the inline error messages shown for Email field', async ({ page }) => {

    await home.open();
    await home.openLogin();
    await auth.openRegistrationForm();
    
    //Fill invalid email without @
    await auth.fillRegistrationFields({ email: 'abhi' });
    //clicking out side of the password field to trigger validation
    await page.locator('body').click();
    await utils.validateInlineErrorMessage(auth.emailInput,"Your email address isn't formatted correctly")
    
    //Fill invalid email without domain
    await auth.fillRegistrationFields({ email: 'abhi@' });
    //clicking out side of the password field to trigger validation
    await page.locator('body').click();
    await utils.validateInlineErrorMessage(auth.emailInput,"Your email address isn't formatted correctly")

    //Fill invalid email without domain
    await auth.fillRegistrationFields({ email: '' });
    //clicking out side of the password field to trigger validation
    await page.locator('body').click();
    await utils.validateInlineErrorMessage(auth.emailInput,"Email field is required")
    
  });


  
  test('Registartion : Validate the inline error for cherctor MAX limit in all fields', async ({ page }) => {

    await home.open();
    await home.openLogin();
    await auth.openRegistrationForm();
    
    //user name field with more than 15 charector
    await auth.fillRegistrationFields({ username: await utils.generateRandomString(16) });
    //clicking out side of the password field to trigger validation
    await page.locator('body').click();
    await utils.validateInlineErrorMessage(auth.usernameInput,"Use maximum 15 character")
    
   //First name field with more than 30 charector
    await auth.fillRegistrationFields({ firstName: await utils.generateRandomString(31) });
    //clicking out side of the password field to trigger validation
    await page.locator('body').click();
    await utils.validateInlineErrorMessage(auth.firstNameInput,"Use maximum 30 character")
    
    
  //Last name field with more than 30 charector
    await auth.fillRegistrationFields({ lastName: await utils.generateRandomString(31) });
    //clicking out side of the password field to trigger validation
    await page.locator('body').click();
    await utils.validateInlineErrorMessage(auth.lastNameInput ,"Use maximum 30 character")


    //phone number field with more than 20 charector
    await auth.fillRegistrationFields({ phoneNumber : await utils.generateRandomString(21) });
    //clicking out side of the password field to trigger validation
    await page.locator('body').click();
    await utils.validateInlineErrorMessage(auth.phoneNumberInput,"Use maximum 20 character")


   //city field with more than 25 charector
    await auth.fillRegistrationFields({ city : await utils.generateRandomString(26) });
    //clicking out side of the password field to trigger validation
    await page.locator('body').click();
    await utils.validateInlineErrorMessage(auth.cityInput,"Use maximum 25 character")

    //Address with more than 50 charector
    await auth.fillRegistrationFields({ address : await utils.generateRandomString(51) });
    //clicking out side of the password field to trigger validation
    await page.locator('body').click();
    await utils.validateInlineErrorMessage(auth.addressInput,"Use maximum 50 character")

    //state with more than 10 charector
    await auth.fillRegistrationFields({ state : await utils.generateRandomString(11) });
    //clicking out side of the password field to trigger validation
    await page.locator('body').click();
    await utils.validateInlineErrorMessage(auth.stateInput,"Use maximum 10 character")

   //pin with more than 10 charector
    await auth.fillRegistrationFields({ pin : await utils.generateRandomString(11) });
    //clicking out side of the password field to trigger validation
    await page.locator('body').click();
    await utils.validateInlineErrorMessage(auth.postalCodeInput,"Use maximum 10 character")



  });


   test('Registartion : Validate error Message shown When password and confirm password are mismatch', async ({ page }) => {

    await home.open();
    await home.openLogin();
    await auth.openRegistrationForm();
    

     //Fill password without uppercase letter
    await auth.fillRegistrationFields({ password: 'Abhi@12' , confirmPassword:'Abhi@89' });
    //clicking out side of the password field to trigger validation
    await page.locator('body').click();
    await utils.validateInlineErrorMessage(auth.confirmPasswordInput,"Passwords do not match")

    
    
  });




});