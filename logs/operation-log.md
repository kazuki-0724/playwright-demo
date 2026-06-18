| No | Step | Action | Expected | Actual | Evidence |
|---:|---|---|---|---|---|
| 1 | Username「standard_user」Password「secret_sauce」でログインする | ログイン画面へ遷移して認証情報を入力しログイン | TOPページ( inventory.html )に遷移する | 成功 | 001_login.png |
| 2 | 「Sauce Labs Backpack」の商品ページに遷移する | 商品一覧からSauce Labs Backpackを選択して詳細画面へ遷移 | 商品詳細画面( inventory-item.html?id=N )が表示される | 成功 | 002_open-item-detail.png |
| 3 | 「Sauce Labs Backpack」をカゴに追加する | 商品詳細画面でAdd to cartをクリック | カートボタンの表示がRemoveに変わる | 成功 | 003_add-backpack-to-cart.png |
| 4 | カゴページに遷移する | ヘッダーのカゴアイコンをクリックしてカート画面へ遷移 | カゴ画面( cart.html )が表示され、Backpackが1件表示される | 成功 | 004_open-cart.png |
