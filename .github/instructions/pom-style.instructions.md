---
description: "SauceDemo 向け Playwright Page Object Model クラスを作成・編集する際に使用します。locator 命名、意味的 locator の選択、pages/*.ts における厳密な責務分離を徹底します。"
name: "POM スタイル"
applyTo: "pages/**/*.ts"
---
# POM スタイル (SauceDemo)

## 適用範囲
- このガイドは `pages/**/*.ts` にのみ適用します。
- page object は SauceDemo の画面および再利用可能な UI コンポーネント専用です。

## 責務分離
- 各 page object は 1 つの画面、または 1 つのまとまりあるコンポーネントを表現してください。
- page object には locator と再利用可能な操作のみを持たせ、テストフローは持たせないでください。
- page object にアサーションを書かないでください。
- page object にテストデータ、シナリオ分岐、ステップ順序制御を書かないでください。
- 画面自身がその画面への直接ルートを持つ場合に限り、ナビゲーションを page object に含めてください。
- `login`、`addToCart`、`goToCheckout`、`continueShopping` のように、アクションメソッドは小さく命令形に保ってください。

## Locator ルール
- 意味的 locator は次の優先順で使用してください: `getByRole`、`getByLabel`、`getByPlaceholder`、`getByText`（安定した非アクション文言のみ）、最後にアプリが提供している場合の `getByTestId`。
- `page.locator(...)`、CSS 連結、XPath、selector フィルタの小技を含む生セレクタは禁止です。
- 意味的 locator で表現できない場合は作業を止め、新しい POM メソッドまたは page object が必要であることを人間に伝えてください。
- 要素の意図が不明な状態で、メソッド内に selector の回避策を作り込まないでください。

## 命名ルール
- page object のクラス名は `LoginPage` や `Header` のように PascalCase で、画面またはコンポーネントを説明する名前にしてください。
- locator フィールドは `usernameInput`、`loginButton`、`cartBadge` のように camelCase を使用し、名前に UI 上の役割を含めてください。
- メソッド名は命令形の動詞を使い、実装詳細ではなく 1 つのユーザー意図を表現してください。
- より高レベルの意図名を付けられる場合、`clickLoginButton` や `fillUserNameAndPassword` のような生の UI 操作名をメソッド名にしないでください。
- コンストラクタ引数は最小限にし、通常は `page: Page` のみとしてください。

## 実装ルール
- `Page` インスタンスはクラスに `readonly page: Page` として保持してください。
- locator はコンストラクタで定義し、オブジェクトのライフタイム全体で安定させてください。
- ステップごとの DOM 操作を公開するのではなく、ユーザー意図ごとに再利用可能な 1 メソッドを優先してください。
- メソッドは単一の結果に集中させ、無関係な UI 操作を混在させないでください。
- page object を編集する際は、未使用 import、未使用 locator、コメントアウトされた不要コードを削除してください。

## 例
- Good: `async login(username: string, password: string)`
- Good: `readonly loginButton = page.getByRole('button', { name: 'Login' })`
- Good: `async goToCheckout()`
- Bad: `this.page.locator('.inventory_item').filter({ hasText: itemName })`
- Bad: `async clickLoginButtonAndWaitForRedirect()`
- Bad: page object 内でのアサーションやテストステップのオーケストレーション
