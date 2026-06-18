## Test Execution: test_001.spec.ts (Automated E2E Test)

**実行日時**: 2026-06-18  
**テストファイル**: test_001.spec.ts  
**ステータス**: ✓ PASS (1 passed in 2.0s)  

| No | Step | Action | Expected | Actual | Evidence |
|---:|---|---|---|---|---|
| 1 | ログイン画面表示 | https://www.saucedemo.com/ にアクセス | ログインフォームが表示される | 表示された ✓ | 001_login-page.png |
| 2 | ログイン実行 | standard_user / secret_sauce でログイン | TOPページ (/inventory.html) へ遷移 | 遷移完了 ✓ | 002_logged-in.png |
| 3 | 商品詳細ページ遷移 | Sauce Labs Backpack をクリック | 商品詳細ページ (/inventory-item.html?id=1) へ遷移 | 遷移完了 ✓ | 003_item-detail.png |
| 4 | カートに追加 | "Add to cart" ボタンをクリック | 商品がカートに追加される | 追加完了 ✓ | 004_added-to-cart.png |
| 5 | カゴページ遷移 | ヘッダーのカゴアイコンをクリック | カゴページ (/cart.html) へ遷移し商品が表示される | 遷移完了、商品確認 ✓ | 005_cart-page.png |

---

## Manual Test Execution Log (Previous)

| No | Step | Action | Expected | Actual | Evidence |
|---:|---|---|---|---|---|
| 1 | Username「standard_user」Password「secret_sauce」でログインする | ログイン画面へ遷移して認証情報を入力しログイン | TOPページ( inventory.html )に遷移する | 成功 | 001_login.png |
| 2 | 「Sauce Labs Backpack」の商品ページに遷移する | 商品一覧からSauce Labs Backpackを選択して詳細画面へ遷移 | 商品詳細画面( inventory-item.html?id=N )が表示される | 成功 | 002_open-item-detail.png |
| 3 | 「Sauce Labs Backpack」をカゴに追加する | 商品詳細画面でAdd to cartをクリック | カートボタンの表示がRemoveに変わる | 成功 | 003_add-backpack-to-cart.png |
| 4 | カゴページに遷移する | ヘッダーのカゴアイコンをクリックしてカート画面へ遷移 | カゴ画面( cart.html )が表示され、Backpackが1件表示される | 成功 | 004_open-cart.png |
