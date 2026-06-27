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
  itemDetail: /https:\/\/www\.saucedemo\.com\/inventory-item\.html/,
  cart: /https:\/\/www\.saucedemo\.com\/cart\.html$/,
  checkoutStepOne: /https:\/\/www\.saucedemo\.com\/checkout-step-one\.html$/,
  checkoutStepTwo: /https:\/\/www\.saucedemo\.com\/checkout-step-two\.html$/,
  checkoutComplete: /https:\/\/www\.saucedemo\.com\/checkout-complete\.html$/,
};

const TEST_DATA = {
  username: 'standard_user',
  password: 'secret_sauce',
  firstName: '山田',
  lastName: '太郎',
  postalCode: '123-4567',
};

const TEST_ID = '003';

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

async function attachStepScreenshot(
  testInfo: TestInfo,
  page: Page,
  stepNo: number,
  stepName: string,
  fileKey: string,
) {
  await testInfo.attach(`Step ${stepNo}: ${stepName}`, {
    body: await page.screenshot({
      path: `screenshots/${TEST_ID}_${fileKey}.png`,
      fullPage: true,
    }),
    contentType: 'image/png',
  });
}

test('scenario.md based flow (order complete)', async ({ page }, testInfo) => {
  const pages: ScenarioPages = {
    loginPage: new LoginPage(page),
    inventoryPage: new InventoryPage(page),
    itemDetailPage: new ItemDetailPage(page),
    header: new Header(page),
    cartPage: new CartPage(page),
    checkoutStepOne: new CheckOutStepOne(page),
    checkoutStepTwo: new CheckOutStepTwo(page),
  };

  // Step 1: ログインページにアクセスしてログイン
  await pages.loginPage.goto();
  await expect(page).toHaveURL(URLS.login);

  await withElementRetry(page, async () => {
    await pages.loginPage.login(TEST_DATA.username, TEST_DATA.password);
  });
  await expect(page).toHaveURL(URLS.inventory);
  await attachStepScreenshot(testInfo, page, 1, 'ログイン完了', 'step1-login');

  // Step 2: TOPページから「Sauce Labs Backpack」の商品ページに遷移
  await withElementRetry(page, async () => {
    await pages.inventoryPage.goItemDetailPage('Sauce Labs Backpack');
  });
  await expect(page).toHaveURL(URLS.itemDetail);
  await attachStepScreenshot(testInfo, page, 2, 'Backpack詳細ページ遷移', 'step2-backpack-detail');

  // Step 3: 商品詳細ページで「Sauce Labs Backpack」をカゴに追加
  await withElementRetry(page, async () => {
    await pages.itemDetailPage.addToCart();
  });
  await attachStepScreenshot(testInfo, page, 3, 'Backpackをカゴに追加', 'step3-backpack-added');

  // Step 4: TOPページに遷移
  await withElementRetry(page, async () => {
    await pages.itemDetailPage.goBackToInventory();
  });
  await expect(page).toHaveURL(URLS.inventory);
  await attachStepScreenshot(testInfo, page, 4, 'TOPページ遷移', 'step4-inventory-back');

  // Step 5: TOPページで「Sauce Labs Bike Light」をカゴ追加
  await withElementRetry(page, async () => {
    await pages.inventoryPage.addToCart('Sauce Labs Bike Light');
  });
  await attachStepScreenshot(testInfo, page, 5, 'Bike Lightをカゴに追加', 'step5-bikelight-added');

  // Step 6: カゴページに遷移
  await withElementRetry(page, async () => {
    await pages.header.goToCartPage();
  });
  await expect(page).toHaveURL(URLS.cart);
  await attachStepScreenshot(testInfo, page, 6, 'カゴページ遷移', 'step6-cart-page');

  // Step 7: カゴ画面でチェックアウト
  await withElementRetry(page, async () => {
    await pages.cartPage.goToCheckout();
  });
  await expect(page).toHaveURL(URLS.checkoutStepOne);
  await attachStepScreenshot(testInfo, page, 7, 'チェックアウト開始', 'step7-checkout-step1');

  // Step 8: 名前と住所を入力し、continueする
  await withElementRetry(page, async () => {
    await pages.checkoutStepOne.fillCheckoutInformation(
      TEST_DATA.firstName,
      TEST_DATA.lastName,
      TEST_DATA.postalCode,
    );
  });
  await withElementRetry(page, async () => {
    await pages.checkoutStepOne.continue();
  });
  await expect(page).toHaveURL(URLS.checkoutStepTwo);
  await attachStepScreenshot(testInfo, page, 8, '情報入力完了', 'step8-checkout-step2');

  // Step 9: 注文を完了
  await withElementRetry(page, async () => {
    await pages.checkoutStepTwo.finish();
  });
  await expect(page).toHaveURL(URLS.checkoutComplete);
  await attachStepScreenshot(testInfo, page, 9, '注文完了', 'step9-order-complete');
});
