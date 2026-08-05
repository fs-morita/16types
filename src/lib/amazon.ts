import { AMAZON_ASSOCIATE_TAG } from '../consts';
import { extractAsin } from './asin';

export { extractAsin };

/**
 * Amazonの商品リンクを作る。
 *
 * 記事側でタグを手打ちさせない。手打ちにすると、いつか必ず付け忘れが起きて
 * 「リンクは動くが1円も入らない記事」が静かに増えるため。
 *
 * 引数はASIN（10桁）でも商品ページURLでもよい。
 * 他人のタグが付いたURLを渡しても、ASINだけ取り出して自分のタグを付け直す。
 */
export function amazonLink(asinOrUrl: string): string {
  if (!AMAZON_ASSOCIATE_TAG) {
    throw new Error(
      'AMAZON_ASSOCIATE_TAG が未設定です。src/consts.ts にアソシエイトIDを設定してください。' +
        '（未設定のまま公開すると、リンクは動くのに紹介料が発生しません）'
    );
  }

  const asin = extractAsin(asinOrUrl);
  return `https://www.amazon.co.jp/dp/${asin}?tag=${AMAZON_ASSOCIATE_TAG}`;
}
