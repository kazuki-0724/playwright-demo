// @ts-check
import { test, expect } from '@playwright/test';

test('standard_user でログインし BackPack を購入完了できる', async ({ page }) => {
  const shot = async (name) => {
    await page.screenshot({ path: `demo/CLI/screenshots/${name}`, fullPage: true });
  };

  await page.goto('https://www.saucedemo.com/');
  await shot('01_open_home.png');

  await page.getByPlaceholder('Username').fill('standard_user');
  await shot('02_input_username.png');

  await page.getByPlaceholder('Password').fill('secret_sauce');
  await shot('03_input_password.png');

  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory\.html/);
  await shot('04_click_login.png');

  await page
    .locator('.inventory_item')
    .filter({ has: page.getByText('Sauce Labs Backpack') })
    .getByRole('button', { name: 'Add to cart' })
    .click();
  await shot('05_add_backpack.png');

  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/cart\.html/);
  await shot('06_open_cart.png');

  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL(/checkout-step-one\.html/);
  await shot('07_click_checkout.png');

  await page.getByPlaceholder('First Name').fill('Taro');
  await shot('08_input_firstname.png');

  await page.getByPlaceholder('Last Name').fill('Yamada');
  await shot('09_input_lastname.png');

  await page.getByPlaceholder('Zip/Postal Code').fill('1000001');
  await shot('10_input_postalcode.png');

  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await shot('11_click_continue.png');

  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
  await shot('12_click_finish_complete.png');
});
