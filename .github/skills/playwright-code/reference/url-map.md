# URLマップ

## 画面-URL対応表

| No | 画面 | URL |
|--- |---|---|---|
| 1 | https://www.saucedemo.com/ | ログイン画面 |
| 2 | https://www.saucedemo.com/inventory.html | TOPページ |
| 3 | https://www.saucedemo.com/inventory-item.html?id=N | 商品詳細 |
| 4 | https://www.saucedemo.com/cart.html | カゴ画面 |
| 5 | https://www.saucedemo.com/checkout-step-one.html | 注文画面 |
| 6 | https://www.saucedemo.com/checkout-step-two.html | 注文確認画面 |
| 7 | https://www.saucedemo.com/checkout-complete.html | 注文完了画面 |

## 画面遷移ルール

- ログイン画面 -> TOPページ
- TOPページ -> 商品詳細
- TOPページ -> カゴ画面
- 商品詳細 -> カゴ画面
- カゴ画面 -> 注文画面
- 注文画面 -> 注文確認画面
- 注文確認画面 -> 注文完了画面

## ヘッダー

### 機能

1. カゴアイコン
   カゴ画面に遷移する
2. ハンバーガーメニュー
   サイドバーを展開し以下2つのリンクを表示する
   1. 「All Items」TOPページに遷移する
   2. 「Logout」ログアウトして、ログインページに遷移する

### 表示画面

1. TOPページ
2. 商品詳細
3. カゴ画面
4. 注文画面
5. 注文確認画面
6. 注文完了画面
