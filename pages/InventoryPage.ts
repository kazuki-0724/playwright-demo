import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly itemName: Locator;
  // readonly errorMessage: Locator;

  // コンストラクタでPageオブジェクトを受け取り、Locatorを定義する
  constructor(page: Page) {
    this.page = page;
    this.itemName = page.getByText('Sauce Labs Backpack', { exact: true });
  }

  // 商品詳細ページへの遷移アクション
  async goItemDetailPage() {
    await this.itemName.click();
  }
}