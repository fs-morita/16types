import type { Axis } from './mbti-types';

/**
 * 商品カタログ。
 *
 * 記事に商品を直書きしない。同じ商品が複数のタイプの記事に載るため、
 * 直書きだと価格やASINが変わったときに全記事を直す羽目になる。
 *
 * asin は products.csv に貼られたURLから `npm run products:check` で確認する。
 * 手で書き写すとタイプミスが静かに通ってしまうので、必ず出力を使うこと。
 */

export type Intent = 'gift' | 'self';

export interface Product {
  /** Amazonの商品ID（英数10桁）。 */
  asin: string;
  /** 商品名。カード見出しになるので、型番の羅列ではなく読める名前にする。 */
  name: string;
  /** 「約5,000円」形式。実価格は変動するので必ず概算と分かる書き方にする。 */
  priceHint?: string;
  category: string;
  /** この商品が刺さる指標。match.ts がタイプとの相性を測るのに使う。 */
  axes: Axis[];
  /** 贈り物向きか、自分用向きか。両方あり得る。 */
  intent: Intent[];
  /** 指標に翻訳した推薦理由。「INTJだからこれ」と書かないための欄。 */
  reason: string;
  /**
   * 気になる点。必須。
   * 良い点しか書かれていない商品紹介は信用されないので、省略できなくしてある。
   */
  cons: string;
}

/**
 * 商品の実データ。
 *
 * products.csv の url 列が埋まった行から順に追加していく。
 * reason / cons は公開情報を整理して書く（実際に使った体験談は書かない）。
 */
export const PRODUCTS: Record<string, Product> = {
  // ここに追加していく
};

/**
 * IDから商品を引く。存在しなければビルドを止める。
 *
 * 記事のタイプミスで商品カードが黙って消えるより、ビルドが落ちたほうがよい。
 */
export function getProduct(id: string): Product {
  const p = PRODUCTS[id];
  if (!p) {
    const known = Object.keys(PRODUCTS);
    throw new Error(
      `商品ID "${id}" は products.ts にありません。` +
        (known.length ? `登録済み: ${known.join(', ')}` : 'カタログはまだ空です。')
    );
  }
  return p;
}

export function allProducts(): (Product & { id: string })[] {
  return Object.entries(PRODUCTS).map(([id, p]) => ({ id, ...p }));
}
