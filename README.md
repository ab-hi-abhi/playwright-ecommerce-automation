# 🧪 Playwright E-Commerce Automation Suite (TypeScript)

This project automates end-to-end test scenarios for the **Advantage Online Shopping** demo application using **Playwright** with **TypeScript**.  
The suite validates key user journeys such as registration, login, product selection, and checkout using a **Page Object Model (POM)** design.

---

## 📋 Prerequisites

Before setting up the project, ensure the following software is installed on your system:

- **Node.js** (version 18 or above)  
  [Download Node.js](https://nodejs.org/en/download/)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)
- **Internet connection** (for accessing the demo site)

To verify installation:
```bash
node -v
npm -v
```

---

## ⚙️ Setup Instructions

1️⃣ **Clone the repository**
```bash
git clone <your-repo-url>
cd playwright-advantage
```

2️⃣ **Install dependencies**
```bash
npm install
```

3️⃣ **Install Playwright browsers**
```bash
npx playwright install
```

4️⃣ **Verify project structure**

```
src/
 ├── pages/         # Page Object files
 ├── tests/         # Test specifications
 ├── utils/         # Utility functions and helpers
 └── data/          # Test data (users.json)
playwright.config.ts
tsconfig.json
package.json
README.md
```

---

## ▶️ Test Execution

### Run all tests (default)
```bash
npx playwright test
```

### Run tests in a specific browser
```bash
npx playwright test --project=chromium
```

### Run tests in headed (visible browser) mode
```bash
npx playwright test --headed
```

### Run a specific test file
```bash
npx playwright test src/tests/login.spec.ts
```

### View the HTML test report
```bash
npx playwright show-report
```

---

## ⚙️ Configuration Details

### `playwright.config.ts`
Key configurations:
```ts
export default defineConfig({
  workers: 2, // limits parallel browser instances to 2
  use: {
    baseURL: 'https://www.advantageonlineshopping.com/',
    headless: true,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } }
  ],
});
```

---

## 🧩 Test Scenarios Covered

1. **User Registration**
   - Register a new user with required and all fields.
   - Validate heading and URL for the registration page.
   - Verify the register button is disabled before form completion.
   - Store created user credentials in `users.json`.
   - Error Message Validations

2. **User Login**
   - Login using credentials from `users.json`.
   - Validate invalid login attempts and error handling.
   - Verify button state changes (enabled/disabled).
   - Error Message Validations

3. **Product and Checkout Flow**
   - Navigate to product categories (Speakers, Headphones, etc.).
   - Validate product details page (name, price, images).
   - Add product to cart and verify redirection for guest users.

---

## 🧰 Utility Functions

The `UtilFunctions.ts` file includes:
- `verifyButtonEnabled()` / `verifyButtonDisabled()`
- `verifyTextMatch()` / `verifyElementPresence()`
- `checkCheckbox()` / `uncheckCheckbox()`
- `clickButton()`
- `waitForAllBackgroundImagesToLoad()`

These ensure consistent, assertion-based validation across all pages.

---

## 📦 Data Handling

User credentials are stored in `src/data/users.json`:
```json
{
  "users": [
    {
      "username": "test_user1",
      "email": "test_user1@example.com",
      "password": "Test@123"
    }
  ]
}
```

Newly registered users are automatically appended via `UserDataManager`.

---

## ✅ Expected Outcome

After running the suite:
- All user journeys execute successfully.
- HTML reports and traces are available under `playwright-report/`.
- User credentials persist in `users.json` for reuse.

---

## 🚀 Troubleshooting

| Issue | Cause | Solution |
|--------|--------|-----------|
| `net::ERR_CONNECTION_TIMED_OUT` | Demo site not reachable | Check your internet connection or retry later. |
| `EADDRINUSE` | Port already in use | Stop existing Playwright or Node processes. |
| `Cannot find module 'fs'` | Missing Node type declarations | Run `npm i -D @types/node`. |
| Tests not opening | Missing browsers | Run `npx playwright install`. |

---

## 👨‍💻 Author

**Abhinav K**  
QA Automation Engineer | Playwright | TypeScript
