import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/**
 * 公開対象の記事だけを、新しい順で返す。
 *
 * 除外するもの:
 *   - draft: true
 *   - pubDate が未来の記事
 *
 * 未来日付を許すのは、記事をまとめて書いても公開を分散させるため。
 * 31本を一度に出すと scaled content abuse（大量生成スパム）の型に嵌まる。
 * 日付を先に散らしておけば、あとは放っておいても順に出る。
 *
 * ただし静的サイトなのでビルドしないと反映されない。
 * .github/workflows/deploy.yml に毎日のスケジュール実行を入れてあり、
 * その日が来た記事が自動で公開される。
 *
 * 一覧・タイプ別ハブ・ページングのすべてがこの関数を通ること。
 * 個別に filter を書くと、どこか1箇所で未来の記事が漏れる。
 */
export async function publishedPosts(): Promise<Post[]> {
  const now = Date.now();
  return (await getCollection('posts'))
    .filter((p) => !p.data.draft && p.data.pubDate.valueOf() <= now)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
