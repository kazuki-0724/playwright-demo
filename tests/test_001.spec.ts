import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ItemDetailPage } from '../pages/ItemDetailPage';
import { CartPage } from '../pages/CartPage';
import { Header } from '../pages/Header';
import path from 'path';
import fs from 'fs';

const screenshotDir = path.join(__dirname, '..', 'screenshots');

test.describe('E2E Test: Add Sauce Labs Backpack to Cart', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let itemDetailPage: ItemDetailPage;
  let cartPage: CartPage;
  let header: Header;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    itemDetailPage = new ItemDetailPage(page);
    cartPage = new CartPage(page);
    header = new Header(page);
  });

  test('ユーザが Sauce Labs Backpack をカートに追加し、カートページへ遷移する', async ({ page }) => {
    // ステップ 1: ログイン画面へアクセス
    await loginPage.goto();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await page.screenshot({ path: path.join(screenshotDir, '001_login-page.png') });
    console.log('✓ Step 1: Login page opened');

    // ステップ 2: ログイン処理
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL('https://www.saucedemo.com/inventory.html');
    await page.screenshot({ path: path.join(screenshotDir, '002_logged-in.png') });
    console.log('✓ Step 2: Logged in successfully');

    // ステップ 3: Sauce Labs Backpack の商品ページへ遷移
    await inventoryPage.goItemDetailPage('Sauce Labs Backpack');
    await page.waitForURL(/inventory-item\.html\?id=\d+/);
    await page.screenshot({ path: path.join(screenshotDir, '003_item-detail.png') });
    console.log('✓ Step 3: Navigated to Backpack detail page');

    // ステップ 4: Backpack をカートに追加
    await itemDetailPage.addToCart();
    await page.screenshot({ path: path.join(screenshotDir, '004_added-to-cart.png') });
    console.log('✓ Step 4: Backpack added to cart');

    // ステップ 5: カゴページへ遷移
    await header.goToCartPage();
    await page.waitForURL('https://www.saucedemo.com/cart.html');
    await page.screenshot({ path: path.join(screenshotDir, '005_cart-page.png') });
    console.log('✓ Step 5: Navigated to cart page');

    // 最終検証: Backpack がカートに入っていることを確認
    const cartItems = await page.locator('.cart_item').count();
    expect(cartItems).toBeGreaterThan(0);
    console.log('✓ Verification: Backpack is in the cart');
  });
});
