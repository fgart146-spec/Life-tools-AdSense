import type { ToolContent } from '@/lib/tools/types';
import type { BreakEvenCopy } from './copy';

export const contentJa: ToolContent<BreakEvenCopy> = {
  title: '損益分岐点の計算',
  seoTitle: '損益分岐点の計算 — 何個売れば黒字になる？',
  seoDescription:
    '固定費と販売価格・変動費を入れると、損益分岐点の販売数量と売上高を計算します。1日あたり何個必要かも分かります。',
  lead: '月の固定費と、商品1個の販売価格・変動費を入れるだけで、何個売れば黒字になるかが分かります。',
  summary: '固定費と限界利益から損益分岐点の数量と売上を計算します。',
  keywords: {
    primaryKeyword: '損益分岐点 計算',
    secondaryKeywords: [
      '損益分岐点 売上',
      '限界利益 計算',
      '何個売れば黒字',
      '固定費 変動費 計算',
      'BEP 計算',
    ],
    searchIntent:
      '固定費を賄うために月何個売る必要があるのか、必要な売上はいくらかを知りたい。',
  },
  howItWorks: [
    '限界利益 = 販売価格 - 変動費。1個売るごとに固定費の回収に回る金額です。',
    '損益分岐点の数量 = 固定費 ÷ 限界利益で求めます。',
    '損益分岐点の売上高 = 数量 × 販売価格です。',
    '限界利益率 = 限界利益 ÷ 販売価格。売上100円のうち何円が固定費回収に回るかを表します。',
    '販売価格が変動費以下だと、いくら売っても損益分岐点には届きません。',
  ],
  formula: [
    { label: '限界利益', expression: '限界利益 = 販売価格 - 変動費' },
    { label: '損益分岐点の数量', expression: '数量 = 固定費 ÷ 限界利益' },
    { label: '損益分岐点の売上', expression: '売上 = 数量 × 販売価格' },
    { label: '限界利益率', expression: '限界利益率(%) = 限界利益 ÷ 販売価格 × 100' },
  ],
  example: {
    scenario: '月の固定費30万円、販売価格1,500円、変動費900円の場合です。',
    steps: [
      '限界利益：1,500 - 900 = 600円',
      '損益分岐点の数量：300,000 ÷ 600 = 500個',
      '損益分岐点の売上：500 × 1,500 = 75万円',
    ],
    conclusion:
      '月に500個（1日平均約17個）売れば収支が合います。それを超えると1個あたり600円がそのまま利益になります。',
  },
  notes: [
    '固定費には家賃、正社員の人件費、保険料、減価償却など売上に関係なく発生する費用を入れます。',
    '変動費には原価、梱包費、決済手数料、送料など販売数に比例する費用を入れます。',
    'アルバイト人件費のように売上で調整する費用は、どちらに入れるか基準を決めておきましょう。',
    '複数商品を扱う場合は、平均販売価格と平均変動費で概算を出せます。',
    '税金（消費税・法人税など）は含まれていません。',
  ],
  faq: [
    {
      question: '固定費と変動費はどう分けますか？',
      answer:
        '1個も売れなくても発生するなら固定費、1個売るごとに増えるなら変動費です。家賃や正社員給与は固定費、材料費・手数料・梱包費は変動費です。',
    },
    {
      question: 'なぜ限界利益が重要なのですか？',
      answer:
        '1個売るごとに固定費を回収していく金額だからです。固定費を回収し終えた後は、限界利益がそのまま利益になります。',
    },
    {
      question: '複数商品の場合は？',
      answer:
        '売上構成比の大きい商品を中心に加重平均を取って入力すると、おおよその損益分岐点が分かります。',
    },
    {
      question: '損益分岐点を下げるには？',
      answer:
        '固定費を下げるか、限界利益を上げる（価格を上げる・変動費を下げる）必要があります。目標販売価格の計算や利益率の計算と併せて検討してください。',
    },
  ],
  relatedGuides: ['break-even-guide', 'margin-basics'],
  ui: {
    fixedCostLabel: '月の固定費',
    fixedCostUnit: '円',
    fixedCostHint: '家賃・人件費・保険など',
    fixedCostPlaceholder: '例: 300,000',
    priceLabel: '1個の販売価格',
    priceHint: 'お客様が支払う金額',
    pricePlaceholder: '例: 1,500',
    variableCostLabel: '1個の変動費',
    variableCostHint: '原価・手数料・梱包費など',
    variableCostPlaceholder: '例: 900',
    unitsLabel: '損益分岐点の数量',
    unitsUnit: '個',
    revenueLabel: '損益分岐点の売上',
    contributionLabel: '1個あたり限界利益',
    contributionRateLabel: '限界利益率',
    perDayLabel: '1日あたり必要販売数',
    noteMain: '月に%{units}個（売上%{revenue}）売れば収支が合います。',
    noteContribution: '1個売るごとに%{contribution}（限界利益率%{rate}）が固定費の回収に回ります。',
    notePerDay: '30日換算で1日あたり約%{perDay}個です。',
    noteFixed: '損益分岐点を超えると、それ以降の限界利益はそのまま利益になります。',
    noteBasis: '税金は含まれていない計算です。',
    issueFixed: '固定費は0以上で入力してください。',
    issuePrice: '販売価格は0より大きい値を入力してください。',
    issueVariable: '変動費は0以上で入力してください。',
    issueMargin: '販売価格が変動費より大きくないと損益分岐点を計算できません。',
  },
};
