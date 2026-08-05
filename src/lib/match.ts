import { axesOf, type MbtiType } from '../data/mbti-types';
import { allProducts, type Intent, type Product } from '../data/products';

export interface Match extends Product {
  id: string;
  /** そのタイプの4指標のうち、商品が該当した数（0〜4）。 */
  score: number;
  /** 該当した指標。記事で理由を書くときの手がかりになる。 */
  hits: string[];
}

/**
 * タイプに合う商品を、指標の一致数で並べて返す。
 *
 * 記事を書くたびに「このタイプに何が合うか」を考え直さずに済むようにするための道具。
 * ただし出てきた順に並べるだけの記事にはしないこと。
 * 最終的にどれを載せてどう説明するかは、指標に翻訳した理由とセットで人が決める。
 */
export function matchProducts(
  type: MbtiType,
  intent: Intent,
  limit?: number
): Match[] {
  const typeAxes = axesOf(type);

  const matches = allProducts()
    .filter((p) => p.intent.includes(intent))
    .map((p) => {
      const hits = p.axes.filter((a) => typeAxes.includes(a));
      return { ...p, score: hits.length, hits };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));

  return limit ? matches.slice(0, limit) : matches;
}
