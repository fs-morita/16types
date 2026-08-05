import { visit } from 'unist-util-visit';

/**
 * 記事内の <table> を <div class="scroll-x"> で包む rehype プラグイン。
 *
 * ComparisonTable コンポーネントは自前で .scroll-x を持っているが、
 * MDX 内に素の Markdown テーブルを書いた場合はそれを通らない。
 * 包まないと、幅の広い表がスマホでページ全体を横スクロールさせてしまう。
 *
 * 記事を書く人が毎回 div で囲うのを忘れないようにするより、
 * ビルド時に必ず包む方が確実なのでプラグインにしている。
 */
export function rehypeWrapTables() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'table' || !parent || index === null) return;

      // 既に .scroll-x で包まれているなら二重に包まない
      const cls = parent.properties?.className;
      const classes = Array.isArray(cls) ? cls : cls ? [cls] : [];
      if (classes.includes('scroll-x')) return;

      parent.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['scroll-x'] },
        children: [node],
      };
    });
  };
}
