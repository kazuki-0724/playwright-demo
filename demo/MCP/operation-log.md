# SauceDemo 操作ログ

実行日: 2026-04-25
対象サイト: https://www.saucedemo.com/

1. サイトを開く
   - URL: https://www.saucedemo.com/
   - 画像: demo/screenshots/01_open_home.png
2. Username に `standard_user` を入力
   - 画像: demo/screenshots/02_input_username.png
3. Password に `secret_sauce` を入力
   - 画像: demo/screenshots/03_input_password.png
4. Login ボタンをクリック
   - 画像: demo/screenshots/04_click_login.png
5. Sauce Labs Backpack の Add to cart をクリック
   - 画像: demo/screenshots/05_add_backpack.png
6. カートを開く
   - 画像: demo/screenshots/06_open_cart.png
7. Checkout をクリック
   - 画像: demo/screenshots/07_click_checkout.png
8. First Name を入力 (`Taro`)
   - 画像: demo/screenshots/08_input_firstname.png
9. Last Name を入力 (`Yamada`)
   - 画像: demo/screenshots/09_input_lastname.png
10. Zip/Postal Code を入力 (`1000001`)
    - 画像: demo/screenshots/10_input_postalcode.png
11. Continue をクリック
    - 画像: demo/screenshots/11_click_continue.png
12. Finish をクリック（注文確定）
    - 画像: demo/screenshots/12_click_finish_complete.png

結果:
- `standard_user` でログイン成功
- BackPack のカート追加成功
- Checkout 完了画面（"Thank you for your order!"）まで到達

---

## 実行ログ（2026-06-13, my-playwright: login.md）

| No | Step | Action | Expected | Actual | Evidence |
|---:|---|---|---|---|---|
| 1 | サイトアクセス | https://www.saucedemo.com/ を開く | ログイン画面が表示される | ログインフォーム表示を確認 | mcp-screenshots/001_open-login.png |
| 2 | Username 入力 | Username に standard_user を入力 | Username 欄に standard_user が反映される | 入力反映を確認 | mcp-screenshots/002_input-username.png |
| 3 | Password 入力 | Password に secret_sauce を入力 | Password 欄に secret_sauce が反映される | 入力反映を確認 | mcp-screenshots/003_input-password.png |
| 4 | ログイン実行 | Login ボタンをクリック | inventory.html に遷移する | /inventory.html への遷移を確認 | mcp-screenshots/004_login-success-inventory.png |

結果:
- シナリオ `login.md` は成功（2 ステップ完了）
- 取得証跡: 4 ファイル
