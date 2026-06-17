import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  // readonly errorMessage: Locator;

  // コンストラクタでPageオブジェクトを受け取り、Locatorを定義する
  constructor(page: Page) {
    this.page = page;
    // getByRoleやgetByLabelなどの堅牢なLocatorを使用するのがベストプラクティスです
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  // ページへの遷移アクション
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // ログイン処理のカプセル化
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}