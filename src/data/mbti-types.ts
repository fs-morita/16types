/**
 * 16タイプのマスタデータ。
 *
 * 記事の frontmatter `type` はここに存在するコードのみ許可する
 * （src/content.config.ts の zod スキーマで検証し、不正値はビルドを失敗させる）。
 *
 * 注意: 16Personalities のタイプ説明文は著作物のため転載しない。
 * ここに持つのは呼称と指標だけで、解説は必ず自分の言葉で書く。
 */

export type EI = 'E' | 'I';
export type NS = 'N' | 'S';
export type TF = 'T' | 'F';
export type JP = 'J' | 'P';

/** 8つの指標。商品カタログ側もこれを使い、綴り違いを型で弾く。 */
export type Axis = EI | NS | TF | JP;

export const ALL_AXES: Axis[] = ['E', 'I', 'N', 'S', 'T', 'F', 'J', 'P'];

export type GroupKey = 'analyst' | 'diplomat' | 'sentinel' | 'explorer';

export interface MbtiType {
  /** 4文字コード（大文字）。URL では小文字にする。 */
  code: string;
  /** 日本語の呼称。 */
  name: string;
  /** 英語の呼称。 */
  nameEn: string;
  group: GroupKey;
  axes: { ei: EI; ns: NS; tf: TF; jp: JP };
  /**
   * 日本での割合(%)。出典を確認できたタイプのみ設定する。
   * 未確認のタイプは undefined のままにし、憶測で埋めない。
   * 出典: https://reashu.com/16personalities-propotion/
   */
  ratioJp?: number;
}

/**
 * グループの定義。
 *
 * 配色は和色ベースの独自パレット。
 * 16Personalities の配色（紫/緑/青/黄）とは意図的に変えている。
 * 色そのものに権利は及ばないが、配色ごと踏襲すると混同を招くため。
 */
export const GROUPS: Record<
  GroupKey,
  { name: string; nameEn: string; axes: string; hue: string; hueDark: string }
> = {
  analyst: {
    name: '分析家',
    nameEn: 'Analysts',
    axes: 'N + T',
    hue: '#3d4f7c', // 鉄紺
    hueDark: '#8fa3d4',
  },
  diplomat: {
    name: '外交官',
    nameEn: 'Diplomats',
    axes: 'N + F',
    hue: '#8f5464', // 蘇芳
    hueDark: '#d9909f',
  },
  sentinel: {
    name: '番人',
    nameEn: 'Sentinels',
    axes: 'S + J',
    hue: '#4a6f57', // 松葉
    hueDark: '#8fc0a0',
  },
  explorer: {
    name: '探検家',
    nameEn: 'Explorers',
    axes: 'S + P',
    hue: '#a8763e', // 黄土
    hueDark: '#dcb079',
  },
};

export const MBTI_TYPES: MbtiType[] = [
  // 分析家 (NT)
  { code: 'INTJ', name: '建築家', nameEn: 'Architect', group: 'analyst', axes: { ei: 'I', ns: 'N', tf: 'T', jp: 'J' } },
  { code: 'INTP', name: '論理学者', nameEn: 'Logician', group: 'analyst', axes: { ei: 'I', ns: 'N', tf: 'T', jp: 'P' } },
  { code: 'ENTJ', name: '指揮官', nameEn: 'Commander', group: 'analyst', axes: { ei: 'E', ns: 'N', tf: 'T', jp: 'J' }, ratioJp: 2.57 },
  { code: 'ENTP', name: '討論者', nameEn: 'Debater', group: 'analyst', axes: { ei: 'E', ns: 'N', tf: 'T', jp: 'P' } },

  // 外交官 (NF)
  { code: 'INFJ', name: '提唱者', nameEn: 'Advocate', group: 'diplomat', axes: { ei: 'I', ns: 'N', tf: 'F', jp: 'J' } },
  { code: 'INFP', name: '仲介者', nameEn: 'Mediator', group: 'diplomat', axes: { ei: 'I', ns: 'N', tf: 'F', jp: 'P' } },
  { code: 'ENFJ', name: '主人公', nameEn: 'Protagonist', group: 'diplomat', axes: { ei: 'E', ns: 'N', tf: 'F', jp: 'J' } },
  { code: 'ENFP', name: '広報運動家', nameEn: 'Campaigner', group: 'diplomat', axes: { ei: 'E', ns: 'N', tf: 'F', jp: 'P' }, ratioJp: 16.44 },

  // 番人 (SJ)
  { code: 'ISTJ', name: '管理者', nameEn: 'Logistician', group: 'sentinel', axes: { ei: 'I', ns: 'S', tf: 'T', jp: 'J' } },
  { code: 'ISFJ', name: '擁護者', nameEn: 'Defender', group: 'sentinel', axes: { ei: 'I', ns: 'S', tf: 'F', jp: 'J' } },
  { code: 'ESTJ', name: '幹部', nameEn: 'Executive', group: 'sentinel', axes: { ei: 'E', ns: 'S', tf: 'T', jp: 'J' } },
  { code: 'ESFJ', name: '領事', nameEn: 'Consul', group: 'sentinel', axes: { ei: 'E', ns: 'S', tf: 'F', jp: 'J' } },

  // 探検家 (SP)
  { code: 'ISTP', name: '巨匠', nameEn: 'Virtuoso', group: 'explorer', axes: { ei: 'I', ns: 'S', tf: 'T', jp: 'P' } },
  { code: 'ISFP', name: '冒険家', nameEn: 'Adventurer', group: 'explorer', axes: { ei: 'I', ns: 'S', tf: 'F', jp: 'P' } },
  { code: 'ESTP', name: '起業家', nameEn: 'Entrepreneur', group: 'explorer', axes: { ei: 'E', ns: 'S', tf: 'T', jp: 'P' } },
  { code: 'ESFP', name: 'エンターテイナー', nameEn: 'Entertainer', group: 'explorer', axes: { ei: 'E', ns: 'S', tf: 'F', jp: 'P' } },
];

export const TYPE_CODES = MBTI_TYPES.map((t) => t.code);

export function getType(code: string): MbtiType | undefined {
  return MBTI_TYPES.find((t) => t.code === code.toUpperCase());
}

/** 表示用の "INTJ（建築家）" を返す。 */
export function typeLabel(type: MbtiType): string {
  return `${type.code}（${type.name}）`;
}

/**
 * 指標ごとの商品選定の指針。
 *
 * 「INTJだからこれ」という恣意的な紐づけを避けるための土台。
 * 記事では必ず「一人の時間を大切にする人だから、これ」のように
 * 指標に翻訳した理由を書く。
 */
export const AXIS_GUIDANCE: Record<Axis, { label: string; gift: string; self: string }> = {
  E: { label: '外向', gift: '人と共有できるもの', self: '人とつながる場を作るもの' },
  I: { label: '内向', gift: '人前で使わないもの', self: '一人で没入できる環境を作るもの' },
  N: { label: '直観', gift: '世界観・物語のあるもの', self: '発想が広がるもの' },
  S: { label: '感覚', gift: '実用性が明確なもの', self: '手触り・質感が良いもの' },
  T: { label: '思考', gift: '性能や仕組みで選べるもの', self: '効率が上がるもの' },
  F: { label: '感情', gift: '贈り手の意図が伝わるもの', self: '気分が上がるもの' },
  J: { label: '判断', gift: '用途がはっきりしているもの', self: '計画や習慣を支えるもの' },
  P: { label: '知覚', gift: '使い方が固定されないもの', self: '遊びの余地があるもの' },
};

/** そのタイプの4指標を配列で返す（記事内の根拠表示に使う）。 */
export function axesOf(type: MbtiType): Axis[] {
  return [type.axes.ei, type.axes.ns, type.axes.tf, type.axes.jp];
}
