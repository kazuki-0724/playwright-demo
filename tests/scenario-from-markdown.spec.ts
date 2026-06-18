import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { Header } from '../pages/Header';
import { InventoryPage } from '../pages/InventoryPage';
import { ItemDetailPage } from '../pages/ItemDetailPage';
import { LoginPage } from '../pages/LoginPage';

type RouterScreen = {
  id: number;
  name: string;
  url: string;
};

type RouterJson = {
  urlMap: {
    screens: RouterScreen[];
  };
};

type OperationLogEntry = {
  no: number;
  step: string;
  action: string;
  expected: string;
  actual: string;
  evidence: string;
};

function ensureDir(dirPath: string): void {
  fs.mkdirSync(dirPath, { recursive: true });
}

function escapeTableCell(value: string): string {
  return value.replace(/\|/g, '\\|').replace(/\n/g, '<br>');
}

function writeLogHeader(logFilePath: string): void {
  const header = [
    '| No | Step | Action | Expected | Actual | Evidence |',
    '|---:|---|---|---|---|---|'
  ].join('\n');
  fs.writeFileSync(logFilePath, `${header}\n`, 'utf8');
}

function appendLog(logFilePath: string, entry: OperationLogEntry): void {
  const row = `| ${entry.no} | ${escapeTableCell(entry.step)} | ${escapeTableCell(entry.action)} | ${escapeTableCell(entry.expected)} | ${escapeTableCell(entry.actual)} | ${escapeTableCell(entry.evidence)} |`;
  fs.appendFileSync(logFilePath, `${row}\n`, 'utf8');
}

function getScreenUrl(router: RouterJson, name: string): string {
  const hit = router.urlMap.screens.find((screen) => screen.name === name);
  if (!hit) {
    throw new Error(`router.json に画面定義がありません: ${name}`);
  }
  return hit.url;
}

test.describe('scenario.md ベース E2E', () => {
  test('ログインしてBackpackをカートに入れてカート画面へ遷移する', async ({ page }) => {
    const workspaceRoot = process.cwd();
    const screenshotsDir = path.join(workspaceRoot, 'screenshots');
    const logsDir = path.join(workspaceRoot, 'logs');
    const operationLogPath = path.join(logsDir, 'operation-log.md');
    const routerJsonPath = path.join(
      workspaceRoot,
      '.github',
      'skills',
      'playwright-code',
      'reference',
      'router.json'
    );

    ensureDir(screenshotsDir);
    ensureDir(logsDir);
    writeLogHeader(operationLogPath);

    const router = JSON.parse(fs.readFileSync(routerJsonPath, 'utf8')) as RouterJson;
    const loginUrl = getScreenUrl(router, 'ログイン画面');
    const inventoryUrl = getScreenUrl(router, 'TOPページ');
    const cartUrl = getScreenUrl(router, 'カゴ画面');

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const itemDetailPage = new ItemDetailPage(page);
    const header = new Header(page);
    const cartPage = new CartPage(page);

    const runStep = async (
      no: number,
      step: string,
      action: string,
      expected: string,
      stepKey: string,
      operation: () => Promise<void>
    ): Promise<void> => {
      const evidence = `${String(no).padStart(3, '0')}_${stepKey}.png`;
      const evidencePath = path.join(screenshotsDir, evidence);

      try {
        await operation();
        await page.screenshot({ path: evidencePath, fullPage: true });
        appendLog(operationLogPath, {
          no,
          step,
          action,
          expected,
          actual: '成功',
          evidence
        });
      } catch (error) {
        await page.reload();
        try {
          await operation();
          await page.screenshot({ path: evidencePath, fullPage: true });
          appendLog(operationLogPath, {
            no,
            step,
            action,
            expected,
            actual: '再試行で成功',
            evidence
          });
        } catch (retryError) {
          await page.screenshot({ path: evidencePath, fullPage: true });
          const message = retryError instanceof Error ? retryError.message : String(retryError);
          appendLog(operationLogPath, {
            no,
            step,
            action,
            expected,
            actual: `失敗: ${message}`,
            evidence
          });
          throw retryError;
        }
      }
    };

    await runStep(
      1,
      'Username「standard_user」Password「secret_sauce」でログインする',
      'ログイン画面へ遷移して認証情報を入力しログイン',
      'TOPページ( inventory.html )に遷移する',
      'login',
      async () => {
        await loginPage.goto();
        await expect(page).toHaveURL(loginUrl);
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(inventoryUrl);
        await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
      }
    );

    await runStep(
      2,
      '「Sauce Labs Backpack」の商品ページに遷移する',
      '商品一覧からSauce Labs Backpackを選択して詳細画面へ遷移',
      '商品詳細画面( inventory-item.html?id=N )が表示される',
      'open-item-detail',
      async () => {
        await inventoryPage.goItemDetailPage('Sauce Labs Backpack');
        await expect(page).toHaveURL(/\/inventory-item\.html\?id=\d+$/);
        await expect(itemDetailPage.addToCartButton).toBeVisible();
      }
    );

    await runStep(
      3,
      '「Sauce Labs Backpack」をカゴに追加する',
      '商品詳細画面でAdd to cartをクリック',
      'カートボタンの表示がRemoveに変わる',
      'add-backpack-to-cart',
      async () => {
        await itemDetailPage.addToCart();
        await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
      }
    );

    await runStep(
      4,
      'カゴページに遷移する',
      'ヘッダーのカゴアイコンをクリックしてカート画面へ遷移',
      'カゴ画面( cart.html )が表示され、Backpackが1件表示される',
      'open-cart',
      async () => {
        await header.goToCartPage();
        await expect(page).toHaveURL(cartUrl);
        await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
        await expect(cartPage.checkOutButton).toBeVisible();
      }
    );
  });
});
