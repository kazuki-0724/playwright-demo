# URLマップ

| No | 画面 | URL | 備考 |
|--- |---|---|---|
| 1 | https://www.saucedemo.com/ | ログイン画面 | 特になし |
| 2 | https://www.saucedemo.com/inventory.html | TOPページ | 特になし |
| 3 | https://www.saucedemo.com/inventory-item.html?id=4 | 商品詳細 | idの値で商品を特定する |
| 4 | https://www.saucedemo.com/cart.html | カゴ画面 | ヘッダのカートボタンから遷移可能 |
| 5 | https://www.saucedemo.com/checkout-step-one.html | 注文画面 | カゴ画面からのみ遷移可能 |
| 6 | https://www.saucedemo.com/checkout-step-two.html | 注文確認画面 | 注文画面からのみ遷移可能 |
| 7 | https://www.saucedemo.com/checkout-complete.html | 注文完了画面 | 注文確認画面からのみ遷移可能 |

# 遷移ルール


- ログイン画面 -> TOPページ
- TOPページ -> 商品詳細
- TOPページ -> カゴ画面
- 商品詳細 -> カゴ画面
- カゴ画面 -> 注文画面
- 注文画面 -> 注文確認画面
- 注文確認画面 -> 注文完了画面
