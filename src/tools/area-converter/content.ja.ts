import type { ToolContent } from '@/lib/tools/types';
import type { AreaConverterCopy } from './copy';

export const contentJa: ToolContent<AreaConverterCopy> = {
  title: '坪・㎡の換算',
  seoTitle: '坪 ㎡ 換算 — 坪数と平方メートルの計算',
  seoDescription:
    '坪と平方メートルを相互に換算します。何坪が何㎡か、専有面積がどれくらいかをすぐ確認できます。',
  lead: '坪と㎡をすぐに換算できます。専有率を入れると、契約面積から専有面積も計算します。',
  summary: '坪・平方メートル・平方フィートを相互に換算します。',
  keywords: {
    primaryKeyword: '坪 ㎡ 換算',
    secondaryKeywords: [
      '坪数 計算',
      '1坪 何平米',
      '専有面積 計算',
      '平米 坪 変換',
      'マンション 広さ 目安',
    ],
    searchIntent: '坪と平方メートルを換算し、物件の広さがどれくらいかを把握したい。',
  },
  howItWorks: [
    '1坪は正確に400/121㎡、約3.305785㎡です。',
    '坪 → ㎡は3.305785を掛け、㎡ → 坪は3.305785で割ります。',
    '平方フィートは1 sq ft = 0.09290304㎡で換算します。',
    '専有率を入れると、契約面積 × 専有率で専有面積を計算します。',
    '同じ面積を正方形に見立てたときの一辺の長さも表示します。広さのイメージがつかみやすくなります。',
  ],
  formula: [
    { label: '坪 → ㎡', expression: '㎡ = 坪 × 3.305785' },
    { label: '㎡ → 坪', expression: '坪 = ㎡ ÷ 3.305785' },
    { label: '専有面積', expression: '専有面積 = 契約面積 × 専有率' },
  ],
  example: {
    scenario: '「約25坪」と表示された物件は何㎡でしょうか。',
    steps: [
      '25 × 3.305785 = 約82.6㎡',
      '逆に84㎡なら 84 ÷ 3.305785 = 約25.4坪',
      '専有率75%の場合、契約面積112㎡なら専有84㎡',
    ],
    conclusion:
      '25坪は約82.6㎡です。表示が契約面積か専有面積かで実際の広さが変わるため、必ず確認しましょう。',
  },
  notes: [
    '不動産広告では壁芯面積で表示されることが多く、登記簿の内法面積より少し大きくなります。',
    '坪は計量法上の取引単位ではないため、公的な書類では㎡を使用します。',
    'マンションの専有面積には、バルコニーは通常含まれません。',
    '同じ坪数でも間取りや天井高で体感の広さは大きく変わります。',
  ],
  faq: [
    {
      question: '1坪は何㎡ですか？',
      answer:
        '約3.31㎡です。正確には400/121㎡で、6尺四方（約1.818m × 1.818m）の広さに由来します。',
    },
    {
      question: '壁芯面積と内法面積の違いは？',
      answer:
        '壁芯は壁の中心線で測った面積、内法は壁の内側で測った面積です。広告は壁芯、登記簿は内法が多く、内法のほうが数㎡小さくなります。',
    },
    {
      question: 'バルコニーは面積に含まれますか？',
      answer:
        '専有面積には通常含まれません。バルコニーは共用部分の専用使用部分として扱われるためです。',
    },
    {
      question: '広さをすぐイメージするには？',
      answer:
        '正方形にしたときの一辺の長さを見てください。100㎡なら10m × 10mで、数字だけよりイメージしやすくなります。',
    },
  ],
  relatedGuides: [],
  ui: {
    valueLabel: '面積',
    valueHint: '換算したい値を入力します。',
    valuePlaceholder: '例: 25',
    unitLabel: '入力単位',
    unitPyeong: '坪',
    unitSqm: 'm²',
    unitSqft: 'sq ft',
    ratioLabel: '専有率（任意）',
    ratioHint: '契約面積から専有面積を計算します。',
    sqmLabel: '平方メートル',
    pyeongLabel: '坪',
    sqftLabel: '平方フィート',
    squareSideLabel: '正方形の一辺',
    exclusiveLabel: '専有面積',
    noteMain: '%{sqm}m²は約%{pyeong}坪です。',
    noteSqft: '平方フィートでは約%{sqft} sq ftです。',
    noteSide: '正方形に見立てると一辺が約%{side}mの広さです。',
    noteExclusive: '専有率を適用した専有面積は約%{exclusive}m²です。',
    noteBasis: '1坪 = 400/121 m² ≈ 3.305785 m² を基準に計算しています。',
    issueValue: '面積は0以上で入力してください。',
    issueRatio: '専有率は0〜100の範囲で入力してください。',
  },
};
