// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ItemDetailPage } from '../pages/ItemDetailPage';


test.describe('カゴ追加フローのテスト', () => {
  
  test('ログイン～カゴ追加まで実施できること', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const itemDetailPage = new ItemDetailPage(page);

    // Page Objectのメソッドを呼び出すだけ
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // アサーションはテスト側に記述して意図を明確にする
    await expect(page).toHaveURL(/.*inventory.html/);

    await inventoryPage.goItemDetailPage();
    await expect(page).toHaveURL(/.*inventory-item.html/);

    await itemDetailPage.addToCart();
    const removeButton = page.getByText('Remove');
    await expect(removeButton).toBeVisible();
  
  });
});