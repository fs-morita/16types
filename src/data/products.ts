import type { Axis } from './mbti-types';

/**
 * 商品カタログ。
 *
 * 記事に商品を直書きしない。同じ商品が複数のタイプの記事に載るため、
 * 直書きだと変更のたびに全記事を直す羽目になる。
 *
 * asin は products.csv に貼られたURLから `npm run products:check` で確認する。
 * 手で書き写すとタイプミスが静かに通ってしまうので、必ず出力を使うこと。
 */

export type Intent = 'gift' | 'self';

export interface Product {
  /** Amazonの商品ID（英数10桁。書籍はISBN-10）。 */
  asin: string;
  /** 商品名。カード見出しになるので、販促文句を削って読める長さにする。 */
  name: string;
  /**
   * 価格の目安。
   *
   * 現在は使わない（未設定なら ProductCard に表示されない）。
   * 価格は頻繁に変わるうえ、Amazon がブロックされていて現在価格を確認できないため、
   * 書くと推測になる。PA-API が使えるようになったら埋める。
   */
  priceHint?: string;
  /**
   * それが物理的に何なのか、一行だけ。
   *
   * Amazonは2023年末に画像リンクを廃止しており、商品画像はPA-API（承認後）でないと
   * 使えない。画像がないと読み手が何を渡されるのか想像できないため、
   * 言葉で最低限の輪郭を与える。
   *
   * これはスペック説明でもレビューでもなく、identification。
   * 性能や優位性を主張しない（主張しなければ優良誤認にもならない）。
   *   ○「その場で印刷できるカメラ」「3〜4人用のボードゲーム」
   *   ✕「高画質で美しく印刷できる高性能カメラ」
   */
  whatItIs: string;
  category: string;
  /** この商品が刺さる指標。match.ts がタイプとの相性を測るのに使う。 */
  axes: Axis[];
  /** 贈り物向きか、自分用向きか。両方あり得る。 */
  intent: Intent[];
}

/**
 * 商品の実データ。
 *
 * whatItIs は「それが物理的に何なのか」だけ。推薦理由は記事本文の指標分解に書く。
 */
export const PRODUCTS: Record<string, Product> = {
  // ---------------------------------------------------------- 香り・リラックス
  'aroma-diffuser': {
    asin: 'B0G4VW29T7',
    name: 'TOKAIZ アロマディフューザー TAD-005',
    whatItIs: '水を使わない卓上のディフューザー。充電式',
    category: '香り・リラックス',
    axes: ['I', 'F'],
    intent: ['gift', 'self'],
  },
  'essential-oil-set': {
    asin: 'B09Q2QX48T',
    name: 'Poven エッセンシャルオイル（ホワイトティー／イランイラン）',
    whatItIs: '精油2本のセット',
    category: '香り・リラックス',
    axes: ['I', 'F'],
    intent: ['gift', 'self'],
  },
  'hot-eye-mask': {
    asin: 'B08Z75MTYP',
    name: 'SALUA ホットアイマスク（コードレス）',
    whatItIs: '充電式のホットアイマスク',
    category: '香り・リラックス',
    axes: ['I', 'S'],
    intent: ['gift', 'self'],
  },
  'roll-on-aroma': {
    asin: 'B0DXN7V1YS',
    name: 'nahrin ハーブオイル33+7 ロールオン 10mL',
    whatItIs: '塗るタイプのハーブオイル。10mLの携帯サイズ',
    category: '香り・リラックス',
    axes: ['F', 'P'],
    intent: ['gift', 'self'],
  },
  'bath-salt-gift': {
    asin: 'B0DHTBKT24',
    name: '旅の宿 にごり湯 詰め合わせ',
    whatItIs: '入浴剤の詰め合わせ。個包装',
    category: '香り・リラックス',
    axes: ['F', 'S'],
    intent: ['gift'],
  },
  'weighted-blanket': {
    asin: 'B078V8WQBB',
    name: 'YnM ウェイトブランケット（9kg）',
    whatItIs: '重さのあるブランケット。約9kg',
    category: '香り・リラックス',
    axes: ['I', 'S'],
    intent: ['self'],
  },
  'pillow-mist': {
    asin: 'B0FRLW18RV',
    name: 'OPTATUM ピローミスト',
    whatItIs: '枕にかけるスプレー',
    category: '香り・リラックス',
    axes: ['I', 'F'],
    intent: ['gift'],
  },

  // ---------------------------------------------------------- 集中・一人時間
  'silent-keyboard': {
    asin: 'B0GMJ79P2F',
    name: 'AIM1 瞬 MATATAKI キーボード',
    whatItIs: 'ゲーミング向けのキーボード',
    category: '集中・一人時間',
    axes: ['I', 'T'],
    intent: ['self'],
  },
  'noise-cancel-earphone': {
    asin: 'B0CP4RQZ3L',
    name: 'Soundcore 完全ワイヤレスイヤホン（ノイズキャンセリング）',
    whatItIs: '完全ワイヤレスのイヤホン。ケース付き',
    category: '集中・一人時間',
    axes: ['I', 'T'],
    intent: ['self'],
  },
  'desk-light': {
    asin: 'B0FM3NXDVN',
    name: 'Hoxhyon クランプ式デスクライト（調色調光・リモコン）',
    whatItIs: '机に挟んで使うライト。リモコン付き',
    category: '集中・一人時間',
    axes: ['I', 'T'],
    intent: ['self'],
  },
  'monitor-light-bar': {
    asin: 'B0DZHJZWMM',
    name: 'Quntis モニターライト（3000K-6500K調光）',
    whatItIs: 'モニターの上に載せる細長いライト',
    category: '集中・一人時間',
    axes: ['I', 'T'],
    intent: ['self'],
  },
  'high-fidelity-earplug': {
    asin: 'B0FL1BH9VM',
    name: 'DJcong 耳栓（ノイズキャンセリング）',
    whatItIs: '耳栓。ケース付き',
    category: '集中・一人時間',
    axes: ['I', 'S'],
    intent: ['self'],
  },
  'footrest': {
    asin: 'B0FM7N5RM2',
    name: 'Baiinin フットレスト（整体師監修）',
    whatItIs: '足を載せる台。デスクの下に置く',
    category: '集中・一人時間',
    axes: ['I', 'S'],
    intent: ['self'],
  },
  'open-ear-earphone': {
    asin: 'B0DW3S2V9F',
    name: 'OpenDots ワイヤレスイヤホン（オープン型・40時間）',
    whatItIs: '耳を塞がない形のワイヤレスイヤホン',
    category: '集中・一人時間',
    axes: ['E', 'P'],
    intent: ['self'],
  },

  // ---------------------------------------------------------- 文具・ノート
  'planner-notebook': {
    asin: 'B00U2PGVT2',
    name: 'システム手帳 リフィル10点セット B6',
    whatItIs: 'B6サイズのシステム手帳用リフィル10種セット',
    category: '文具・ノート',
    axes: ['J', 'T'],
    intent: ['gift', 'self'],
  },
  'premium-notebook': {
    asin: 'B0DQKT77S3',
    name: 'LEATHER VILLAGE 革綴じジャーナル（260ページ・罫線入り）',
    whatItIs: '革表紙のノート。260ページ',
    category: '文具・ノート',
    axes: ['J', 'N'],
    intent: ['gift', 'self'],
  },
  'digital-memo-pad': {
    asin: 'B09N11MBML',
    name: 'prendre 電子メモパッド 8.5インチ（消去ロック付）',
    whatItIs: '書いて消せる電子メモ板。8.5インチ',
    category: '文具・ノート',
    axes: ['N', 'P'],
    intent: ['gift', 'self'],
  },
  'fountain-pen-ink-set': {
    asin: 'B07WZ28M52',
    name: 'Wordsworth&Black 万年筆インクカートリッジ 30本セット',
    whatItIs: '万年筆用インクカートリッジ30本',
    category: '文具・ノート',
    axes: ['N', 'P'],
    intent: ['gift'],
  },
  'fountain-pen': {
    asin: 'B07ZXFSZTV',
    name: 'Hongdian 万年筆 極細字（ギフトボックス入り）',
    whatItIs: '万年筆1本。箱入り',
    category: '文具・ノート',
    axes: ['J', 'F'],
    intent: ['gift'],
  },
  'leather-pen-case': {
    asin: 'B0B4DQ25T9',
    name: '亀登鞄製作所 レザーペンケース',
    whatItIs: '革のペンケース',
    category: '文具・ノート',
    axes: ['J', 'F'],
    intent: ['gift'],
  },
  'stamp-set': {
    asin: 'B0DSBK178Q',
    name: '木製スタンプ 42個セット（数字・曜日）',
    whatItIs: '木製スタンプ42個。箱入り',
    category: '文具・ノート',
    axes: ['P', 'F'],
    intent: ['gift'],
  },
  'desk-organizer': {
    asin: 'B08ZSJZ9DF',
    name: 'Vlando デスクオーガナイザー（ペン立て・小物収納）',
    whatItIs: '机に置く小物入れ。ペン立て付き',
    category: '文具・ノート',
    axes: ['J', 'S'],
    intent: ['self'],
  },

  // ---------------------------------------------------------- 本・知的好奇心
  'ebook-reader': {
    asin: 'B0CP31L73X',
    name: 'Kindle 6インチ（16GB・広告なし）',
    whatItIs: '6インチの電子書籍リーダー',
    category: '本・知的好奇心',
    axes: ['N', 'I'],
    intent: ['gift', 'self'],
  },
  'essay-book-set': {
    asin: '4401616634',
    name: 'ビートルズ全詩集（内田久美子 訳）',
    whatItIs: '歌詞の対訳を集めた本',
    category: '本・知的好奇心',
    axes: ['N', 'F'],
    intent: ['gift'],
  },
  'building-blocks': {
    asin: 'B0FM7SQBJ7',
    name: 'Nifeliz 蒸気機関車 組み立てブロック（1,587ピース）',
    whatItIs: '組み立てるブロック。1,587ピース',
    category: '本・知的好奇心',
    axes: ['N', 'P'],
    intent: ['gift'],
  },
  'art-poster': {
    asin: 'B09VCD2NVP',
    name: 'バンクシー「風船と少女」アートポスター 30×40cm',
    whatItIs: '額なしのポスター。30×40cm',
    category: '本・知的好奇心',
    axes: ['N', 'F'],
    intent: ['gift'],
  },
  'star-projector': {
    asin: 'B0FFGN8XPZ',
    name: 'POCOCO スタープロジェクターライト',
    whatItIs: '天井に星空を映す卓上の投影機',
    category: '本・知的好奇心',
    axes: ['N', 'F'],
    intent: ['gift'],
  },
  'book-stand': {
    asin: 'B0D315FQ34',
    name: 'viozon ブックスタンド（360度回転・高さ調節）',
    whatItIs: '本を開いたまま立てる台。折りたたみ式',
    category: '本・知的好奇心',
    axes: ['N', 'T'],
    intent: ['self'],
  },
  'clip-book-light': {
    asin: 'B0DWSNHJFQ',
    name: 'Glocusent クリップ式読書ライト（色温度3段階）',
    whatItIs: '挟んで使う小型の読書ライト',
    category: '本・知的好奇心',
    axes: ['N', 'I'],
    intent: ['self'],
  },
  'puzzle-3d': {
    asin: 'B08P77QKV5',
    name: 'ROKR 3D立体パズル（木製・機械式モデル）',
    whatItIs: '木のパーツを組む立体パズル。完成すると動く',
    category: '本・知的好奇心',
    axes: ['N', 'P'],
    intent: ['gift'],
  },

  // ---------------------------------------------------------- 体験・遊び
  'board-game': {
    asin: 'B0GNLZX2DJ',
    name: 'カタン スタンダード版（2026年版）',
    whatItIs: '3〜4人用のボードゲーム。1回60分以上',
    category: '体験・遊び',
    axes: ['E', 'P'],
    intent: ['gift'],
  },
  'party-card-game': {
    asin: 'B0H2ZV2QBJ',
    name: 'MottainaiGames「定時退社」（戦略型ババ抜き）',
    whatItIs: 'カードゲーム',
    category: '体験・遊び',
    axes: ['E', 'P'],
    intent: ['gift'],
  },
  'escape-room-kit': {
    asin: 'B07FMM4FS7',
    name: 'ESCALOGUE「アリスと謎とくらやみの物語」',
    whatItIs: '1回で遊びきる形式の謎解きキット',
    category: '体験・遊び',
    axes: ['N', 'P'],
    intent: ['gift'],
  },
  'travel-gear': {
    asin: 'B0DJ8G59KY',
    name: 'INSFIT シリコーン旅行用ボトルセット',
    whatItIs: '詰め替え用のシリコンボトル数本セット',
    category: '体験・遊び',
    axes: ['E', 'P'],
    intent: ['gift', 'self'],
  },
  'instant-camera': {
    asin: 'B088PQR3YL',
    name: 'KODAK Retro 4PASS インスタントカメラ＆プリンター',
    whatItIs: '撮ってその場で印刷できるカメラ。フィルム付き',
    category: '体験・遊び',
    axes: ['E', 'P'],
    intent: ['gift'],
  },
  'portable-speaker': {
    asin: 'B01NAVANRX',
    name: 'Anker SoundCore Bluetoothスピーカー',
    whatItIs: '手のひらサイズのBluetoothスピーカー',
    category: '体験・遊び',
    axes: ['E', 'P'],
    intent: ['gift'],
  },
  'mini-projector': {
    asin: 'B0CJDV213W',
    name: 'Nebula モバイルプロジェクター（最大120インチ）',
    whatItIs: '持ち運べるプロジェクター。本体だけで動く',
    category: '体験・遊び',
    axes: ['E', 'N'],
    intent: ['gift'],
  },
  'craft-kit': {
    asin: 'B08VRWRP6B',
    name: 'レザークラフトキット（キーホルダー3種）',
    whatItIs: 'キーホルダーを作る革のキット。3種入り',
    category: '体験・遊び',
    axes: ['P', 'S'],
    intent: ['gift'],
  },
  'outdoor-lantern': {
    asin: 'B0FR94GDC2',
    name: 'LEDランタン 1800ルーメン（充電・電池両用）',
    whatItIs: '吊るせるLEDランタン',
    category: '体験・遊び',
    axes: ['P', 'S'],
    intent: ['gift'],
  },

  // ---------------------------------------------------------- キッチン・食
  'hot-plate': {
    asin: 'B07CPM1XBY',
    name: 'BRUNO コンパクトホットプレート',
    whatItIs: '卓上のホットプレート。プレート交換式',
    category: 'キッチン・食',
    axes: ['E', 'S'],
    intent: ['gift'],
  },
  'temp-control-kettle': {
    asin: 'B0CG18ZM6J',
    name: '電気ケトル 1.0L（7段階温度調節・デジタル表示）',
    whatItIs: '温度を数字で設定できる電気ケトル。1.0L',
    category: 'キッチン・食',
    axes: ['S', 'T'],
    intent: ['gift', 'self'],
  },
  'coffee-dripper-set': {
    asin: 'B07NRXYXTZ',
    name: 'HARIO ドリッパー・サーバーセット',
    whatItIs: 'ドリッパーとサーバーのセット',
    category: 'キッチン・食',
    axes: ['S', 'J'],
    intent: ['gift'],
  },
  'coffee-beans-gift': {
    asin: 'B0D3HGW6X4',
    name: '豆善 ドリップコーヒー 4種16個セット',
    whatItIs: 'ドリップバッグ16個の詰め合わせ',
    category: 'キッチン・食',
    axes: ['S', 'F'],
    intent: ['gift'],
  },
  'tea-gift-set': {
    asin: 'B07588XYYT',
    name: 'ティーバッグ 4種アソート 22包（ギフト包装付）',
    whatItIs: 'ティーバッグ22包。手提袋付き',
    category: 'キッチン・食',
    axes: ['S', 'F'],
    intent: ['gift'],
  },
  'seasoning-gift': {
    asin: 'B0C73MTN8S',
    name: 'LUISA エキストラバージンオリーブオイル 190g×2（有機JAS）',
    whatItIs: 'オリーブオイル190g×2本',
    category: 'キッチン・食',
    axes: ['S', 'F'],
    intent: ['gift'],
  },
  'sweets-gift-box': {
    asin: 'B0G1B6LPGK',
    name: 'Blissmy ナッツチョコ 3種詰め合わせ',
    whatItIs: 'ナッツチョコの詰め合わせ。箱入り',
    category: 'キッチン・食',
    axes: ['S', 'F'],
    intent: ['gift'],
  },
  'insulated-tumbler': {
    asin: 'B0FKGP8GHJ',
    name: 'サーモス 真空断熱スープジャー JEG-200',
    whatItIs: '保温できるスープジャー。200mL',
    category: 'キッチン・食',
    axes: ['S', 'J'],
    intent: ['gift'],
  },

  // ---------------------------------------------------- 見た目・身につけるもの
  'hand-cream-gift': {
    asin: 'B0FND47646',
    name: 'ハンドクリーム＆ネッククリーム ギフトボックス',
    whatItIs: 'ハンドクリームとネッククリームのセット。箱入り',
    category: '見た目・身につけるもの',
    axes: ['F', 'S'],
    intent: ['gift'],
  },
  'name-engraved-gift': {
    asin: 'B06X96L2N3',
    name: 'きざむ 名入れステンレスタンブラー 420ml',
    whatItIs: '名前を入れられるステンレスタンブラー。420mL',
    category: '見た目・身につけるもの',
    axes: ['E', 'F'],
    intent: ['gift'],
  },
  'leather-pouch': {
    asin: 'B0FNR65JJ7',
    name: 'LIB 撥水レザー フラットポーチ',
    whatItIs: '平たい革のポーチ',
    category: '見た目・身につけるもの',
    axes: ['F', 'J'],
    intent: ['gift'],
  },
  'scarf-stole': {
    asin: 'B0052VHYL0',
    name: '今治タオル マフラー（宮崎タオル）',
    whatItIs: '今治タオル地のマフラー',
    category: '見た目・身につけるもの',
    axes: ['F', 'E'],
    intent: ['gift'],
  },
  'simple-accessory': {
    asin: 'B08BXS1KRW',
    name: 'ネックレス・ピアス セット',
    whatItIs: 'ネックレスとピアスのセット。箱入り',
    category: '見た目・身につけるもの',
    axes: ['F', 'E'],
    intent: ['gift'],
  },
  'tote-bag': {
    asin: 'B082YRL9CL',
    name: 'クラッチバッグ（手持ち・セカンドバッグ）',
    whatItIs: '手で持つ小さめのバッグ',
    category: '見た目・身につけるもの',
    axes: ['F', 'S'],
    intent: ['gift'],
  },
  'fragrance-mini': {
    asin: 'B0DFC9M58Q',
    name: '香水お試しサンプルセット（1.5mL×5本）',
    whatItIs: '香水のミニボトル5本セット',
    category: '見た目・身につけるもの',
    axes: ['F', 'E'],
    intent: ['gift'],
  },
  'leather-key-case': {
    asin: 'B08Q77NFMN',
    name: 'BARRANCA キーケース 6連（専用ボックス付）',
    whatItIs: '革のキーケース。箱入り',
    category: '見た目・身につけるもの',
    axes: ['F', 'J'],
    intent: ['gift'],
  },

  // ---------------------------------------------------------- 実用・道具
  'multi-tool': {
    asin: 'B092DVSKF8',
    name: 'VICTORINOX クラシック（マルチツール）',
    whatItIs: '小型の十徳ナイフ。キーホルダーサイズ',
    category: '実用・道具',
    axes: ['S', 'T'],
    intent: ['gift', 'self'],
  },
  'label-printer': {
    asin: 'B0CZ6WCHGF',
    name: 'NIIMBOT ラベルプリンター（Bluetooth）',
    whatItIs: '手のひらサイズのラベルプリンター',
    category: '実用・道具',
    axes: ['J', 'T'],
    intent: ['self'],
  },
  'whiteboard-sheet': {
    asin: 'B08X29Y3X5',
    name: 'Teika 貼ってはがせるホワイトボード 60×120cm',
    whatItIs: '壁に貼るホワイトボードシート。60×120cm',
    category: '実用・道具',
    axes: ['N', 'P'],
    intent: ['self'],
  },
  'modular-desk-mat': {
    asin: 'B07QXX1JVV',
    name: 'YSAGi 大型デスクパッド（80cm・裏面スエード）',
    whatItIs: '机に敷く大判のマット。80cm幅',
    category: '実用・道具',
    axes: ['P', 'T'],
    intent: ['self'],
  },
  'cable-organizer': {
    asin: 'B0CM9F4WCJ',
    name: 'ケーブルホルダー・クリップ',
    whatItIs: 'ケーブルをまとめるクリップ',
    category: '実用・道具',
    axes: ['J', 'S'],
    intent: ['self'],
  },
  'power-bank': {
    asin: 'B0F43XLHSM',
    name: 'モバイルバッテリー 20000mAh（16mm薄型）',
    whatItIs: 'モバイルバッテリー。20000mAh',
    category: '実用・道具',
    axes: ['S', 'T'],
    intent: ['self'],
  },
  'storage-box': {
    asin: 'B0BG8G194G',
    name: 'XUNTAO 収納ボックス 3個セット',
    whatItIs: 'ふた付き収納ボックス3個',
    category: '実用・道具',
    axes: ['J', 'S'],
    intent: ['self'],
  },
  'precision-driver-set': {
    asin: 'B096PHZQ2M',
    name: '精密ドライバーセット（差し替え式）',
    whatItIs: '先端を差し替える精密ドライバーのセット',
    category: '実用・道具',
    axes: ['S', 'T'],
    intent: ['self'],
  },
  'handy-vacuum': {
    asin: 'B0BLS7R3F4',
    name: 'ハンディクリーナー（コードレス・380g）',
    whatItIs: '片手で持てる掃除機。380g',
    category: '実用・道具',
    axes: ['S', 'J'],
    intent: ['self'],
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
