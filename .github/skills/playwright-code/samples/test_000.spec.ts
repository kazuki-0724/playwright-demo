import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ItemDetailPage } from '../pages/ItemDetailPage';
import { Header } from '../pages/Header';
import { CartPage } from '../pages/CartPage';
import { CheckOutStepOne } from '../pages/CheckOutStepOne';
import { CheckOutStepTwo } from '../pages/CheckOutStepTwo';

test('SauceDemo 購入フロー: ログイン〜注文完了', async ({ page }) => {
  // ステップ 1: ログイン
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await page.screenshot({ path: 'screenshots/001_login-page.png' });

  await loginPage.login('standard_user', 'secret_sauce');
  await page.waitForURL('**/inventory.html');
  await page.screenshot({ path: 'screenshots/002_logged-in.png' });

  // ステップ 2: Sauce Labs Backpack の商品ページへ遷移
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.goItemDetailPage('Sauce Labs Backpack');
  await page.waitForURL('**/inventory-item.html**');
  await page.screenshot({ path: 'screenshots/003_item-detail.png' });

  // ステップ 3: カゴに追加
  const itemDetailPage = new ItemDetailPage(page);
  await itemDetailPage.addToCart();
  await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
  await page.screenshot({ path: 'screenshots/004_added-to-cart.png' });

  // ステップ 4: カゴページへ遷移
  const header = new Header(page);
  await header.goToCartPage();
  await page.waitForURL('**/cart.html');
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await page.screenshot({ path: 'screenshots/005_cart-page.png' });

  // ステップ 5: チェックアウト開始
  const cartPage = new CartPage(page);
  await cartPage.goToCheckout();
  await page.waitForURL('**/checkout-step-one.html');
  await page.screenshot({ path: 'screenshots/006_checkout-step-one.png' });

  // ステップ 6: 名前「山田太郎」住所「123-4567」を入力して Continue
  const checkOutStepOne = new CheckOutStepOne(page);
  await checkOutStepOne.fillCheckoutInformation('山田', '太郎', '123-4567');
  await checkOutStepOne.continue();
  await page.waitForURL('**/checkout-step-two.html');
  await page.screenshot({ path: 'screenshots/007_checkout-step-two.png' });

  // ステップ 7: 注文完了
  const checkOutStepTwo = new CheckOutStepTwo(page);
  await checkOutStepTwo.finish();
  await page.waitForURL('**/checkout-complete.html');
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
  await page.screenshot({ path: 'screenshots/008_checkout-complete.png' });
});
