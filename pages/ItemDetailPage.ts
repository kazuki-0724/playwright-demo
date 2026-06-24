import { expect, Locator, Page } from '@playwright/test';

export class ItemDetailPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly goBackInventoryButton: Locator;
  // readonly errorMessage: Locator;

  // コンストラクタでPageオブジェクトを受け取り、Locatorを定義する
  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.goBackInventoryButton = page.getByRole('button', { name: 'Back to products' });
  }

  // 商品をカートに追加するアクション
  async addToCart() {
    await this.addToCartButton.click();
  }

  async goBackToInventory() {
    await this.goBackInventoryButton.click();
  }
}
