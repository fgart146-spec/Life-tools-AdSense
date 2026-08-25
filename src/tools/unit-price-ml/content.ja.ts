import type { ToolContent } from '@/lib/tools/types';
import type { UnitPriceToolCopy } from '@/lib/tools/shared/unit-price-copy';

export const contentJa: ToolContent<UnitPriceToolCopy> = {
  title: '100mlあたりの価格計算',
  seoTitle: '100mlあたりの価格計算 — 詰め替えと本体を比べる',
  seoDescription:
    '飲料・洗剤・シャンプーなど、容量が違う商品の100mlあたり・1Lあたりの価格を計算します。詰め替えが本当に安いか確認できます。',
  lead: '価格と容量を入力すると、100mlあたり・1Lあたりの価格が出ます。容量がバラバラの液体商品を同じ基準で比較できます。',
  summary: '価格と容量から100mlあたり・1Lあたりの単価を計算します。',
  keywords: {
    primaryKeyword: '100mlあたり 価格 計算',
    secondaryKeywords: [
      'ml単価 計算',
      '1Lあたり 価格',
      '洗剤 詰め替え 比較',
      '容量 単価 比較',
      'リットル単価',
    ],
    searchIntent: '容量の違う液体商品を100mlまたは1L基準に直して、どちらが安いか比べたい。',
  },
  howItWorks: [
    '価格を総容量で割って1mlあたりの価格を出し、100を掛けて100mlあたりの価格を計算します。',
    '単位をLにすると、1L = 1,000mlとして換算します。',
    '個数を2以上にすると総容量（1本の容量 × 本数）で計算します。6本入りのケースもそのまま入力できます。',
    '詰め替えと本体のように包装が違う商品も、100ml基準に揃えると差がはっきり見えます。',
    '入力した値はブラウザ内だけで計算され、サーバーへ送信されません。',
  ],
  formula: [
    {
      label: '総容量',
      expression: '総容量(ml) = 1本の容量 × 本数（L入力の場合は × 1,000）',
    },
    {
      label: '100mlあたりの価格',
      expression: '100mlあたりの価格 = 価格 ÷ 総容量(ml) × 100',
    },
    {
      label: '1Lあたりの価格',
      expression: '1Lあたりの価格 = 100mlあたりの価格 × 10',
    },
  ],
  example: {
    scenario: '洗濯洗剤の本体1.5Lが698円、詰め替え3Lが1,180円で並んでいます。',
    steps: [
      '本体：698 ÷ 1,500ml = 1mlあたり約0.47円 → 100mlあたり約47円',
      '詰め替え：1,180 ÷ 3,000ml = 1mlあたり約0.39円 → 100mlあたり約39円',
      '差は100mlあたり約8円、割合にすると約17%',
    ],
    conclusion:
      '詰め替えが100mlあたり約17%安い計算です。1Lあたりでは約470円と約393円の差になります。',
  },
  notes: [
    '濃縮タイプは同じ100mlでも使用回数が違います。1回の使用量から「何回使えるか」を出し、1回あたりのコストで比べると正確です。',
    '希釈して飲むシロップなどは、単純な容量比較では実態と合いません。',
    'ラベルの表示がmlかgかを確認してください。gの場合は100gあたりの価格計算を使うほうが適切です。',
    '単価が安くても、保管場所や使い切るまでの期間を考えないと得にならないことがあります。',
  ],
  faq: [
    {
      question: '詰め替えは必ず本体より安いですか？',
      answer:
        '多くの場合は安いですが、本体がセール中だと100ml単価で逆転することがあります。だからこそ表示価格ではなく100mlあたりで確認する価値があります。',
    },
    {
      question: '濃縮タイプと通常タイプはどう比べますか？',
      answer:
        '100ml単価だけでは足りません。濃縮は1回の使用量が半分程度のことが多いためです。容量 ÷ 1回使用量で使用回数を出し、価格 ÷ 使用回数で1回あたりのコストを比べてください。',
    },
    {
      question: '6本入りのケースはどう入力しますか？',
      answer:
        '価格はケース全体の価格、容量は1本の容量、本数は6を入力します。総容量を基準に100ml単価が計算されます。',
    },
    {
      question: '送料は含めますか？',
      answer:
        'ネット通販では送料を含めた金額で計算してください。重い液体は送料の影響が大きく、単価の順位が入れ替わることがあります。',
    },
  ],
  relatedGuides: ['unit-price-basics', 'bulk-not-always-cheaper'],
  ui: {
    priceLabel: '価格',
    priceUnit: '円',
    priceHint: '割引や送料まで反映した実際の支払額を入れると正確です。',
    pricePlaceholder: '例: 698',
    amountLabel: '1本の容量',
    amountHint: 'ラベル記載の容量をそのまま入力します。',
    amountPlaceholder: '例: 1.5',
    unitLabel: '容量の単位',
    unitSmall: 'ミリリットル(ml)',
    unitLarge: 'リットル(L)',
    quantityLabel: '本数',
    quantityUnit: '本',
    quantityHint: 'まとめ買いの場合は合計本数を入力します。',
    primaryLabel: '100mlあたりの価格',
    secondaryLabel: '1Lあたりの価格',
    perItemLabel: '1本あたりの価格',
    totalLabel: '総容量',
    noteMain: 'この商品は100mlあたり%{primary}です。',
    noteSecondary: '1Lに換算すると%{secondary}です。',
    noteQuantity: '%{quantity}本入りなので、1本あたり%{perItem}です。',
    noteCompare: 'ほかの商品と比べるときは、100mlあたりの価格どうしで見比べてください。',
    issuePrice: '価格は0以上で入力してください。',
    issueAmount: '容量は0より大きい値を入力してください。',
    issueQuantity: '本数は1以上で入力してください。',
  },
};
