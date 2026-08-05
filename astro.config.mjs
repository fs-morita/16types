// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

import { unified } from '@astrojs/markdown-remark';

import { rehypeWrapTables } from './src/plugins/rehype-wrap-tables.mjs';

// https://astro.build/config
export default defineConfig({
  // 独自ドメイン運用のため base は設定しない。
  // サブディレクトリ運用に切り替えると全内部リンクの修正が必要になるので注意。
  site: 'https://16types.soleon.jp',
  markdown: {
    // markdown.rehypePlugins は非推奨。unified() 経由で渡す。
    processor: unified({
      // 素のMarkdownテーブルがスマホでページごと横スクロールするのを防ぐ
      rehypePlugins: [rehypeWrapTables]
    })
  },
  integrations: [sitemap(), mdx()]
});