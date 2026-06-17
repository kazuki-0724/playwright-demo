// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('ログイン機能のテスト', () => {
  
  test('有効な認証情報でログインできること', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Page Objectのメソッドを呼び出すだけ
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // アサーションはテスト側に記述して意図を明確にする
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('無効な認証情報でエラーメッセージが表示されること', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_pass');

    // エラーメッセージの要素もPOMから取得して検証
    // await expect(loginPage.errorMessage).toBeVisible();
    // await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
  });
});