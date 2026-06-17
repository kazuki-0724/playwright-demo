---
name: my-playwright
description: 'saucedemo.com の E2E テストを Playwright MCP で実行するスキル。Markdown のシナリオを読み取り、各ステップで証跡スクリーンショットを取得し、実行ログを出力する。E2E、UI テスト、操作証跡、検証自動化で使用。'
argument-hint: '実行したいシナリオ Markdown のパスまたは内容（例: ./.github/skills/my-playwright/case/login.md）'
user-invocable: true
disable-model-invocation: false
---

# My Playwright

## このスキルで実現すること
- 対象サイト https://www.saucedemo.com/ の E2E テストを実行する。
- シナリオは Markdown で受け取り、手順を順番に実行する。
- 各ステップごとに証跡を必ず取得する。
- 実行結果をログ化し、再確認可能な成果物として残す。

## 使うタイミング
- SauceDemo の回帰確認を短時間で行いたいとき。
- 手順書ベースで UI 操作の再現性を確保したいとき。
- 監査やレビュー向けに、操作ごとの証跡が必要なとき。

## 入力
- 必須: テストシナリオ Markdown
- 推奨: シナリオに次を含める
	- タイトル
	- 前提条件
	- 実行ステップ（番号付き）
	- 期待結果

シナリオ例:
- ./.github/skills/my-playwright/case/login.md

## 出力
- スクリーンショット: mcp-screenshots/NNN_<step-key>.png
- 実行ログ: demo/MCP/operation-log.md
- 必要に応じて動画: demo/MCP/screenrecord/

## 実行手順
1. シナリオを読み取る。
2. ステップを実行可能な粒度に分解する。
3. ブラウザで https://www.saucedemo.com/ を開く。
4. 各ステップを順番に実施する。
5. 各ステップ直後にスクリーンショットを保存する。
6. 各ステップの実行結果を operation-log.md に追記する。
7. 失敗時はそこで停止し、失敗理由と再現情報を記録する。
8. 最後にサマリー（成功件数、失敗件数、証跡一覧）を返す。

## 分岐ルール
- 要素が見つからない場合:
	- 1 回だけページ状態を再取得して再試行する。
	- それでも失敗ならその時点でテスト失敗として終了する。
- 遷移待ちが必要な場合:
	- URL 変化または主要要素の表示を待ってから次へ進む。
- 入力値がシナリオで省略されている場合:
	- 推測で補完しない。
	- 不足項目としてログに記録し、実行を停止する。

## 品質基準（完了判定）
- すべてのシナリオステップに対して証跡画像が 1 つ以上ある。
- operation-log.md に次が記録されている。
	- 操作番号
	- 実施内容
	- 期待結果
	- 実結果
	- 証跡ファイル名
- 失敗時は失敗ステップと原因が特定可能である。

## 実行時の厳守事項
- Playwright MCP を使ってブラウザ操作を行う。
- 1 操作 1 証跡を原則とする。
- 証跡の保存先はワークスペースルート直下の mcp-screenshots/ とする。
- 証跡ファイル名は 3 桁連番で管理する（例: 001_open-login.png）。
- 画面状態が変わる操作の後は、必ず状態確認をしてから次へ進む。

## ログ記録フォーマット
operation-log.md には以下の形式で追記する。

| No | Step | Action | Expected | Actual | Evidence |
|---:|---|---|---|---|---|
| 1 | ログイン画面表示 | トップページへアクセス | ログインフォームが見える | 見えた | 001_open-login.png |

## 推奨プロンプト例
- /my-playwright ./.github/skills/my-playwright/case/login.md を実行して
- /my-playwright 次のシナリオでテストして: 1) サイトを開く 2) standard_user でログイン
- /my-playwright この Markdown 手順を E2E として実施し、各ステップ証跡を保存して

## 注意
- 本スキルは SauceDemo（https://www.saucedemo.com/）を対象に最適化している。
- 対象サイトを変更する場合は、シナリオ内に URL と検証観点を明記する。
