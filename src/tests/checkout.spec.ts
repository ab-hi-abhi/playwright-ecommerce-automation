import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import UtilFunctions from '../utils/UtilFunctions';
import { UserDataManager } from '../utils/userDataManager';
import LoginPage from '../pages/loginPage'
import AuthPage from '../pages/AuthPage';

let home: HomePage;
let auth: AuthPage;
let utils: UtilFunctions;
let loginPage : LoginPage
let product : ProductPage
let cart : CartPage
let checkout : CheckoutPage

test.describe('Cart & Checkout flows', () => {

   test.beforeEach(async ({ page }) => {
      home = new HomePage(page);
      auth = new AuthPage(page);
      utils = new UtilFunctions(page);
      loginPage = new LoginPage(page);
      product = new ProductPage(page);
      cart = new CartPage(page);
      checkout = new CheckoutPage(page);
    });

  test('Add to Cart : validate user is able to add a prodcut to cart Without any credntial', async ({ page }) => {
   
  
    const prodcut_name = "HP ROAR MINI WIRELESS SPEAKER"

    await home.open();  

    
    await utils.clickButton(home.Speakers,"Speakers")
    await product.selectProductByName(prodcut_name)
    
    // check that correct prodcut details page is shown
    await cart.product_Heading_in_Add_to_Cart.waitFor({state : 'visible'})
    await utils.verifyElementContainsText(cart.product_Heading_in_Add_to_Cart,prodcut_name,"Product heading")
    await utils.clickButton(cart.add_to_cartBtn,"Add to Cart button")
    
    //check cart tooltip for added podcut is visible
    await utils.verifyElementPresence(cart.ToolTip_cart,"tooltip for cart")
    await utils.verifyElementContainsText(cart.ToolTip_cart.locator('h3'),prodcut_name,"Prodcut Name in cart Tooltip")


  });

  test('Check out product : user without intial Login', async ({ page }) => {
   
  
    const prodcut_name = "HP ROAR MINI WIRELESS SPEAKER"

    await home.open();  

    await utils.clickButton(home.Speakers,"Speakers")
    await product.selectProductByName(prodcut_name)
    
    await cart.product_Heading_in_Add_to_Cart.waitFor({state : 'visible'})
    await utils.verifyElementContainsText(cart.product_Heading_in_Add_to_Cart,prodcut_name,"Product heading")
    await utils.clickButton(cart.add_to_cartBtn,"Add to Cart button")

    // open cart
    await utils.clickButton(home.cartIcon,"Cart Icon Button")
    //checking car is open
    await utils.verifyUrlContains('#/shoppingCart')
    // checking selected product item present in the cart 
    await utils.verifyElementContainsText(cart.cartItemName,prodcut_name,"Cart Item")

    await utils.clickButton(cart.checkoutBtn,"Check out button")

    //validate user redirect to login
    await utils.verifyUrlContains('#/login')

    //providing correct value and login
    const user = UserDataManager.getLastUser();
          if (!user) {
          throw new Error('No users found in users.json. Please run the registration test first.');
           }
     await checkout.usernameInOrderPayment.fill(user.username)
     await checkout.passwordInOrderPayment.fill(user.password)
     await utils.clickButton(checkout.loginButton_InOrderPayment,"Login Button")


     //checking successfully logged and shippin details , payment section shown
     await utils.verifyElementPresence(checkout.Tab_PaymentMethod,"Tab_PaymentMethod",true)
     await utils.verifyElementPresence(checkout.Tab_shippingDetails,"Tab_shippingDetails",true)

     // click payument tab 
      await utils.clickButton(checkout.Tab_PaymentMethod,"Tab Payment")

      //check payment method section visble
      await utils.verifyElementPresence(checkout.Payment_Selection,"Payment Selection")

      //stoping the test here since the application wont wok even if we provid einputs

  });

  test('Check out product : Proceed to checkout as a logged-in user', async ({ page }) => {
   
  
    const prodcut_name = "HP ROAR MINI WIRELESS SPEAKER"

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

    await utils.clickButton(home.Speakers,"Speakers")
    await product.selectProductByName(prodcut_name)
    
    await cart.product_Heading_in_Add_to_Cart.waitFor({state : 'visible'})
    await utils.verifyElementContainsText(cart.product_Heading_in_Add_to_Cart,prodcut_name,"Product heading")
    await utils.clickButton(cart.add_to_cartBtn,"Add to Cart button")

    // open cart
    await utils.clickButton(home.cartIcon,"Cart Icon Button")
    //checking car is open
    await utils.verifyUrlContains('#/shoppingCart')
    // checking selected product item present in the cart 
    await utils.verifyElementContainsText(cart.cartItemName,prodcut_name,"Cart Item")

    await utils.clickButton(cart.checkoutBtn,"Check out button")

     //checking shippin details , payment section shown
     await utils.verifyElementPresence(checkout.Tab_PaymentMethod,"Tab_PaymentMethod",true)
     await utils.verifyElementPresence(checkout.Tab_shippingDetails,"Tab_shippingDetails",true)

     // click payument tab 
      await utils.clickButton(checkout.Tab_PaymentMethod,"Tab Payment")

      //check payment method section visble
      await utils.verifyElementPresence(checkout.Payment_Selection,"Payment Selection")

      //stoping the test here since the application wont wok even if we provid einputs

  });




});