import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goItemDetailPage(itemName: string = 'Sauce Labs Backpack') {
    await this.page.getByText(itemName, { exact: true }).click();
  }

  async addToCart(itemName: string = 'Sauce Labs Backpack') {
    const bikeLightCard = this.page.locator('.inventory_item').filter({ hasText: itemName });
    await bikeLightCard.getByRole('button', { name: 'Add to cart' }).click();
  }
}