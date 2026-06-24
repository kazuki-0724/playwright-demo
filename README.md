# playwright-demo

SauceDemo (https://www.saucedemo.com/) を対象にした Playwright E2E テストのサンプルです。  
Page Object Model (POM) を pages 配下に分離し、tests 配下の spec から再利用する構成です。

## 前提

- Node.js 18 以上推奨
- Windows PowerShell 環境では npm.cmd を使う

## セットアップ

1. 依存関係をインストール
   npm.cmd install
2. Playwright ブラウザをインストール
   npx playwright install

## SKILLによるテストコード生成

以下のように「/playwright-code」でSKILLを利用することでテストコードを生成できる。

### プロンプト

```md
/playwright-code scenario.mdに基づいてテストコードを生成して
```

入力として提供するMDは以下のようなものとする。
「どの画面」で「何をする」のかを明確に記載する。

### scenario.md

```md
1. ログインページにアクセスしてUsername「standard_user」Password「secret_sauce」でログインする
2. TOPページから「Sauce Labs Backpack」の商品ページに遷移する
3. 商品詳細ページで「Sauce Labs Backpack」をカゴに追加する
4. TOPページに遷移する
5. TOPページで「Sauce Labs Bike Light」をカゴ追加する
6. カゴページに遷移する
7. カゴ画面でチェックアウトする
8. 名前と「山田太郎」住所を「123-4567」で入力し、continueする
9. 注文を完了する
```

### 補足

- SKILLは`pages`配下のPOMと、`reference`配下の`router.json` `spec-template.ts`を利用する。
- `router.json`に画面遷移の依存関係を記載しており、その依存関係を利用する。

## テスト実行

package.json の scripts は以下を定義しています。

- test:chromium:lite
  - Chromium で全 spec 実行（line reporter）
- test:spec:lite
  - 対象 spec を指定して実行（line reporter）

実行例:

- 全体（Chromium）
  `npm.cmd run test:chromium:lite`
- 単体 spec（例: test_002）
  `npm.cmd run test:spec:lite -- tests/test_002.spec.ts`
- テスト一覧だけ確認
  `npm.cmd run test:spec:lite -- tests/test_002.spec.ts --list`
- 直接コマンド実行
  `npx playwright test tests/test_001.spec.ts`

## レポートと証跡

- HTML レポート: playwright-report/index.html
- 失敗時の出力: test-results/
- 手動保存した証跡画像: screenshots/

playwright.config.js では以下を有効化しています。

- trace: on
- screenshot: on
- projects: chromium / firefox / webkit / Mobile Chrome / Mobile Safari

## ディレクトリ構成（主要）

- tests/
  - test_001.spec.ts
  - test_002.spec.ts
- pages/
  - LoginPage.ts
  - InventoryPage.ts
  - ItemDetailPage.ts
  - Header.ts
  - CartPage.ts
  - CheckOutStepOne.ts
  - CheckOutStepTwo.ts
- reference/
  - router.json
  - spec-template.ts

## テスト追加ルール

- 新規 spec は tests/test_NNN.spec.ts 形式で作成（NNN は 3 桁連番）
- 画面操作は可能な限り pages 配下の POM を利用
- URL 遷移や画面到達の検証は reference/router.json を根拠に実施
- 証跡画像は screenshots/NNN_step-key.png の命名で保存

## よく使う補助コマンド

- TypeScript の型エラー確認（必要時）
  `npx tsc --noEmit`
- HTML レポートを開く
  `npx playwright show-report`
