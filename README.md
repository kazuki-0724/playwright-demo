# Playwright CLI 導入手順

## 目的
このドキュメントは、Windows 環境で Playwright CLI を導入し、テスト実行まで確認する手順をまとめたものです。

## 前提条件
- Node.js LTS がインストール済み
- npm が利用可能
- PowerShell またはコマンドプロンプトが利用可能

バージョン確認:

```bash
node -v
npm -v
```

## パターンA: 新規プロジェクトとして導入（推奨）
1. 作業フォルダへ移動します。
2. 次のコマンドを実行します。

```bash
npm init playwright@latest
```

3. 対話プロンプトに回答します。
- TypeScript/JavaScript の選択
- テスト配置先
- GitHub Actions 設定の要否
- ブラウザダウンロードの要否

4. ブラウザが未インストールの場合は次を実行します。

```bash
npx playwright install
```

5. サンプルテストを実行して動作確認します。

```bash
npx playwright test
```

## パターンB: 既存プロジェクトへ追加
1. プロジェクトルートで Playwright Test を開発依存に追加します。

```bash
npm install -D @playwright/test
```

2. ブラウザをインストールします。

```bash
npx playwright install
```

3. 初期設定ファイルとサンプルを生成します。

```bash
npx playwright test --init
```

4. テストを実行します。

```bash
npx playwright test
```

## よく使う CLI コマンド

```bash
# 通常実行
npx playwright test

# UI モードで実行
npx playwright test --ui

# 失敗時のHTMLレポート表示
npx playwright show-report

# 操作を記録してテストコード生成
npx playwright codegen https://example.com
```

## トラブルシュート
- `npx playwright: command not found`:
  - Node.js と npm のインストール状態、PATH を確認してください。
- ブラウザ起動エラー:
  - 次を再実行してください。

```bash
npx playwright install
```

- 依存ライブラリの不整合:
  - 依存を再インストールしてください。

```bash
npm ci
```

## 補足
Playwright CLI は `npx playwright ...` 形式で実行するのが基本です。グローバルインストールは通常不要です。

npx playwright test tests/test_001.spec.ts