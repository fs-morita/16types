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
  /**
   * 価格の目安。
   *
   * 現在は使わない（未設定なら ProductCard に表示されない）。
   * 価格は頻繁に変わるうえ、Amazon がブロックされていて現在価格を確認できないため、
   * 書くと推測になる。PA-API が使えるようになったら埋める。
   */
  priceHint?: string;
  category: string;
  /** この商品が刺さる指標。match.ts がタイプとの相性を測るのに使う。 */
  axes: Axis[];
  /** 贈り物向きか、自分用向きか。両方あり得る。 */
  intent: Intent[];
  /**
   * 「こういう性格の人に向く」を一言で。
   *
   * このサイトはレビューサイトではないので、商品のスペック説明は書かない。
   * ただし「INTJだからこれ」という決めつけにはしないこと。
   * 必ず指標（I・N・T・J など）に翻訳した言い方にする。
   * 記事の中身は性格の分析側にあり、商品はその帰結として置く。
   */
  reason: string;
}

/**
 * 商品の実データ。
 *
 * products.csv の url 列が埋まった行から順に追加していく。
 * reason は「こういう性格の人に向く」を一言だけ。商品のスペック説明は書かない。
 */
export const PRODUCTS: Record<string, Product> = {
  'aroma-diffuser': {
    asin: 'B0G4VW29T7',
    name: 'TOKAIZ アロマディフューザー TAD-005',
    category: '香り・リラックス',
    axes: ['I', 'F'],
    intent: ['gift', 'self'],
    reason: '一人の時間で気持ちを切り替える人（I・F）に。',
  },

  'silent-keyboard': {
    asin: 'B0GMJ79P2F',
    name: 'AIM1 瞬 MATATAKI キーボード',
    category: '集中・一人時間',
    axes: ['I', 'T'],
    intent: ['self'],
    reason: '静かな環境で一人で詰めたい人（I・T）に。',
  },

  'board-game': {
    asin: 'B0GNLZX2DJ',
    name: 'カタン スタンダード版（2026年版）',
    category: '体験・遊び',
    axes: ['E', 'P'],
    intent: ['gift'],
    reason: '人が集まる場をつくりたい人（E・P）に。',
  },

  'essay-book-set': {
    asin: '4401616634',
    name: 'ビートルズ全詩集（内田久美子 訳）',
    category: '本・知的好奇心',
    axes: ['N', 'F'],
    intent: ['gift'],
    reason: '言葉の世界に入り込むのが好きな人（N・F）に。',
  },

  'hand-cream-gift': {
    asin: 'B0FND47646',
    name: 'ハンドクリーム＆ネッククリーム ギフトボックス',
    category: '見た目・身につけるもの',
    axes: ['F', 'S'],
    intent: ['gift'],
    reason: '気持ちが伝わって、しかも実際に使えるものを選びたいとき（F・S）に。',
  },
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
