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
 * reason は「こういう性格の人に向く」を一言だけ。商品のスペック説明は書かない。
 */
export const PRODUCTS: Record<string, Product> = {
  // ---------------------------------------------------------- 香り・リラックス
  'aroma-diffuser': {
    asin: 'B0G4VW29T7',
    name: 'TOKAIZ アロマディフューザー TAD-005',
    category: '香り・リラックス',
    axes: ['I', 'F'],
    intent: ['gift', 'self'],
    reason: '一人の時間で気持ちを切り替える人（I・F）に。',
  },
  'essential-oil-set': {
    asin: 'B09Q2QX48T',
    name: 'Poven エッセンシャルオイル（ホワイトティー／イランイラン）',
    category: '香り・リラックス',
    axes: ['I', 'F'],
    intent: ['gift', 'self'],
    reason: '香りで気分を動かす人（I・F）に。まず何種類か試したいときにも。',
  },
  'hot-eye-mask': {
    asin: 'B08Z75MTYP',
    name: 'SALUA ホットアイマスク（コードレス）',
    category: '香り・リラックス',
    axes: ['I', 'S'],
    intent: ['gift', 'self'],
    reason: '一日の終わりに、体感でスイッチを切りたい人（I・S）に。',
  },
  'roll-on-aroma': {
    asin: 'B0DXN7V1YS',
    name: 'nahrin ハーブオイル33+7 ロールオン 10mL',
    category: '香り・リラックス',
    axes: ['F', 'P'],
    intent: ['gift', 'self'],
    reason: '決まった使い方に縛られず、気分で持ち歩きたい人（F・P）に。',
  },
  'bath-salt-gift': {
    asin: 'B0DHTBKT24',
    name: '旅の宿 にごり湯 詰め合わせ',
    category: '香り・リラックス',
    axes: ['F', 'S'],
    intent: ['gift'],
    reason: '気持ちが伝わって、その日のうちに使えるもの（F・S）を選びたいとき。',
  },
  'weighted-blanket': {
    asin: 'B078V8WQBB',
    name: 'YnM ウェイトブランケット（9kg）',
    category: '香り・リラックス',
    axes: ['I', 'S'],
    intent: ['self'],
    reason: '体のほうから落ち着きを取り戻したい人（I・S）に。',
  },
  'pillow-mist': {
    asin: 'B0FRLW18RV',
    name: 'OPTATUM ピローミスト',
    category: '香り・リラックス',
    axes: ['I', 'F'],
    intent: ['gift'],
    reason: '眠る前にひと区切りつけたい人（I・F）に。',
  },

  // ---------------------------------------------------------- 集中・一人時間
  'silent-keyboard': {
    asin: 'B0GMJ79P2F',
    name: 'AIM1 瞬 MATATAKI キーボード',
    category: '集中・一人時間',
    axes: ['I', 'T'],
    intent: ['self'],
    reason: '静かな環境で一人で詰めたい人（I・T）に。',
  },
  'noise-cancel-earphone': {
    asin: 'B0CP4RQZ3L',
    name: 'Soundcore 完全ワイヤレスイヤホン（ノイズキャンセリング）',
    category: '集中・一人時間',
    axes: ['I', 'T'],
    intent: ['self'],
    reason: '周囲を遮ってから始めたい人（I・T）に。',
  },
  'desk-light': {
    asin: 'B0FM3NXDVN',
    name: 'Hoxhyon クランプ式デスクライト（調色調光・リモコン）',
    category: '集中・一人時間',
    axes: ['I', 'T'],
    intent: ['self'],
    reason: '手元の環境を細かく詰めたい人（I・T）に。',
  },
  'monitor-light-bar': {
    asin: 'B0DZHJZWMM',
    name: 'Quntis モニターライト（3000K-6500K調光）',
    category: '集中・一人時間',
    axes: ['I', 'T'],
    intent: ['self'],
    reason: '夜に一人で作業する時間が長い人（I・T）に。',
  },
  'high-fidelity-earplug': {
    asin: 'B0FL1BH9VM',
    name: 'DJcong 耳栓（ノイズキャンセリング）',
    category: '集中・一人時間',
    axes: ['I', 'S'],
    intent: ['self'],
    reason: '音そのものを物理的に減らしたい人（I・S）に。',
  },
  'footrest': {
    asin: 'B0FM7N5RM2',
    name: 'Baiinin フットレスト（整体師監修）',
    category: '集中・一人時間',
    axes: ['I', 'S'],
    intent: ['self'],
    reason: '同じ場所に長く座る人（I・S）に。',
  },
  'open-ear-earphone': {
    asin: 'B0DW3S2V9F',
    name: 'OpenDots ワイヤレスイヤホン（オープン型・40時間）',
    category: '集中・一人時間',
    axes: ['E', 'P'],
    intent: ['self'],
    reason: '周りの音を切らずに聴きたい人（E・P）に。',
  },

  // ---------------------------------------------------------- 文具・ノート
  'planner-notebook': {
    asin: 'B00U2PGVT2',
    name: 'システム手帳 リフィル10点セット B6',
    category: '文具・ノート',
    axes: ['J', 'T'],
    intent: ['gift', 'self'],
    reason: '予定を自分の型で組み立てたい人（J・T）に。',
  },
  'premium-notebook': {
    asin: 'B0DQKT77S3',
    name: 'LEATHER VILLAGE 革綴じジャーナル（260ページ・罫線入り）',
    category: '文具・ノート',
    axes: ['J', 'N'],
    intent: ['gift', 'self'],
    reason: '書きながら考えを広げる人（J・N）に。',
  },
  'digital-memo-pad': {
    asin: 'B09N11MBML',
    name: 'prendre 電子メモパッド 8.5インチ（消去ロック付）',
    category: '文具・ノート',
    axes: ['N', 'P'],
    intent: ['gift', 'self'],
    reason: '思いついたそばから書き散らす人（N・P）に。',
  },
  'fountain-pen-ink-set': {
    asin: 'B07WZ28M52',
    name: 'Wordsworth&Black 万年筆インクカートリッジ 30本セット',
    category: '文具・ノート',
    axes: ['N', 'P'],
    intent: ['gift'],
    reason: '色を変えながら書き分けたい人（N・P）に。',
  },
  'fountain-pen': {
    asin: 'B07ZXFSZTV',
    name: 'Hongdian 万年筆 極細字（ギフトボックス入り）',
    category: '文具・ノート',
    axes: ['J', 'F'],
    intent: ['gift'],
    reason: '書く道具そのものを大事にする人（J・F）に。',
  },
  'leather-pen-case': {
    asin: 'B0B4DQ25T9',
    name: '亀登鞄製作所 レザーペンケース',
    category: '文具・ノート',
    axes: ['J', 'F'],
    intent: ['gift'],
    reason: '道具を長く使う人（J・F）に。',
  },
  'stamp-set': {
    asin: 'B0DSBK178Q',
    name: '木製スタンプ 42個セット（数字・曜日）',
    category: '文具・ノート',
    axes: ['P', 'F'],
    intent: ['gift'],
    reason: '手帳を自分の手で崩していきたい人（P・F）に。',
  },
  'desk-organizer': {
    asin: 'B08ZSJZ9DF',
    name: 'Vlando デスクオーガナイザー（ペン立て・小物収納）',
    category: '文具・ノート',
    axes: ['J', 'S'],
    intent: ['self'],
    reason: 'ものの定位置を決めたい人（J・S）に。',
  },

  // ---------------------------------------------------------- 本・知的好奇心
  'ebook-reader': {
    asin: 'B0CP31L73X',
    name: 'Kindle 6インチ（16GB・広告なし）',
    category: '本・知的好奇心',
    axes: ['N', 'I'],
    intent: ['gift', 'self'],
    reason: '一人で本の世界に入る時間が要る人（N・I）に。',
  },
  'essay-book-set': {
    asin: '4401616634',
    name: 'ビートルズ全詩集（内田久美子 訳）',
    category: '本・知的好奇心',
    axes: ['N', 'F'],
    intent: ['gift'],
    reason: '言葉の世界に入り込むのが好きな人（N・F）に。',
  },
  'building-blocks': {
    asin: 'B0FM7SQBJ7',
    name: 'Nifeliz 蒸気機関車 組み立てブロック（1,587ピース）',
    category: '本・知的好奇心',
    axes: ['N', 'P'],
    intent: ['gift'],
    reason: '手を動かしながら没入したい人（N・P）に。',
  },
  'art-poster': {
    asin: 'B09VCD2NVP',
    name: 'バンクシー「風船と少女」アートポスター 30×40cm',
    category: '本・知的好奇心',
    axes: ['N', 'F'],
    intent: ['gift'],
    reason: '部屋に意味のあるものを置きたい人（N・F）に。',
  },
  'star-projector': {
    asin: 'B0FFGN8XPZ',
    name: 'POCOCO スタープロジェクターライト',
    category: '本・知的好奇心',
    axes: ['N', 'F'],
    intent: ['gift'],
    reason: '部屋の空気ごと変えたい人（N・F）に。',
  },
  'book-stand': {
    asin: 'B0D315FQ34',
    name: 'viozon ブックスタンド（360度回転・高さ調節）',
    category: '本・知的好奇心',
    axes: ['N', 'T'],
    intent: ['self'],
    reason: '読みながら手を空けておきたい人（N・T）に。',
  },
  'clip-book-light': {
    asin: 'B0DWSNHJFQ',
    name: 'Glocusent クリップ式読書ライト（色温度3段階）',
    category: '本・知的好奇心',
    axes: ['N', 'I'],
    intent: ['self'],
    reason: '寝る前に一人で読む人（N・I）に。',
  },
  'puzzle-3d': {
    asin: 'B08P77QKV5',
    name: 'ROKR 3D立体パズル（木製・機械式モデル）',
    category: '本・知的好奇心',
    axes: ['N', 'P'],
    intent: ['gift'],
    reason: '完成より過程のほうが好きな人（N・P）に。',
  },

  // ---------------------------------------------------------- 体験・遊び
  'board-game': {
    asin: 'B0GNLZX2DJ',
    name: 'カタン スタンダード版（2026年版）',
    category: '体験・遊び',
    axes: ['E', 'P'],
    intent: ['gift'],
    reason: '人が集まる場をつくりたい人（E・P）に。',
  },
  'party-card-game': {
    asin: 'B0H2ZV2QBJ',
    name: 'MottainaiGames「定時退社」（戦略型ババ抜き）',
    category: '体験・遊び',
    axes: ['E', 'P'],
    intent: ['gift'],
    reason: '集まってすぐ始められるものを探している人（E・P）に。',
  },
  'escape-room-kit': {
    asin: 'B07FMM4FS7',
    name: 'ESCALOGUE「アリスと謎とくらやみの物語」',
    category: '体験・遊び',
    axes: ['N', 'P'],
    intent: ['gift'],
    reason: '物語ごと謎に入り込みたい人（N・P）に。',
  },
  'travel-gear': {
    asin: 'B0DJ8G59KY',
    name: 'INSFIT シリコーン旅行用ボトルセット',
    category: '体験・遊び',
    axes: ['E', 'P'],
    intent: ['gift', 'self'],
    reason: '身軽に動きたい人（E・P）に。',
  },
  'instant-camera': {
    asin: 'B088PQR3YL',
    name: 'KODAK Retro 4PASS インスタントカメラ＆プリンター',
    category: '体験・遊び',
    axes: ['E', 'P'],
    intent: ['gift'],
    reason: 'その場の空気を、その場で形にしたい人（E・P）に。',
  },
  'portable-speaker': {
    asin: 'B01NAVANRX',
    name: 'Anker SoundCore Bluetoothスピーカー',
    category: '体験・遊び',
    axes: ['E', 'P'],
    intent: ['gift'],
    reason: 'どこにいても場をつくる人（E・P）に。',
  },
  'mini-projector': {
    asin: 'B0CJDV213W',
    name: 'Nebula モバイルプロジェクター（最大120インチ）',
    category: '体験・遊び',
    axes: ['E', 'N'],
    intent: ['gift'],
    reason: '部屋を別の場所に変えたい人（E・N）に。',
  },
  'craft-kit': {
    asin: 'B08VRWRP6B',
    name: 'レザークラフトキット（キーホルダー3種）',
    category: '体験・遊び',
    axes: ['P', 'S'],
    intent: ['gift'],
    reason: '手を動かして作るのが好きな人（P・S）に。',
  },
  'outdoor-lantern': {
    asin: 'B0FR94GDC2',
    name: 'LEDランタン 1800ルーメン（充電・電池両用）',
    category: '体験・遊び',
    axes: ['P', 'S'],
    intent: ['gift'],
    reason: '外でも家でも使い回したい人（P・S）に。',
  },

  // ---------------------------------------------------------- キッチン・食
  'hot-plate': {
    asin: 'B07CPM1XBY',
    name: 'BRUNO コンパクトホットプレート',
    category: 'キッチン・食',
    axes: ['E', 'S'],
    intent: ['gift'],
    reason: '人を呼んで囲むのが好きな人（E・S）に。',
  },
  'temp-control-kettle': {
    asin: 'B0CG18ZM6J',
    name: '電気ケトル 1.0L（7段階温度調節・デジタル表示）',
    category: 'キッチン・食',
    axes: ['S', 'T'],
    intent: ['gift', 'self'],
    reason: '温度まで自分で決めたい人（S・T）に。',
  },
  'coffee-dripper-set': {
    asin: 'B07NRXYXTZ',
    name: 'HARIO ドリッパー・サーバーセット',
    category: 'キッチン・食',
    axes: ['S', 'J'],
    intent: ['gift'],
    reason: '毎朝の手順を持っている人（S・J）に。',
  },
  'coffee-beans-gift': {
    asin: 'B0D3HGW6X4',
    name: '豆善 ドリップコーヒー 4種16個セット',
    category: 'キッチン・食',
    axes: ['S', 'F'],
    intent: ['gift'],
    reason: '毎日の中に少しだけ違いを入れたい人（S・F）に。',
  },
  'tea-gift-set': {
    asin: 'B07588XYYT',
    name: 'ティーバッグ 4種アソート 22包（ギフト包装付）',
    category: 'キッチン・食',
    axes: ['S', 'F'],
    intent: ['gift'],
    reason: '気軽に渡せて、気軽に使ってもらえるもの（S・F）を探しているとき。',
  },
  'seasoning-gift': {
    asin: 'B0C73MTN8S',
    name: 'LUISA エキストラバージンオリーブオイル 190g×2（有機JAS）',
    category: 'キッチン・食',
    axes: ['S', 'F'],
    intent: ['gift'],
    reason: '自分で料理をする相手（S・F）に。',
  },
  'sweets-gift-box': {
    asin: 'B0G1B6LPGK',
    name: 'Blissmy ナッツチョコ 3種詰め合わせ',
    category: 'キッチン・食',
    axes: ['S', 'F'],
    intent: ['gift'],
    reason: '甘いものを分け合える相手（S・F）に。',
  },
  'insulated-tumbler': {
    asin: 'B0FKGP8GHJ',
    name: 'サーモス 真空断熱スープジャー JEG-200',
    category: 'キッチン・食',
    axes: ['S', 'J'],
    intent: ['gift'],
    reason: '毎日の段取りが決まっている人（S・J）に。',
  },

  // ---------------------------------------------------- 見た目・身につけるもの
  'hand-cream-gift': {
    asin: 'B0FND47646',
    name: 'ハンドクリーム＆ネッククリーム ギフトボックス',
    category: '見た目・身につけるもの',
    axes: ['F', 'S'],
    intent: ['gift'],
    reason: '気持ちが伝わって、しかも実際に使えるものを選びたいとき（F・S）に。',
  },
  'name-engraved-gift': {
    asin: 'B06X96L2N3',
    name: 'きざむ 名入れステンレスタンブラー 420ml',
    category: '見た目・身につけるもの',
    axes: ['E', 'F'],
    intent: ['gift'],
    reason: '相手の名前が残るものを贈りたいとき（E・F）に。',
  },
  'leather-pouch': {
    asin: 'B0FNR65JJ7',
    name: 'LIB 撥水レザー フラットポーチ',
    category: '見た目・身につけるもの',
    axes: ['F', 'J'],
    intent: ['gift'],
    reason: '持ち物をきちんと収めたい人（F・J）に。',
  },
  'scarf-stole': {
    asin: 'B0052VHYL0',
    name: '今治タオル マフラー（宮崎タオル）',
    category: '見た目・身につけるもの',
    axes: ['F', 'E'],
    intent: ['gift'],
    reason: '身につけるものを贈りたいとき（F・E）に。',
  },
  'simple-accessory': {
    asin: 'B08BXS1KRW',
    name: 'ネックレス・ピアス セット',
    category: '見た目・身につけるもの',
    axes: ['F', 'E'],
    intent: ['gift'],
    reason: '気持ちを形にして渡したいとき（F・E）に。',
  },
  'tote-bag': {
    asin: 'B082YRL9CL',
    name: 'クラッチバッグ（手持ち・セカンドバッグ）',
    category: '見た目・身につけるもの',
    axes: ['F', 'S'],
    intent: ['gift'],
    reason: '毎日持ち歩くものを贈りたいとき（F・S）に。',
  },
  'fragrance-mini': {
    asin: 'B0DFC9M58Q',
    name: '香水お試しサンプルセット（1.5mL×5本）',
    category: '見た目・身につけるもの',
    axes: ['F', 'E'],
    intent: ['gift'],
    reason: '好みが読みきれない相手に、まず試してもらいたいとき（F・E）に。',
  },
  'leather-key-case': {
    asin: 'B08Q77NFMN',
    name: 'BARRANCA キーケース 6連（専用ボックス付）',
    category: '見た目・身につけるもの',
    axes: ['F', 'J'],
    intent: ['gift'],
    reason: '毎日使うものをきちんと贈りたいとき（F・J）に。',
  },

  // ---------------------------------------------------------- 実用・道具
  'multi-tool': {
    asin: 'B092DVSKF8',
    name: 'VICTORINOX クラシック（マルチツール）',
    category: '実用・道具',
    axes: ['S', 'T'],
    intent: ['gift', 'self'],
    reason: '手元に一つあると落ち着く人（S・T）に。',
  },
  'label-printer': {
    asin: 'B0CZ6WCHGF',
    name: 'NIIMBOT ラベルプリンター（Bluetooth）',
    category: '実用・道具',
    axes: ['J', 'T'],
    intent: ['self'],
    reason: '場所を決めて、その状態を保ちたい人（J・T）に。',
  },
  'whiteboard-sheet': {
    asin: 'B08X29Y3X5',
    name: 'Teika 貼ってはがせるホワイトボード 60×120cm',
    category: '実用・道具',
    axes: ['N', 'P'],
    intent: ['self'],
    reason: '考えを広げてから整理する人（N・P）に。',
  },
  'modular-desk-mat': {
    asin: 'B07QXX1JVV',
    name: 'YSAGi 大型デスクパッド（80cm・裏面スエード）',
    category: '実用・道具',
    axes: ['P', 'T'],
    intent: ['self'],
    reason: '机の上を自分で組み替えたい人（P・T）に。',
  },
  'cable-organizer': {
    asin: 'B0CM9F4WCJ',
    name: 'ケーブルホルダー・クリップ',
    category: '実用・道具',
    axes: ['J', 'S'],
    intent: ['self'],
    reason: '配線から整えたい人（J・S）に。',
  },
  'power-bank': {
    asin: 'B0F43XLHSM',
    name: 'モバイルバッテリー 20000mAh（16mm薄型）',
    category: '実用・道具',
    axes: ['S', 'T'],
    intent: ['self'],
    reason: '出先で切らしたくない人（S・T）に。',
  },
  'storage-box': {
    asin: 'B0BG8G194G',
    name: 'XUNTAO 収納ボックス 3個セット',
    category: '実用・道具',
    axes: ['J', 'S'],
    intent: ['self'],
    reason: '片付ける場所のほうから決めたい人（J・S）に。',
  },
  'precision-driver-set': {
    asin: 'B096PHZQ2M',
    name: '精密ドライバーセット（差し替え式）',
    category: '実用・道具',
    axes: ['S', 'T'],
    intent: ['self'],
    reason: '自分で開けて直したい人（S・T）に。',
  },
  'handy-vacuum': {
    asin: 'B0BLS7R3F4',
    name: 'ハンディクリーナー（コードレス・380g）',
    category: '実用・道具',
    axes: ['S', 'J'],
    intent: ['self'],
    reason: '気づいたときにすぐ片付けたい人（S・J）に。',
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
