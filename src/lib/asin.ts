/**
 * AmazonのURLからASINを取り出す。
 *
 * このファイルは意図的に何もimportしない。
 * scripts/check-products.mjs から node で直接読めるようにするため
 * （依存があると ESM の解決に失敗する）。抽出規則を二重に持たないための分離。
 */

const ASIN_IN_PATH = /\/(?:dp|gp\/product|gp\/aw\/d|gp\/offer-listing)\/([A-Z0-9]{10})(?:[/?]|$)/i;
const BARE_ASIN = /^[A-Z0-9]{10}$/i;

/**
 * SiteStripe が出すリンクは追跡パラメータで1,000文字を超えることがあり、
 * 商品名スラッグも含まれる。スラッグはAmazon側の都合で変わるため、
 * ASINだけを頼りに短いURLへ正規化する。
 */
export function extractAsin(asinOrUrl: string): string {
  const input = asinOrUrl.trim();
  if (BARE_ASIN.test(input)) return input.toUpperCase();

  let url: URL;
  try {
    url = new URL(input);
  } catch {
    throw new Error(`extractAsin: ASINでもURLでもありません: ${input.slice(0, 80)}`);
  }

  if (!/(^|\.)amazon\.co\.jp$/.test(url.hostname)) {
    throw new Error(`extractAsin: amazon.co.jp 以外のURLです: ${url.hostname}`);
  }

  const fromPath = url.pathname.match(ASIN_IN_PATH);
  if (fromPath) return fromPath[1].toUpperCase();

  // 検索結果やリスト経由で ASIN がクエリ側にある場合の保険
  const fromQuery = url.searchParams.get('asin') ?? url.searchParams.get('ASIN');
  if (fromQuery && BARE_ASIN.test(fromQuery)) return fromQuery.toUpperCase();

  throw new Error(
    `extractAsin: URLからASINを取り出せません。商品ページ（/dp/ を含むURL）を指定してください: ${input.slice(0, 100)}`
  );
}
