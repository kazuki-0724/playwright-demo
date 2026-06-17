
```
# Playwright MCP 実行テンプレート

## 強制したい運用ルール
- すべての操作を VSCode 内ブラウザで実行すること。
- すべての操作の直後にスクリーンショットを必ず取得すること。
- スクリーンショットは `demo/screenshots/` 配下へ連番で保存すること。

## コピペ用テンプレート
@playwright 以下のルールを必ず守って操作して。
1. VSCode内ブラウザだけを使う（外部ブラウザを開かない）。
2. 1アクションごとに必ずスクリーンショットを撮る。
3. 保存先は `demo/screenshots/001_*.png`, `002_*.png` のように連番にする。
4. 最後に実行ログとして「操作番号: 内容: 画像ファイル名」を一覧で出力する。

対象サイト: 「https://www.saucedemo.com/」
作業内容: ID「standard_user」でログインし、BackPackをカゴに追加し、かご画面で注文確定する。

## 最小例
@playwright 「https://www.saucedemo.com/」を VSCode 内ブラウザで開いて。以降は1操作ごとに必ずスクリーンショットを `demo/screenshots/` に連番保存して。ID「standard_user」でログインして、BackPackをカゴに追加、かご画面で注文確定まで実行して。最後に操作ログと画像一覧をワークスペースに出力して。
```