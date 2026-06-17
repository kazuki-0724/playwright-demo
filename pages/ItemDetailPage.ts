import { expect, Locator, Page } from '@playwright/test';

export class ItemDetailPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  // readonly errorMessage: Locator;

  // コンストラクタでPageオブジェクトを受け取り、Locatorを定義する
  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
  }

  // 商品をカートに追加するアクション
  async addToCart() {
    await this.addToCartButton.click();
  }
}
