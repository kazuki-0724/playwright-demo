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
  - 実行ログ: logs/operation-log.md

## 必須ルール
- 対象サイトは https://www.saucedemo.com/
- pages 配下の POM を必ず利用（生セレクタ最小化）
- reference 配下 JSON の URL/主要要素を根拠に待機・検証
- 1 ステップごとに実行、証跡取得、結果記録
- 入力不足時は推測しないで停止・記録
- 要素未検出時はページ状態再取得の上で 1 回のみ再試行
- ブラウザ操作は Playwright MCP を使用

## 省トークン運用ルール
- 調査は最小範囲: scenario.md、必要な POM、reference/router.json 以外は原則読まない
- 読み取りはまとめる: 可能な限り並列で取得し、同一ファイルの再読を避ける
- 実行は単体優先: 新規作成した spec のみ実行し、全件実行はしない
- 失敗時の再実行は 1 回のみ（同一 spec 指定）
- ログ追記は差分のみ: operation-log.md 全体を再掲しない
- 最終報告は簡潔化: 変更ファイル、実行結果、失敗理由のみ（長文解説禁止）
- 不要な出力を抑制: テスト実行は line/dot など簡易 reporter を優先

## 実行手順
1. シナリオを最小実行ステップへ分解
2. POM と reference を確認して操作/検証を決定
3. tests に spec を実装
4. ステップ順に実行し、各ステップ直後に証跡保存
5. operation-log.md へ結果追記
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
- 全ステップに対応する証跡画像がある
- operation-log.md の記録で結果追跡できる

## 応答フォーマット（省トークン）
- 成功時: 3 行以内（作成 spec、実行結果、証跡件数）
- 失敗時: 5 行以内（失敗ステップ、原因、再実行結果、次アクション）
- コード全文やログ全文は要求時のみ提示

## 注意
- 本スキルは SauceDemo 専用
- 対象変更時はシナリオに URL と検証観点を明記
