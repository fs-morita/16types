import { AMAZON_ASSOCIATE_TAG } from '../consts';

/**
 * Amazonの商品URLにアソシエイトタグを付ける。
 *
 * 記事側でタグを手打ちさせない。手打ちにすると、いつか必ず付け忘れが起きて
 * 「リンクは動くが1円も入らない記事」が静かに増えるため。
 *
 * 引数はASIN（10桁）でもフルURLでもよい。
 *   amazonLink('B0XXXXXXXX')
 *   amazonLink('https://www.amazon.co.jp/dp/B0XXXXXXXX')
 */
export function amazonLink(asinOrUrl: string): string {
  if (!AMAZON_ASSOCIATE_TAG) {
    throw new Error(
      'AMAZON_ASSOCIATE_TAG が未設定です。src/consts.ts にアソシエイトIDを設定してください。' +
        '（未設定のまま公開すると、リンクは動くのに紹介料が発生しません）'
    );
  }

  // ASIN は英数10桁。それ以外はURLとして扱う
  const isAsin = /^[A-Z0-9]{10}$/i.test(asinOrUrl.trim());
  const url = new URL(
    isAsin ? `https://www.amazon.co.jp/dp/${asinOrUrl.trim().toUpperCase()}` : asinOrUrl
  );

  if (url.hostname !== 'www.amazon.co.jp' && url.hostname !== 'amazon.co.jp') {
    throw new Error(`amazonLink: amazon.co.jp 以外のURLが渡されました: ${asinOrUrl}`);
  }

  // 余計なトラッキングパラメータを落としてから自分のタグを付ける
  for (const key of [...url.searchParams.keys()]) {
    if (key !== 'tag') url.searchParams.delete(key);
  }
  url.searchParams.set('tag', AMAZON_ASSOCIATE_TAG);

  return url.toString();
}
