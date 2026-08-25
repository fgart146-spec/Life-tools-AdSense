import type { ToolContent } from '@/lib/tools/types';
import type { ComparePriceCopy } from './copy';

export const contentJa: ToolContent<ComparePriceCopy> = {
  title: 'どっちが安い？比較計算',
  seoTitle: 'どっちが安い？ — クーポン・送料まで含めた実質価格で比較',
  seoDescription:
    '容量や割引条件が違う2つの商品を同じ基準で比較します。クーポン・カード割引・送料・ポイントまで含めて単価と差額を計算します。',
  lead: '2つの商品の価格・容量・割引条件を入れると、実質価格と単価を同じ基準で比較します。どれだけ差があるかを文章でも説明します。',
  summary: 'クーポンや送料まで反映して、2商品のどちらが本当に安いかを判定します。',
  keywords: {
    primaryKeyword: 'どっちが安い 計算',
    secondaryKeywords: [
      '価格比較 計算機',
      '実質価格 比較',
      '単価 比較 ツール',
      '送料込み 価格 比較',
      '容量 違う 商品 比較',
    ],
    searchIntent:
      '容量・個数・割引条件が違う2商品のうち、実際にどちらが安く、どれだけ差があるのかを知りたい。',
  },
  howItWorks: [
    '商品ごとに実質価格を計算します。商品金額 → 定率クーポン → 定額クーポン → カード割引 → 送料加算 → ポイント控除の順です。',
    'ポイントは送料を除いた金額を基準に計算し、実質価格から差し引きます。',
    '実質価格を総容量（1個の容量 × 個数）で割って単価を出します。kg・Lはg・mlに換算します。',
    '2つの単価を比べて、安いほうと差の割合を計算します。',
    '差額は「A商品の総量を買うとき」を基準に計算し、月の購入回数を入れると月・年の差額も表示します。',
    '重さ（g・kg）と容量（ml・L）は比較できないため、単位が違う場合は注意メッセージを表示します。',
  ],
  formula: [
    {
      label: '実質価格',
      expression:
        '実質価格 = ((商品金額 × (1 - クーポン率)) - 定額クーポン) × (1 - カード割引率) + 送料 - ポイント',
    },
    { label: '単価', expression: '単価 = 実質価格 ÷ (1個の容量 × 個数)' },
    { label: '差の割合', expression: '差の割合 = (高いほうの単価 - 安いほうの単価) ÷ 高いほうの単価 × 100' },
    {
      label: '差額',
      expression: '1回の差額 = 単価差 × 基準量 / 年間 = 1回の差額 × 月の購入回数 × 12',
    },
  ],
  example: {
    scenario:
      'A：洗剤1.2Lが1,290円、10%クーポンあり、送料300円。B：2Lが1,990円、送料無料、ポイント5%。',
    steps: [
      'A：1,290 × 0.9 = 1,161円 + 送料300円 = 1,461円 → 1,200mlで100mlあたり約122円',
      'B：1,990 - ポイント約100円 = 1,890円 → 2,000mlで100mlあたり約95円',
      '差は100mlあたり約27円、割合にすると約22%',
    ],
    conclusion:
      'Bが100mlあたり約22%安い計算です。Aと同じ1,200mlを買うと1回あたり約325円の差、毎月1回買えば年間で約3,900円の差になります。',
  },
  notes: [
    '送料無料の条件を満たすために不要な商品を足すと、支出はむしろ増えます。実際に買う分だけを入力してください。',
    'ポイントは次回以降しか使えないことが多いです。確実に使わないなら、ポイント率を空欄にすると保守的に比較できます。',
    '重さ（g）と容量（ml）は直接比較できません。表示単位が違う場合は同じ種類に揃えてください。',
    '賞味期限や保管場所を超える大容量は、単価が安くても結果的に損になることがあります。',
    'カード割引には上限額が設定されていることが多く、上限を超える割引率をそのまま入れると実際より安く計算されます。',
  ],
  faq: [
    {
      question: 'クーポンとカード割引はどの順番で計算されますか？',
      answer:
        'この計算では、定率クーポン → 定額クーポン → カード割引の順に適用します。多くの通販サイトがクーポン適用後の金額にカード割引をかけるためです。サイトによって順序が異なることがあるので、決済直前の金額と見比べてください。',
    },
    {
      question: 'ポイントは割引として数えるべきですか？',
      answer:
        '判断は使う人次第です。次の買い物で確実に使うなら割引として扱って構いません。失効の可能性があるなら空欄にしておくほうが保守的です。',
    },
    {
      question: 'なぜ送料は割引の対象外なのですか？',
      answer:
        '多くのクーポンやカード割引は商品代金にのみ適用され、送料には適用されないためです。そのため送料は割引計算の後に加算します。',
    },
    {
      question: '個数単位の商品も比較できますか？',
      answer:
        '可能です。単位を「個」にすると1個あたりの価格で比較します。ただし1個の大きさが違う場合は、1個あたりの価格計算の小単位機能を使うほうが正確です。',
    },
    {
      question: '差額の基準量とは何ですか？',
      answer:
        'A商品の総量です。たとえばAが600gなら「600gを買うときの差額」を表示します。必要量が違う場合は、Aの容量・個数を必要量に合わせて入力してください。',
    },
  ],
  relatedGuides: ['unit-price-basics', 'coupon-and-card-discount', 'bulk-not-always-cheaper'],
  ui: {
    productA: '商品A',
    productB: '商品B',
    priceLabel: '価格',
    priceUnit: '円',
    pricePlaceholder: '例: 1,290',
    amountLabel: '1個の容量',
    amountPlaceholder: '例: 1.2',
    unitLabel: '単位',
    quantityLabel: '個数',
    quantityUnit: '個',
    unitOptionG: 'グラム(g)',
    unitOptionKg: 'キログラム(kg)',
    unitOptionMl: 'ミリリットル(ml)',
    unitOptionL: 'リットル(L)',
    unitOptionEa: '個',
    advancedToggle: 'クーポン・カード割引・送料を入力',
    couponPercentLabel: 'クーポン割引率',
    couponAmountLabel: 'クーポン定額',
    cardPercentLabel: 'カード割引率',
    shippingLabel: '送料',
    pointPercentLabel: 'ポイント還元率',
    repeatLabel: '月の購入回数',
    repeatUnit: '回',
    repeatHint: '毎月繰り返し買う場合の回数を入力します。',
    verdictLabel: '比較結果',
    winnerA: '商品Aが安い',
    winnerB: '商品Bが安い',
    tie: 'どちらも同じ',
    perUnitLabel: '単価',
    finalPriceLabel: '実質価格',
    perItemLabel: '1個あたり',
    totalAmountLabel: '総容量',
    differenceLabel: '単価の差',
    savingTitle: '節約できる金額',
    savingPerPurchase: '1回あたり',
    savingMonthly: '月あたり',
    savingYearly: '年間',
    noteWinner: '%{winner}です。単価で約%{percent}の差があります。',
    noteSaving: '基準量%{amount}を買う場合、約%{saving}の差になります。',
    noteRepeat: '同じ買い物を繰り返すと、月に約%{monthly}、年間で約%{yearly}の差です。',
    noteTie: '2つの単価は同じです。配送日数や保管、好みで選んでください。',
    noteEffective: '実質価格はクーポン・カード割引・送料・ポイントをすべて反映した金額です。',
    issueAPrice: '商品Aの価格は0以上で入力してください。',
    issueAAmount: '商品Aの容量は0より大きい値を入力してください。',
    issueAQuantity: '商品Aの個数は1以上で入力してください。',
    issueBPrice: '商品Bの価格は0以上で入力してください。',
    issueBAmount: '商品Bの容量は0より大きい値を入力してください。',
    issueBQuantity: '商品Bの個数は1以上で入力してください。',
    issueUnitMismatch:
      '重さ（g・kg）と容量（ml・L）は比較できません。同じ種類の単位に揃えてください。',
  },
};
