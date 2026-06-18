---
name: playwright-code
description: 'ユーザの要求に応じて、Playwright を使った E2E テストコードを生成する。'
user-invocable: true
disable-model-invocation: false
---

# Playwright Code

## 目的
このスキルは、SauceDemo（https://www.saucedemo.com/）向けに、ユーザが提供する Markdown 手順書をもとに Playwright の E2E テストコードを生成・実行・評価する。

## このスキルで実現すること
- 対象サイト https://www.saucedemo.com/ の E2E テストコードを生成する。
- Markdown シナリオを読み取り、各ステップをコードへ実装する。
- 0 から UI 操作を直書きせず、既存の POM（pages ディレクトリ）を必ず利用する。
- 作成したテストコードを実行し、成功時は完了する。
- 失敗時は MCP で再実行し、失敗理由をログへ記録する。
- 無限ループ防止のため、再実行は上限を設け、失敗時は必ずユーザへ報告する。
- 1 ステップごとにスクリーンショットを取得して証跡化する。
- reference 配下の JSON を参照し、遷移先 URL と主要要素を確認しながら実装する。

## 入力
- 必須: テストシナリオ Markdown
- 推奨: 次の情報を含むこと
	- タイトル
	- 前提条件
	- 実行ステップ（番号付き）
	- 期待結果

## 出力
- テストコード: tests 配下の spec。ファイル名は「test_NNN.spec.ts」（NNN は 001, 002... の3桁連番）。数字に被りがないようにする。
  - 例: test_001.spec.ts, test_002.spec.ts
  - 拡張子は必ず .ts（TypeScript形式）
- スクリーンショット: screenshots/NNN_<step-key>.png
- 実行ログ: logs/operation-log.md

## 実装ポリシー
- POM 優先: pages 配下の Page Object を再利用し、直接セレクタ記述を最小化する。
- 遷移整合: reference 配下 JSON の URL・主要要素を根拠に待機条件を置く。
- ステップ単位: 1 ステップ実行ごとに証跡取得・実績記録を行う。
- 欠落情報の扱い: シナリオに入力値がない場合は推測補完せず、ログ記録して停止する。
- 言語統一: テストコードは TypeScript（import/export）で実装し、拡張子は .ts で固定。

## 実行フロー
1. シナリオを読み取り、実行可能な最小ステップへ分解する。
2. pages 配下の POM と reference 配下の JSON を確認し、操作と検証観点を決定する。
3. tests 配下に E2E テストコードを実装する（POM ベース）。
4. 対象サイトを開き、ステップを順番に実行する。
5. 各ステップ直後にスクリーンショットを保存する。
6. 各ステップの実行結果を operation-log.md に追記する。
7. テストを実行して結果を評価する。
8. 失敗時は 1 回だけ MCP で再実行し、失敗理由と再現情報を追記する。
9. 再実行後も失敗した場合はそこで終了し、ユーザへ失敗内容を報告する。
10. 成功時は生成完了として終了し、サマリーを返す。

## 分岐ルール
- 要素が見つからない場合
	- 1 回だけページ状態を再取得して再試行する。
	- 改善しない場合はそのステップで失敗終了し、原因を記録する。
- 遷移待ちが必要な場合
	- URL 変化または主要要素の表示を待ってから次へ進む。
- 入力値が不足している場合
	- 推測で補完しない。
	- 不足項目をログに記録し、実行を停止する。

## 完了判定
- すべてのシナリオステップに対して、証跡画像が 1 つ以上ある。
- operation-log.md に次の列が埋まっている。
	- No
	- Step
	- Action
	- Expected
	- Actual
	- Evidence
- 失敗時は、失敗ステップと原因、再現に必要な情報が特定できる。

## 実行時の厳守事項
- ブラウザ操作は Playwright MCP を使う。
- 1 操作 1 証跡を原則とする。
- 証跡保存先はワークスペースルート直下の screenshots/ とする。
- 証跡ファイル名は 3 桁連番（例: 001_open-login.png）で管理する。
- 画面状態が変わる操作後は、状態確認してから次へ進む。

## 実行コマンド固定値
- **初回実行**: `npx playwright test --project=chromium`
  - testDir は playwright.config.js の `./tests` に設定されているため、tests/ 配下のすべての .spec.ts ファイルが対象
  - 特定のテストのみ実行する場合: `npx playwright test tests/test_001.spec.ts --project=chromium`
- **失敗時の再実行**: `npx playwright test tests/test_NNN.spec.ts --project=chromium` （失敗したテスト番号の spec ファイルを明示）
- 失敗時の再実行は最大 1 回とし、無限ループを禁止する。

## ログ記録フォーマット
operation-log.md には次の形式で追記する。

| No | Step | Action | Expected | Actual | Evidence |
|---:|---|---|---|---|---|
| 1 | ログイン画面表示 | トップページへアクセス | ログインフォームが見える | 見えた | 001_open-login.png |

## 注意
- 本スキルは SauceDemo（https://www.saucedemo.com/）向けに最適化している。
- 対象サイトを変更する場合は、シナリオに URL と検証観点を明記する。
