# 16types

16タイプ性格診断 × Amazonアフィリエイトのブログ。

- 公開URL: https://16types.soleon.jp
- サイト名: 16タイプ研究室
- タグライン: INTJ（建築家）が書く、性格タイプ別のグッズとプレゼント選び

## コマンド

| コマンド | 内容 |
| :--- | :--- |
| `npm install` | 依存をインストール |
| `npm run dev` | ローカルサーバー（localhost:4321） |
| `npm run build` | `./dist/` にビルド |
| `npm run preview` | ビルド結果をローカル確認 |
| `npm run check` | 型チェック |

## 構成

```
.github/workflows/deploy.yml  GitHub Pages への自動デプロイ
public/CNAME                  独自ドメイン
src/
  consts.ts                   サイト名・PR表記などの定数（表示名の変更はここだけ）
  data/mbti-types.ts          16タイプのマスタ（コード・呼称・指標）
  content.config.ts           記事のzodスキーマ
  content/posts/              記事（.mdx）
  components/                 AffiliateDisclosure / ProductCard / ComparisonTable
  layouts/                    BaseLayout / PostLayout
  pages/[type]/index.astro    タイプ別ハブ（16ページ自動生成）
templates/gift-article.mdx    記事テンプレ（ビルド対象外）
```

## 記事の書き方

`templates/gift-article.mdx` を `src/content/posts/<slug>.mdx` にコピーして書く。

frontmatter は `src/content.config.ts` の zod スキーマで検証される。
`types` に存在しないコードを書くと、静かに壊れずビルドが失敗する。

```yaml
types: ['ENFP']       # mbti-types.ts に存在する4文字コード。全タイプ共通なら []
intent: gift          # explainer（拡散層） | self（自分用層） | gift（ギフト層）
occasion: 誕生日       # 誕生日 | クリスマス | バレンタイン | 母の日 | 送別 | 通年
draft: true           # 公開時に false
```

## 守っているルール

意図的に「構造で担保」しているものがあるので、外さないこと。

- **PR表記は記事側で消せない** — `PostLayout` が本文より前に固定描画する。
  ステマ規制（景表法）は「どこかに書く」では要件を満たさないため。
- **`ProductCard` の `cons`（気になる点）は必須** — 省略すると型エラー。
  良い点しか書いていない商品カードを作れないようにしてある。
- **タイプ名で商品を直接紐づけない** — 4指標（E/I・N/S・T/F・J/P）に翻訳した理由を書く。
  指標ごとの指針は `mbti-types.ts` の `AXIS_GUIDANCE` にある。
- **使っていない商品の体験談を書かない** — 使用/未使用を記事内で区別する。
- **16Personalities の説明文・イラストを転載しない** — 文章は自分で書く。
  呼称（建築家 等）と4文字コードは使ってよい。
- **`MBTI` / `16Personalities` をサイト名・ドメインに使わない** — いずれも商標。
  記事内での説明目的の言及は可。

## 下書き

GitHub Pages の無料プランは Public リポジトリでしか使えないため、
コミットしたものは全て公開される。執筆中の記事や商品選定メモは `drafts/`（gitignore 済み）に置く。

## デプロイ

`main` への push で GitHub Actions が動き、GitHub Pages に公開される。

- リポジトリ Settings → Pages → Source: **GitHub Actions**
- DNS（soleon.jp）: CNAME `16types` → `fs-morita.github.io`
- DNS 伝播後に **Enforce HTTPS** を有効化
