import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goItemDetailPage(itemName: string = 'Sauce Labs Backpack') {
    await this.page.getByText(itemName, { exact: true }).click();
  }
}