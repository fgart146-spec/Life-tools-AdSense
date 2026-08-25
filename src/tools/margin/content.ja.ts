import type { ToolContent } from '@/lib/tools/types';
import type { MarginCopy } from './copy';

export const contentJa: ToolContent<MarginCopy> = {
  title: '利益率（マージン）計算',
  seoTitle: '利益率の計算 — 手数料・送料を引いていくら残る？',
  seoDescription:
    '販売価格と原価に、プラットフォーム手数料・送料・梱包費まで入れて、実際に残る利益と利益率を計算します。',
  lead: '販売価格と原価だけでも計算できます。手数料や送料まで入れると、実際に手元に残る金額が分かります。',
  summary: '手数料や送料を含めた実質利益と利益率を計算します。',
  keywords: {
    primaryKeyword: '利益率 計算',
    secondaryKeywords: [
      '粗利 計算',
      '販売手数料 利益',
      '原価率 計算',
      'ネットショップ 利益計算',
      '損益分岐 価格',
    ],
    searchIntent:
      '商品を売ったときに手数料や送料を引いて実際いくら残るのか、利益率は何%かを知りたい。',
  },
  howItWorks: [
    '売上 = 販売価格 × 数量で計算します。',
    '手数料は売上を基準に計算します（プラットフォームや決済の手数料は通常、決済金額基準です）。',
    '総コスト =（原価 + 送料 + その他費用）× 数量 + 手数料です。',
    '利益 = 売上 - 総コスト、利益率 = 利益 ÷ 売上 で計算します。',
    '原価に対する利益（マークアップ）は別に表示します。利益率と混同しやすい指標です。',
    '損益分岐価格は利益が0になる価格で、（原価 + 送料 + その他）÷（1 - 手数料率）です。',
  ],
  formula: [
    { label: '売上', expression: '売上 = 販売価格 × 数量' },
    { label: '手数料', expression: '手数料 = 売上 × 手数料率' },
    { label: '利益', expression: '利益 = 売上 -（原価 + 送料 + その他）× 数量 - 手数料' },
    { label: '利益率', expression: '利益率(%) = 利益 ÷ 売上 × 100' },
    { label: '損益分岐価格', expression: '（原価 + 送料 + その他）÷（1 - 手数料率）' },
  ],
  example: {
    scenario: '販売価格2,000円、原価1,000円、手数料10%、送料300円、梱包費50円の場合です。',
    steps: [
      '売上2,000円、手数料200円',
      'コスト：1,000 + 300 + 50 = 1,350円 + 手数料200円 = 1,550円',
      '利益：2,000 - 1,550 = 450円',
    ],
    conclusion:
      '1個売ると450円が残り、利益率は22.5%です。損益分岐価格は1,500円なので、それを下回ると赤字になります。',
  },
  notes: [
    '消費税は含まれていません。課税事業者の場合は税抜価格で入力すると実態に近くなります。',
    '返品時の送料、広告費、クーポン負担は別途発生します。平均的な負担額をその他費用に入れてください。',
    'プラットフォーム手数料はカテゴリごとに異なり、決済手数料が別に加算される場合もあります。',
    '利益率（売上基準）とマークアップ（原価基準）は別の数字です。取引先と話すときは基準を揃えてください。',
  ],
  faq: [
    {
      question: '利益率とマークアップの違いは？',
      answer:
        '利益率は利益 ÷ 売上、マークアップは利益 ÷ 原価です。原価1,000円を2,000円で売ると利益率は50%ですが、マークアップは100%になります。同じ取引でも数字が変わります。',
    },
    {
      question: '消費税はどう扱いますか？',
      answer:
        '課税事業者なら販売価格・原価とも税抜（本体価格）で入力するのが正確です。税込と税抜を混ぜると利益率が実際より高く出ます。',
    },
    {
      question: '広告費も入れられますか？',
      answer:
        '1件あたりの広告費をその他費用に入れてください。広告そのものの効率を見たい場合はROAS計算をご利用ください。',
    },
    {
      question: '損益分岐価格とは何ですか？',
      answer:
        '利益がちょうど0になる価格です。この価格を下回ると売るほど赤字になります。セールを企画するときの下限として使えます。',
    },
  ],
  relatedGuides: ['margin-basics', 'pricing-guide'],
  ui: {
    priceLabel: '販売価格',
    priceUnit: '円',
    priceHint: 'お客様が支払う金額',
    pricePlaceholder: '例: 2,000',
    costLabel: '仕入原価',
    costHint: '商品1個の仕入価格',
    costPlaceholder: '例: 1,000',
    feeLabel: '手数料率',
    feeHint: 'プラットフォーム・決済手数料の合計',
    shippingLabel: '負担する送料',
    shippingHint: '1件あたり',
    otherLabel: 'その他費用',
    otherHint: '梱包費・広告費など',
    quantityLabel: '販売数量',
    quantityUnit: '個',
    profitLabel: '利益',
    marginRateLabel: '利益率',
    costRateLabel: '原価率',
    markupRateLabel: 'マークアップ（原価比）',
    revenueLabel: '売上',
    feeAmountLabel: '手数料',
    totalCostLabel: '総コスト',
    profitPerUnitLabel: '1個あたり利益',
    breakEvenPriceLabel: '損益分岐価格',
    noteProfit: '利益は%{profit}、利益率は%{rate}です。',
    notePerUnit: '1個あたりでは%{perUnit}が残ります。',
    noteBreakEven: '%{breakEven}を下回ると赤字になります。',
    noteLoss: 'この条件では赤字です。販売価格と原価を確認してください。',
    noteVat: '消費税や返品費用は含まれていません。実際の利益はこれより低くなる場合があります。',
    issuePrice: '販売価格は0以上で入力してください。',
    issueCost: '原価は0以上で入力してください。',
    issueFee: '手数料率は0〜100の範囲で入力してください。',
    issueQuantity: '数量は1以上で入力してください。',
    issueAmount: '金額は0以上で入力してください。',
  },
};
