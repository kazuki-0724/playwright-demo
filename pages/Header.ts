import { expect, Locator, Page } from '@playwright/test';

export class Header {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToCartPage() {
    await this.page.locator('#shopping_cart_container a').click();
  }
}