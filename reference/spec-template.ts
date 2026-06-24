import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ItemDetailPage } from '../pages/ItemDetailPage';
import { Header } from '../pages/Header';
import { CartPage } from '../pages/CartPage';
import { CheckOutStepOne } from '../pages/CheckOutStepOne';
import { CheckOutStepTwo } from '../pages/CheckOutStepTwo';

const URLS = {
  login: 'https://www.saucedemo.com/',
  inventory: /https:\/\/www\.saucedemo\.com\/inventory\.html$/,
};

const TEST_DATA = {
  username: 'standard_user',
  password: 'secret_sauce',
};

const TEST_ID = '001';

type ScenarioPages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  itemDetailPage: ItemDetailPage;
  header: Header;
  cartPage: CartPage;
  checkoutStepOne: CheckOutStepOne;
  checkoutStepTwo: CheckOutStepTwo;
};

async function withElementRetry(page: Page, action: () => Promise<void>) {
  try {
    await action();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const isElementNotFound = /locator|strict mode violation|waiting for|element/i.test(message);
    if (!isElementNotFound) {
      throw error;
    }

    await page.waitForLoadState('domcontentloaded');
    await action();
  }
}

async function attachStepScreenshot(testInfo: TestInfo, page: Page, stepNo: number, stepName: string, fileKey: string) {
  await testInfo.attach(`Step ${stepNo}: ${stepName}`, {
    body: await page.screenshot({
      path: `screenshots/${TEST_ID}_${fileKey}.png`,
      fullPage: true,
    }),
    contentType: 'image/png',
  });
}

test('scenario.md based flow (login minimal template)', async ({ page }, testInfo) => {
  const pages: ScenarioPages = {
    loginPage: new LoginPage(page),
    inventoryPage: new InventoryPage(page),
    itemDetailPage: new ItemDetailPage(page),
    header: new Header(page),
    cartPage: new CartPage(page),
    checkoutStepOne: new CheckOutStepOne(page),
    checkoutStepTwo: new CheckOutStepTwo(page),
  };

  await pages.loginPage.goto();
  await expect(page).toHaveURL(URLS.login);

  // Step 1: ログインする
  await withElementRetry(page, async () => {
    await pages.loginPage.login(TEST_DATA.username, TEST_DATA.password);
  });
  await expect(page).toHaveURL(URLS.inventory);
  await attachStepScreenshot(testInfo, page, 1, 'ログイン完了', 'step1-login');

  // 必要に応じて Step 2 以降を追加する。
  // 例: 商品詳細遷移 / カート投入 / チェックアウトなど。
});
