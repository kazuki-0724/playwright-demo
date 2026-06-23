import { test, expect, Page } from '@playwright/test';
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

test('scenario.md based order flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const itemDetailPage = new ItemDetailPage(page);
  const header = new Header(page);
  const cartPage = new CartPage(page);
  const checkoutStepOne = new CheckOutStepOne(page);
  const checkoutStepTwo = new CheckOutStepTwo(page);

  await loginPage.goto();
  await expect(page).toHaveURL(URLS.login);

  // Step 1: ログインする
  await withElementRetry(page, async () => {
    await loginPage.login('standard_user', 'secret_sauce');
  });
  await expect(page).toHaveURL(URLS.inventory);
  await page.screenshot({ path: 'screenshots/001_step1-login.png', fullPage: true });

  // Step 2: 商品ページへ遷移する
  await withElementRetry(page, async () => {
    await inventoryPage.goItemDetailPage('Sauce Labs Backpack');
  });
  await expect(page).toHaveURL(URLS.itemDetail);
  await page.screenshot({ path: 'screenshots/001_step2-item-detail.png', fullPage: true });

  // Step 3: カゴに追加する
  await withElementRetry(page, async () => {
    await itemDetailPage.addToCart();
  });
  await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
  await page.screenshot({ path: 'screenshots/001_step3-add-to-cart.png', fullPage: true });

  // Step 4: カゴページへ遷移する
  await withElementRetry(page, async () => {
    await header.goToCartPage();
  });
  await expect(page).toHaveURL(URLS.cart);
  await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
  await page.screenshot({ path: 'screenshots/001_step4-go-cart.png', fullPage: true });

  // Step 5: チェックアウトする
  await withElementRetry(page, async () => {
    await cartPage.goToCheckout();
  });
  await expect(page).toHaveURL(URLS.checkoutStepOne);
  await page.screenshot({ path: 'screenshots/001_step5-checkout.png', fullPage: true });

  // Step 6: 情報入力して continue
  await withElementRetry(page, async () => {
    await checkoutStepOne.fillCheckoutInformation('山田', '太郎', '123-4567');
    await checkoutStepOne.continue();
  });
  await expect(page).toHaveURL(URLS.checkoutStepTwo);
  await page.screenshot({ path: 'screenshots/001_step6-fill-continue.png', fullPage: true });

  // Step 7: 注文を完了する
  await withElementRetry(page, async () => {
    await checkoutStepTwo.finish();
  });
  await expect(page).toHaveURL(URLS.checkoutComplete);
  await expect(page.getByText('Thank you for your order!', { exact: true })).toBeVisible();
  await page.screenshot({ path: 'screenshots/001_step7-finish.png', fullPage: true });
});
