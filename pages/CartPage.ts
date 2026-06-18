import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkOutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkOutButton = page.getByText('Checkout');
    this.continueShoppingButton = page.getByText('Continue Shopping');
    }

  async goToCheckout() {
    await this.checkOutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}