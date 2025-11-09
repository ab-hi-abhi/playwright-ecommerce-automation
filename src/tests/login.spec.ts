import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';
import { randomEmail, randomString, defaultPassword } from '../utils/testData';
import { UserDataManager } from '../utils/userDataManager';
import UtilFunctions from '../utils/UtilFunctions';
import LoginPage from '../pages/loginPage'
let home: HomePage;
let auth: AuthPage;
let utils: UtilFunctions;
let loginPage : LoginPage
test.describe('Login Page Tests', () => {

    test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    auth = new AuthPage(page);
    utils = new UtilFunctions(page);
    loginPage = new LoginPage(page);
  });

  test('Login : validate  Login Modal contents', async ({ page }) => {

    await home.open();
    await home.openLogin();
    
    //check the presents of elements 
    await loginPage.validate_Login_ModelContents();
  });

  test('Login : validate login with in valid username and password should show error', async ({ page }) => {

    await home.open();
    await home.openLogin();
    await loginPage.FillLoginForm({ username: 'test_user', password: 'Test@123' });
    await utils.clickButton(loginPage.signInButton,"Sign-In Button");
    await utils.verifyTextMatch(loginPage.SiginInResult,"Incorrect user name or password.","Login error")
     
  });


    test('Login : validate Login button will be disabled util Both Username and paswords are filled', async ({ page }) => {

    await home.open();
    await home.openLogin();
    //giving username only and checking button disbled or not
    await loginPage.FillLoginForm({ username: 'test_user'});
    await utils.verifyButtonDisabled(loginPage.signInButton,"Sign-in button")
     
    //giving password only and checking button
    await loginPage.FillLoginForm({ username: '',password: 'Test@123' });
    await utils.verifyButtonDisabled(loginPage.signInButton,"Sign-in button")
   
    //giving both username and password
    await loginPage.FillLoginForm({ username: 'test_user', password: 'Test@123' });
    await utils.verifyButtonEnabled(loginPage.signInButton,"Sign-in button")

  });

    test('Login : validate Login With Valid Username and password', async ({ page }) => {

    await home.open();
    await home.openLogin();

    const user = UserDataManager.getLastUser();
    if (!user) {
    throw new Error('No users found in users.json. Please run the registration test first.');
     }

    await loginPage.FillLoginForm({ username: user.username, password: user.password });
    await utils.clickButton(loginPage.signInButton,"Sign in Button")
    await auth.verifyLoggedInUsername(user.username);
    await utils.verifyUrlContains("/#/")

  });


    test('Log-Out : validate successfull logout', async ({ page }) => {

    await home.open();
    await home.openLogin();

    const user = UserDataManager.getLastUser();
    if (!user) {
    throw new Error('No users found in users.json. Please run the registration test first.');
     }

    await loginPage.FillLoginForm({ username: user.username, password: user.password });
    await utils.clickButton(loginPage.signInButton,"Sign in Button")
    await auth.verifyLoggedInUsername(user.username);
    await utils.verifyUrlContains("/#/")

    //clicking user name and clking sign out button
    
    await utils.clickButton(loginPage.loggedInUser,"User Name")
    await utils.clickButton(loginPage.LogoutLink,"Sing-Out")
    
    //checking after logout logged in username also disappeard
    await page.waitForLoadState("networkidle")
     await auth.verifyLoggedInUsername('');


  });
  

});