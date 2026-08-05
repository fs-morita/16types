/**
 * ビルド内で一意なID接尾辞を配る。
 *
 * SVGの <pattern> や <clipPath> のIDは同一ページ内で衝突すると
 * url(#id) が最初の定義を拾ってしまい、別のテクスチャが適用される。
 * 同じタイプのマークを1ページに複数置く場面があるため、
 * タイプコードだけではIDが足りない。
 *
 * モジュールスコープに置く必要がある（.astro のフロントマターは
 * レンダリングのたびに実行されるため、そこでは状態を保てない）。
 */
let counter = 0;

export function nextUid(prefix: string): string {
  counter += 1;
  return `${prefix}-${counter}`;
}
