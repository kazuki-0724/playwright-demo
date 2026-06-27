---
description: "SauceDemo 専用の Playwright E2E テストを作成・編集する際に使用します。spec 生成、POM 更新、テストデバッグを対象とし、テスト命名、POM 優先の操作、生セレクタ禁止、ステップごとのスクリーンショット、URL アサーション、最小範囲での実行を徹底します。"
name: "Playwright E2E 規約"
applyTo: "tests/**/*.ts, pages/**/*.ts, reference/spec-template.ts"
---
# Playwright E2E 規約 (SauceDemo)

## 適用範囲
- このガイドは、`tests/`、`pages/`、`reference/spec-template.ts` における SauceDemo の E2E 作業にのみ適用します。
- 新しいパターンを導入する前に、既存のプロジェクト資産を優先してください。

## ファイル・命名ルール
- 新規 spec ファイルは `tests/test_NNN.spec.ts`（3 桁の連番 ID）に従ってください。
- POM クラスは `pages/*.ts` に配置し、クラス名は PascalCase を使用してください。
- POM の locator フィールドとメソッドは camelCase を使用してください。
- ステップのスクリーンショットファイルは `screenshots/NNN_<step-key>.png` を使用してください。

## Spec 構成ルール
- 新しい spec は必ず `reference/spec-template.ts` を起点にしてください。
- 明示的に不要でない限り、次のテンプレート要素を維持してください:
  - `URLS`
  - `TEST_DATA`
  - `TEST_ID`
  - `ScenarioPages` type
  - `withElementRetry`
  - `attachStepScreenshot`
- 新規 spec では `pages/` の POM クラスを事前 import してください（テンプレート由来であれば未使用 import は許容されます）。
- 複数ステップのフローを実装する場合、各シナリオステップを `test.step(...)` で記述してください。

## 操作・アサーションルール
- すべてのユーザー操作は POM メソッドを優先してください。
- spec と POM の両方で生セレクタは禁止です。
- セレクタや操作方法が不明な場合は、新しい POM メソッドまたは page object が必要であることを人間に伝え、追加してから続行してください。
- 必要な操作が POM に存在しない場合は、先に `pages/` の該当クラスを追加・拡張してください。
- 主要な画面遷移ごとに URL アサーションで遷移を検証してください。
- 各ステップの主要な結果について、表示状態またはテキストのアサーションを行ってください。

## リトライ・証跡ルール
- 不安定な UI 操作は `withElementRetry` でラップし、リトライ経路は 1 つだけにしてください。
- 各ステップにつき 1 枚、`attachStepScreenshot` でスクリーンショットを添付してください。

## URL・遷移整合性
- 想定 URL とフロー遷移は `reference/router.json` と整合させてください。
- シナリオで明示的な要求と説明がない限り、既知のルートグラフに反する遷移は実装しないでください。

## 実行ルール
- 反復作業中は単一 spec 実行を優先してください。
- フルスイート実行は明示的に要求された場合のみ行ってください。
- Windows PowerShell 環境では npm スクリプト実行に `npm.cmd` を優先してください。

## 変更境界
- 変更は最小限にし、要求されたシナリオに限定してください。
- テストのみの依頼では、無関係なアプリ・インフラファイルを変更しないでください。
