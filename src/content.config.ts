import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { TYPE_CODES } from './data/mbti-types';

/**
 * 記事コレクション。
 *
 * type / intent が不正な値だとビルドを失敗させる。
 * 16タイプ×場面×intent の組み合わせを手で管理しないための土台なので、
 * ここのスキーマが崩れると一覧やハブページが静かに壊れる。
 */
const posts = defineCollection({
  // ProductCard / ComparisonTable を記事内で使うため .mdx を許可している
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),

    /**
     * 対象の性格タイプ。mbti-types.ts に存在するコードのみ許可。
     * 全タイプ共通の記事（拡散層など）は空配列にする。
     */
    types: z.array(z.enum(TYPE_CODES as [string, ...string[]])).default([]),

    /**
     * 記事の層。
     * - explainer: 拡散層（解説・あるある・相性）。収益はほぼ発生しない
     * - self:      自分用層（自分で買うと満足度が高いもの）
     * - gift:      ギフト層（贈り物。収益の柱）
     */
    intent: z.enum(['explainer', 'self', 'gift']),

    /** 場面。ギフト記事の季節性を作る。 */
    occasion: z
      .enum(['誕生日', 'クリスマス', 'バレンタイン', '母の日', '送別', '通年'])
      .optional(),

    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
