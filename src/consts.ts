/**
 * サイト全体の定数。表示名を変えるときはここだけを編集する。
 */

export const SITE_TITLE = '16タイプ研究室';
export const SITE_TAGLINE = 'INTJ（建築家）が書く、16タイプの分析ノート';
export const SITE_URL = 'https://16types.soleon.jp';

/**
 * 読みもの一覧の1ページあたり件数。
 * getStaticPaths は Astro が分離して実行するためフロントマターの変数を参照できない。
 * import なら届くので、ページ側ではなくここに置いている。
 */
export const POSTS_PER_PAGE = 6;

/** 筆者の性格タイプ。記事の署名と運営者情報で使う。 */
export const AUTHOR_TYPE = 'INTJ';

/** 運営者。Amazonアソシエイトの帰属表示にも使うので、実在の名称にすること。 */
export const OPERATOR = '株式会社SOLEON';
export const CONTACT_EMAIL = 'morita_daisuke@soleon.jp';

/**
 * AmazonアソシエイトのトラッキングID（例: 16types-22）。
 *
 * 登録すると即「仮参加」状態になり、承認前でもIDが発行されリンクを作れる。
 * ここに入れると src/lib/amazon.ts の amazonLink() が全リンクに自動で付ける。
 *
 * 空のまま ProductCard を使うとビルドが失敗する。これは意図的で、
 * タグ無しのリンク（動くのに紹介料が発生しない）を公開させないため。
 */
export const AMAZON_ASSOCIATE_TAG = '';

/**
 * ステマ規制（景品表示法・2023年10月施行）対応。
 * 「どこかに書く」では要件を満たさないため、全記事の冒頭に固定表示する。
 */
export const PR_LABEL = 'PR';
export const AFFILIATE_DISCLOSURE = 'この記事には広告が含まれます。';

/**
 * Amazonアソシエイト・プログラムが定める帰属表示。
 * 規約の書式は「Amazonのアソシエイトとして、[名称]は適格販売により収入を得ています。」
 * なので、運営者名を入れた形にしている。
 */
export const AMAZON_ATTRIBUTION = `Amazonのアソシエイトとして、${OPERATOR}は適格販売により収入を得ています。`;

/**
 * 商標・出自に関する注記。
 * 世間で「MBTI」と呼ばれている診断の多くは 16Personalities（NERIS Analytics）であり、
 * 日本MBTI協会が管理する MBTI® とは別物。当サイトはいずれとも無関係。
 */
export const DIAGNOSIS_NOTICE =
  '当サイトが扱うのは、一般に「MBTI」と呼ばれている16タイプ診断（16Personalities）です。日本MBTI協会が管理する MBTI® とは別のものであり、当サイトはいずれの団体とも関係がありません。';

/** 性格診断の断定を避けるための注記（優良誤認リスクの低減）。 */
export const ENTERTAINMENT_NOTICE =
  '性格タイプの解説はエンタメとしてお楽しみください。同じタイプでも人によって好みは異なります。';
