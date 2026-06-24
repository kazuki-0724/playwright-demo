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
  itemDetail: /https:\/\/www\.saucedemo\.com\/inventory-item\.html\?id=\d+$/,
  cart: /https:\/\/www\.saucedemo\.com\/cart\.html$/,
  checkoutStepOne: /https:\/\/www\.saucedemo\.com\/checkout-step-one\.html$/,
  checkoutStepTwo: /https:\/\/www\.saucedemo\.com\/checkout-step-two\.html$/,
  checkoutComplete: /https:\/\/www\.saucedemo\.com\/checkout-complete\.html$/,
};

const TEST_DATA = {
  username: 'standard_user',
  password: 'secret_sauce',
  backpackName: 'Sauce Labs Backpack',
  bikeLightName: 'Sauce Labs Bike Light',
  firstName: '太郎',
  lastName: '山田',
  postalCode: '123-4567',
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

  await pages.loginPage.goto();
  await expect(page).toHaveURL(URLS.login);

  await test.step('Step 1: ログインする', async () => {
    await withElementRetry(page, async () => {
      await pages.loginPage.login(TEST_DATA.username, TEST_DATA.password);
    });
    await expect(page).toHaveURL(URLS.inventory);
    await attachStepScreenshot(testInfo, page, 1, 'ログイン完了', 'step1-login');
  });

  await test.step('Step 2: TOPからBackpack商品詳細へ遷移する', async () => {
    await withElementRetry(page, async () => {
      await pages.inventoryPage.goItemDetailPage(TEST_DATA.backpackName);
    });
    await expect(page).toHaveURL(URLS.itemDetail);
    await expect(page.getByText(TEST_DATA.backpackName, { exact: true })).toBeVisible();
    await attachStepScreenshot(testInfo, page, 2, 'Backpack商品詳細遷移', 'step2-open-backpack');
  });

  await test.step('Step 3: 商品詳細でBackpackをカゴ追加する', async () => {
    await withElementRetry(page, async () => {
      await pages.itemDetailPage.addToCart();
    });
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
    await attachStepScreenshot(testInfo, page, 3, 'Backpackカゴ追加', 'step3-add-backpack');
  });

  await test.step('Step 4: TOPページに遷移する', async () => {
    await withElementRetry(page, async () => {
      await page.locator('#react-burger-menu-btn').click();
      await page.getByRole('link', { name: 'All Items' }).click();
    });
    await expect(page).toHaveURL(URLS.inventory);
    await attachStepScreenshot(testInfo, page, 4, 'TOPへ戻る', 'step4-back-to-top');
  });

  await test.step('Step 5: TOPでBike Lightをカゴ追加する', async () => {
    await withElementRetry(page, async () => {
      await pages.inventoryPage.addToCart(TEST_DATA.bikeLightName);
    });
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    await attachStepScreenshot(testInfo, page, 5, 'BikeLightカゴ追加', 'step5-add-bike-light');
  });

  await test.step('Step 6: カゴページへ遷移する', async () => {
    await withElementRetry(page, async () => {
      await pages.header.goToCartPage();
    });
    await expect(page).toHaveURL(URLS.cart);
    await expect(page.getByText(TEST_DATA.backpackName, { exact: true })).toBeVisible();
    await expect(page.getByText(TEST_DATA.bikeLightName, { exact: true })).toBeVisible();
    await attachStepScreenshot(testInfo, page, 6, 'カゴページ遷移', 'step6-open-cart');
  });

  await test.step('Step 7: カゴ画面でチェックアウトする', async () => {
    await withElementRetry(page, async () => {
      await pages.cartPage.goToCheckout();
    });
    await expect(page).toHaveURL(URLS.checkoutStepOne);
    await attachStepScreenshot(testInfo, page, 7, 'チェックアウト開始', 'step7-start-checkout');
  });

  await test.step('Step 8: 注文情報を入力してcontinueする', async () => {
    await withElementRetry(page, async () => {
      await pages.checkoutStepOne.fillCheckoutInformation(
        TEST_DATA.firstName,
        TEST_DATA.lastName,
        TEST_DATA.postalCode,
      );
      await pages.checkoutStepOne.continue();
    });
    await expect(page).toHaveURL(URLS.checkoutStepTwo);
    await attachStepScreenshot(testInfo, page, 8, '注文情報入力完了', 'step8-fill-info');
  });

  await test.step('Step 9: 注文を完了する', async () => {
    await withElementRetry(page, async () => {
      await pages.checkoutStepTwo.finish();
    });
    await expect(page).toHaveURL(URLS.checkoutComplete);
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await attachStepScreenshot(testInfo, page, 9, '注文完了', 'step9-finish-order');
  });
});
