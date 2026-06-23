## Compact Step Log (append-only)

Use one row per step.

| No | Step | Action | Expected | Actual | Evidence |
|---:|---|---|---|---|---|

## Test Execution: test_001.spec.ts (2026-06-21 購入フロー)

**実行日時**: 2026-06-21
**テストファイル**: test_001.spec.ts
**ステータス**: ✓ PASS (1 passed in 5.1s)

| No | Step | Action | Expected | Actual | Evidence |
|---:|---|---|---|---|---|
| 1 | ログイン画面表示 | https://www.saucedemo.com/ にアクセス | ログインフォームが表示される | 表示された ✓ | 001_login-page.png |
| 2 | ログイン実行 | standard_user / secret_sauce でログイン | TOPページ (/inventory.html) へ遷移 | 遷移完了 ✓ | 002_logged-in.png |
| 3 | 商品詳細ページ遷移 | Sauce Labs Backpack をクリック | 商品詳細ページ (/inventory-item.html) へ遷移 | 遷移完了 ✓ | 003_item-detail.png |
| 4 | カートに追加 | "Add to cart" ボタンをクリック | Remove ボタンが表示される | 追加完了 ✓ | 004_added-to-cart.png |
| 5 | カゴページ遷移 | ヘッダーのカゴアイコンをクリック | カゴページ (/cart.html) へ遷移し商品が表示される | 遷移完了・商品確認 ✓ | 005_cart-page.png |
| 6 | チェックアウト開始 | Checkout ボタンをクリック | 注文画面 (/checkout-step-one.html) へ遷移 | 遷移完了 ✓ | 006_checkout-step-one.png |
| 7 | 注文情報入力 | 山田 / 太郎 / 123-4567 を入力し Continue | 注文確認画面 (/checkout-step-two.html) へ遷移 | 遷移完了 ✓ | 007_checkout-step-two.png |
| 8 | 注文完了 | Finish ボタンをクリック | 注文完了画面 (/checkout-complete.html) へ遷移 | 完了確認 ✓ | 008_checkout-complete.png |

---

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

---

## Test Execution: test_001.spec.ts (scenario.md generated)

**実行日時**: 2026-06-21
**テストファイル**: test_001.spec.ts
**ステータス**: ✓ PASS (1 passed in 2.1s)

| No | Step | Action | Expected | Actual | Evidence |
|---:|---|---|---|---|---|
| 1 | ログイン | standard_user / secret_sauce でログイン | TOPページ (/inventory.html) に遷移 | 遷移完了 ✓ | 001_step1-login.png |
| 2 | 商品詳細へ遷移 | Sauce Labs Backpack を選択 | 商品詳細 (/inventory-item.html?id=N) に遷移 | 遷移完了 ✓ | 001_step2-item-detail.png |
| 3 | カゴに追加 | Add to cart をクリック | Remove ボタン表示 | 追加完了 ✓ | 001_step3-add-to-cart.png |
| 4 | カゴページへ遷移 | ヘッダーのカゴアイコンをクリック | カゴ画面 (/cart.html) に遷移し商品表示 | 遷移・表示完了 ✓ | 001_step4-go-cart.png |
| 5 | チェックアウト開始 | Checkout をクリック | 注文画面 (/checkout-step-one.html) に遷移 | 遷移完了 ✓ | 001_step5-checkout.png |
| 6 | 情報入力して継続 | 山田 / 太郎 / 123-4567 を入力して Continue | 注文確認 (/checkout-step-two.html) に遷移 | 遷移完了 ✓ | 001_step6-fill-continue.png |
| 7 | 注文完了 | Finish をクリック | 注文完了 (/checkout-complete.html) に遷移 | 完了確認 ✓ | 001_step7-finish.png |
