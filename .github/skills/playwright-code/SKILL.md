---
name: playwright-code
description: 'ユーザの要求に応じて、Playwright を使った E2E テストコードを生成する。'
user-invocable: true
disable-model-invocation: false
---

# Playwright Code

## 目的
SauceDemo 向けに、Markdown シナリオから Playwright E2E を生成・実行・評価する。

## 入出力
- 入力: テストシナリオ Markdown（番号付き手順は必須）
- 出力:
  - テストコード: tests/test_NNN.spec.ts（3桁連番、.ts 固定）
  - 証跡画像: screenshots/NNN_<step-key>.png

## テンプレート運用
- ベーステンプレート: reference/spec-template.ts
- 新規 spec はテンプレートを複製して `tests/test_NNN.spec.ts` として作成する
- テンプレート初期状態は「ログイン完了まで」の最小構成とする
- POM は毎回選別せず、pages 配下を全事前 import する
- 変更対象は原則として以下のみ
  - `TEST_ID`（ファイル連番）
  - `TEST_DATA`（初期はログイン情報、必要に応じて項目追加）
  - 各ステップの `action` / `verify`
  - シナリオ名、スクリーンショットキー、期待 URL

## 必須ルール
- 対象サイトは https://www.saucedemo.com/
- pages 配下の POM を必ず利用（生セレクタ最小化）
- POM はテンプレートの全事前 import を維持する（未使用の一部 POM があっても許容）
- reference 配下 JSON の URL/主要要素を根拠に待機・検証
- 注文フローを前提にしない。シナリオに必要な範囲だけステップを実装する
- 1 ステップごとに実行、証跡取得、結果記録
- 入力不足時は推測しないで停止・記録
- 要素未検出時はページ状態再取得の上で 1 回のみ再試行
- ブラウザ操作は Playwright MCP を使用

## 省トークン運用ルール
- 調査は最小範囲: scenario.md、テンプレート、reference/router.json pages配下以外は原則読まない
- 読み取りはまとめる: 可能な限り並列で取得し、同一ファイルの再読を避ける
- 実行は単体優先: 新規作成した spec のみ実行し、全件実行はしない
- 失敗時の再実行は 1 回のみ（同一 spec 指定）
- 最終報告は簡潔化: 変更ファイル、実行結果、失敗理由のみ（長文解説禁止）
- 不要な出力を抑制: テスト実行は line/dot など簡易 reporter を優先

## 実行手順
1. シナリオを最小実行ステップへ分解
2. テンプレートを `tests/test_NNN.spec.ts` として複製
3. まずはログイン step を確定する（テンプレート既定）
4. 必要がある場合のみ後続 step を追加し、`action` / `verify` / 証跡を定義する
5. ステップ順に実行し、各ステップ直後に証跡保存
6. テスト実行と評価
7. 失敗時は対象 spec を 1 回だけ再実行
8. 再失敗は終了して失敗内容（ステップ/原因/再現情報）を報告
9. 成功時はサマリーを返す

## 実行コマンド
- 初回: npx playwright test --project=chromium --reporter=line
- 単体: npx playwright test tests/test_001.spec.ts --project=chromium --reporter=line
- 再実行: npx playwright test tests/test_NNN.spec.ts --project=chromium --reporter=line
- 再実行上限: 1 回

## 完了条件
- テストコードが正しく実行できること（エラー終了する場合は一度だけログをもとに修正を試みる）

## 応答フォーマット（省トークン）
- 成功時: 3 行以内（作成 spec、実行結果、証跡件数）
- 失敗時: 5 行以内（失敗ステップ、原因、再実行結果、次アクション）
- コード全文やログ全文は要求時のみ提示

## 注意
- 本スキルは SauceDemo 専用
- 対象変更時はシナリオに URL と検証観点を明記
