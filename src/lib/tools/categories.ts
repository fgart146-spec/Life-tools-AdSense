import type { Locale } from '@/lib/i18n/config';

/** 초기 공개 카테고리 6개. 추가 시 여기와 사전(카테고리 라벨)을 함께 수정한다. */
export const categoryIds = [
  'shopping',
  'utilities',
  'food',
  'work',
  'business',
  'home',
] as const;

export type CategoryId = (typeof categoryIds)[number];

export interface CategoryDefinition {
  id: CategoryId;
  /** URL: /[locale]/category/[slug] */
  slug: string;
  emoji: string;
  /** 메인/목록에서의 노출 순서 */
  order: number;
  label: Record<Locale, string>;
  /** 카테고리 허브 상단 리드 문장 (검색 스니펫으로도 쓰인다) */
  description: Record<Locale, string>;
  /**
   * 허브 본문 도입 문단 (2~3개). 카테고리 페이지에서만 렌더된다.
   * 링크 목록만 있는 허브는 검색엔진이 얇은 페이지로 보므로, 무엇을 먼저 계산할지·흔한 실수·어느 도구를 쓸지를 적는다.
   * 실제로 존재하는 도구만 언급한다 (en/ja는 해당 로케일에 있는 도구만).
   */
  intro: Record<Locale, readonly string[]>;
}

export const categories: Record<CategoryId, CategoryDefinition> = {
  shopping: {
    id: 'shopping',
    slug: 'shopping',
    emoji: '🛒',
    order: 1,
    label: {
      ko: '장보기·쇼핑',
      en: 'Shopping & unit price',
      ja: '買い物・単価',
    },
    description: {
      ko: '용량과 할인 조건이 다른 상품 중에서 실제로 어느 쪽이 싼지 계산합니다. 단가, 쿠폰, 1+1, 묶음상품을 같은 기준으로 비교하세요.',
      en: 'Work out which product is actually cheaper once size, coupons and multi-buy offers are taken into account.',
      ja: '容量や割引条件が違う商品を、同じ基準に揃えて比較します。単価・クーポン・まとめ買いをまとめて計算できます。',
    },
    intro: {
      ko: [
        '마트 가격표는 포장 단위가 제각각이라 표시가만 보면 어느 쪽이 싼지 알 수 없습니다. 가장 먼저 할 일은 100g당·100ml당·개당 가격으로 단위를 맞추는 것입니다. 단위만 맞추면 300g 팩과 1.2kg 팩, 500ml 병과 1.5L 병이 한 줄에서 비교됩니다.',
        '그다음이 할인입니다. 1+1은 50% 할인이 아니라 두 개를 사야 성립하는 조건이고 2+1은 33%입니다. 카드 할인과 쿠폰은 적용 순서에 따라 결제액이 달라지므로, 실구매가 계산기로 실제 내는 돈을 먼저 구한 뒤 그 금액으로 단가를 비교해야 합니다.',
        '흔한 실수는 단가가 싸다는 이유로 대용량을 고르는 것입니다. 유통기한 안에 다 못 쓰면 버리는 만큼 비싸집니다. 대용량 vs 소용량 계산기로 단가 차이를 확인하되, 다 쓸 수 있는지를 함께 판단하세요.',
      ],
      en: [
        'Shelf prices are not comparable when pack sizes differ. Start by converting everything to the same unit — price per 100 g, per 100 ml or per item — and a 300 g pack and a 1.2 kg bag line up on one scale.',
        'Then apply the offer. Buy one get one free is not 50% off unless you needed two, and a coupon on top of a percentage discount changes the final price depending on the order it is applied. Use the discount and coupon calculator to find what you actually pay, then compare unit prices on that figure.',
        'The most common mistake is choosing the bigger pack because the unit price is lower. If part of it is thrown away, the saving disappears. Compare on what you will use, not on what is printed on the label.',
      ],
      ja: [
        '店頭の表示価格は容量がバラバラなので、そのままではどちらが安いか分かりません。まず100gあたり・100mlあたり・1個あたりの単価に揃えます。単位を揃えれば、300gのパックと1.2kgの袋を同じ物差しで比べられます。',
        '次に割引を反映します。「1個買うと1個無料」は2個必要な場合だけ50%引きと同じで、クーポンと割引率の併用は適用順で最終価格が変わります。割引・クーポン計算で実際に払う金額を出してから、その金額で単価を比較してください。',
        'よくある失敗は、単価が安いという理由で大容量を選ぶことです。使い切れずに捨てれば、その分だけ割高になります。ラベルの量ではなく、実際に使う量で比べましょう。',
      ],
    },
  },
  utilities: {
    id: 'utilities',
    slug: 'utilities',
    emoji: '⚡',
    order: 2,
    label: {
      ko: '생활비·공과금',
      en: 'Household bills',
      ja: '光熱費・生活費',
    },
    description: {
      ko: '전기요금, 냉난방비, 한 달 생활비처럼 매달 반복되는 지출을 미리 계산해 예산을 잡습니다.',
      en: 'Estimate recurring household costs such as electricity, heating and monthly living expenses.',
      ja: '電気代や冷暖房費、毎月の生活費など、繰り返し発生する支出を事前に見積もります。',
    },
    intro: {
      ko: [
        '공과금은 고지서를 받고 아는 것보다 쓰기 전에 예상하는 쪽이 훨씬 싸게 끝납니다. 전기요금은 누진 구간 때문에 사용량이 조금만 넘어도 단가가 뛰므로, 에어컨 전기료·가전제품 전기료 계산기로 이번 달 예상 사용량을 먼저 잡아보세요.',
        '난방비는 연료 종류와 면적, 사용 시간에 따라 편차가 큽니다. 난방비 예상 계산기에 조건을 바꿔 넣어 보면 월 비용이 얼마나 달라지는지 바로 비교됩니다.',
        '생활비 전체를 보려면 월 장보기 예산과 가족 생활비 계산기를 함께 쓰세요. 항목별로 나눠 넣으면 어디서 새는지 보이고, 줄일 수 있는 항목과 고정으로 봐야 하는 항목이 구분됩니다. 요율은 최신 기준으로 유지하며 기준일을 각 계산기에 표시합니다.',
      ],
      en: [
        'Recurring bills are cheapest when you estimate them before the meter runs, not after the invoice arrives. These calculators cover electricity by appliance, heating by fuel and floor area, and a monthly household budget split by category.',
        'Start with the biggest variable cost — usually cooling or heating — then build the full monthly picture around it. Rates are kept current and the reference date is shown on each calculator.',
      ],
      ja: [
        '光熱費は請求書で知るより、使う前に見積もるほうが結果的に安く済みます。家電ごとの電気代、燃料と面積から見る暖房費、項目別の月間生活費をまとめています。',
        'まず変動の大きい冷暖房費から見積もり、それを軸に月全体の支出を組み立ててください。料金単価は最新の基準に更新し、基準日を各計算機に表示しています。',
      ],
    },
  },
  food: {
    id: 'food',
    slug: 'food',
    emoji: '🍚',
    order: 3,
    label: {
      ko: '가족·음식',
      en: 'Family & food',
      ja: '家族・食事',
    },
    description: {
      ko: '인원수에 맞는 고기·쌀·김장 재료 양을 계산합니다. 모자라지도 남지도 않게 준비하세요.',
      en: 'Portion planning for gatherings: how much to buy for the number of people you are feeding.',
      ja: '人数に合わせた食材の量を計算します。足りない・余りすぎるを防ぎます。',
    },
    intro: {
      ko: [
        '모임 음식은 모자라면 난감하고 남으면 버립니다. 기준은 인원수와 한 사람 몫입니다. 고기 인원수 계산기와 쌀·밥 인원수 계산기는 인원수를 넣으면 1인 기준량을 바탕으로 총 구매량을 냅니다.',
        '명절이나 가족 모임처럼 여러 음식이 한 상에 오르면 품목별로 나눠 계산해야 합니다. 명절·가족모임 음식량 계산기는 품목별 준비량을 한 번에 보여주고, 캠핑 음식량 계산기는 일정과 인원에 맞춰 잡아줍니다.',
        '김장은 배추 수량이 양념 양을 결정합니다. 김장 배추 수량 계산기로 가족 수에 맞는 포기 수를 먼저 정한 뒤, 김장 양념 계산기에 그 수량을 넣으면 고춧가루·젓갈·마늘 양이 비율로 나옵니다. 흔한 실수는 감으로 잡고 전부 넉넉히 사는 것이라, 품목별로 계산하고 마지막에 한 번만 올림하세요.',
      ],
      en: [
        'Portion planning starts with head count and a per-person serving that depends on who is eating and whether the dish is the main course or a side. These calculators turn that into a shopping quantity for meat, rice and multi-dish gatherings.',
        'The usual mistake is estimating by feel and rounding everything up. Calculate each item separately and round once at the end.',
      ],
      ja: [
        '食事の量は「人数×一人分」が基本で、一人分は食べる人の構成や主菜か副菜かで変わります。肉・ご飯・複数料理が並ぶ集まりの買い物量を、その前提で計算します。',
        'よくある失敗は感覚で見積もって全部多めにすることです。品目ごとに計算し、最後に一度だけ切り上げてください。',
      ],
    },
  },
  work: {
    id: 'work',
    slug: 'work',
    emoji: '💰',
    order: 4,
    label: {
      ko: '직장·급여',
      en: 'Pay & work',
      ja: '給与・仕事',
    },
    description: {
      ko: '연봉과 월급에서 세금·4대보험을 뺀 실수령액, 시급, 주휴수당, 퇴직금을 계산합니다.',
      en: 'Take-home pay, hourly rates and related work calculations.',
      ja: '手取り額や時給など、働き方に関する計算をまとめています。',
    },
    intro: {
      ko: [
        '급여 계산은 순서가 있습니다. 연봉이나 월급에서 국민연금·건강보험·고용보험·소득세를 빼야 실제 통장에 들어오는 금액이 나오고, 이 공제율은 매년 바뀝니다. 연봉 실수령액·월급 실수령액 계산기는 올해 요율로 세전과 세후를 나란히 보여줍니다.',
        '시급제라면 주휴수당을 빼놓기 쉽습니다. 주 15시간 이상 일하면 주휴수당이 붙어 실제 시급이 표시 시급보다 높아지므로, 시급 계산기와 주휴수당 계산기로 주급·월급 환산액을 확인하세요.',
        '퇴직금은 퇴직 전 3개월 평균임금이 기준이라 퇴직 직전 급여 구성에 따라 금액이 달라집니다. 퇴직금 계산기는 입사일·퇴직일과 최근 급여를 넣어 평균임금 기준으로 계산합니다. 모든 결과는 참고용이며 실제 금액은 회사 규정과 세법에 따릅니다.',
      ],
      en: [
        'Take-home pay is what is left after pension, health and employment insurance and income tax, and those rates change every year. These calculators show gross and net side by side using the rates for the current year, plus hourly-wage conversions and severance estimates.',
        'Results are estimates; the exact figure depends on the rules at your workplace and the tax law that applies to you.',
      ],
      ja: [
        '手取り額は、年金・健康保険・雇用保険・所得税を差し引いた後に残る金額で、その料率は毎年変わります。今年の料率で額面と手取りを並べて表示し、時給換算や退職金の目安も計算します。',
        '結果は目安です。正確な金額は勤務先の規定と適用される税法によって決まります。',
      ],
    },
  },
  business: {
    id: 'business',
    slug: 'business',
    emoji: '📦',
    order: 5,
    label: {
      ko: '사업·판매',
      en: 'Selling & pricing',
      ja: '販売・価格設定',
    },
    description: {
      ko: '원가, 수수료, 배송비를 넣고 실제로 남는 이익과 적정 판매가를 계산합니다.',
      en: 'Price your products with cost, fees and shipping included, and see what actually remains as profit.',
      ja: '原価・手数料・送料を含めて、実際に残る利益と適正な販売価格を計算します。',
    },
    intro: {
      ko: [
        '판매가를 정할 때 흔한 실수는 원가에 원하는 이익만 더하는 것입니다. 플랫폼 수수료, 결제 수수료, 배송비, 포장비가 빠지면 팔수록 손해가 납니다. 판매 마진 계산기는 이 항목을 전부 넣고 실제로 남는 금액과 마진율을 보여줍니다.',
        '거꾸로 얼마에 팔아야 하는지가 궁금하면 목표 판매가 계산기를 쓰세요. 원가와 목표 마진율, 수수료율을 넣으면 그 마진을 지키는 최소 판매가가 나옵니다. 원가율 계산기는 판매가 대비 원가 비중을 보여줘 가격 인상 여지를 판단할 때 씁니다.',
        '광고를 돌린다면 손익분기점과 ROAS를 같이 보세요. 손익분기점 계산기는 고정비를 회수하는 데 필요한 판매량을, ROAS 계산기는 광고비 대비 매출 배수를 계산합니다. 마진율이 낮으면 ROAS가 높아도 적자일 수 있으니 두 숫자를 함께 놓고 판단하는 것이 핵심입니다.',
      ],
      en: [
        'The usual pricing mistake is adding the profit you want to the unit cost and stopping there. Marketplace fees, payment processing, shipping and packaging come out of the sale price, and if they are left out you can lose money on every order. The profit margin calculator includes all of them and shows what actually remains.',
        'If the question is what price you need to charge, use the target selling price calculator: enter cost, fees and the margin you want to keep, and it returns the minimum price that protects that margin.',
        'The break-even calculator turns fixed costs and unit margin into the number of sales you need before the business covers itself. Check it before committing to ad spend — a high return on ad spend still loses money when the margin per sale is thin.',
      ],
      ja: [
        '価格設定でよくある失敗は、原価に欲しい利益を足して終わりにすることです。プラットフォーム手数料・決済手数料・送料・梱包費は売上から引かれるので、これを抜くと売るほど赤字になります。利益率計算はこれらをすべて含め、実際に残る金額を表示します。',
        '「いくらで売るべきか」を知りたいときは目標販売価格の計算を使ってください。原価・手数料・確保したい利益率を入れると、その利益率を守れる最低販売価格が出ます。',
        '損益分岐点の計算は、固定費と1個あたりの利益から、事業が回り始めるまでに必要な販売数を出します。広告費をかける前に確認してください。1個あたりの利益が薄いと、広告の費用対効果が高くても赤字になります。',
      ],
    },
  },
  home: {
    id: 'home',
    slug: 'home',
    emoji: '🏠',
    order: 6,
    label: {
      ko: '집·이사',
      en: 'Home & moving',
      ja: '住まい・引っ越し',
    },
    description: {
      ko: '평수 환산, 이사 예산, 벽지·장판 필요량처럼 집과 관련된 계산을 모았습니다.',
      en: 'Floor area conversion, moving budgets and material quantities for your home.',
      ja: '面積の換算や引っ越し予算など、住まいに関する計算をまとめました。',
    },
    intro: {
      ko: [
        '집 관련 숫자는 단위부터 어긋나기 쉽습니다. 부동산은 평, 계약서와 공고는 ㎡를 쓰기 때문에 평 ↔ ㎡ 변환 계산기로 같은 단위에 놓고 비교하세요. 1평은 약 3.3058㎡이고, 전용면적과 공급면적은 다른 숫자입니다.',
        '벽지와 장판은 면적에 시공 여유분을 더해야 합니다. 벽지·장판 필요량 계산기로 방 치수 기준 필요 수량을 구한 뒤 10% 정도 여유를 두는 것이 일반적입니다. 모자라서 다시 주문하면 같은 로트를 못 구할 수 있습니다.',
        '이사비용은 거리·짐 양·층수 같은 조건으로 크게 갈립니다. 이사비용 예산 계산기로 예상액을 먼저 잡아둔 뒤 업체 견적을 받으면, 어느 항목이 비싸게 잡혔는지 바로 비교할 수 있습니다.',
      ],
      en: [
        'Floor area is quoted in different units depending on the country and the document — pyeong in Korean listings, tsubo in Japan, square metres in most contracts. Convert to one unit before comparing, and check whether a figure is the exclusive (net) area or the gross supply area, which can differ by 20–30%.',
        'The floor area converter switches between pyeong and square metres in both directions. One pyeong is about 3.3058 m².',
      ],
      ja: [
        '面積の単位は国や書類によって違います。韓国の物件は坪、日本も坪と㎡が混在し、契約書は㎡が基本です。比較する前に単位を揃え、専有面積か供給面積かも確認してください。両者は20〜30%違うことがあります。',
        '坪・㎡の換算は坪と㎡を相互に変換します。1坪は約3.3058㎡です。',
      ],
    },
  },
};

export const orderedCategories: CategoryDefinition[] = Object.values(categories).sort(
  (a, b) => a.order - b.order,
);

export function getCategory(id: CategoryId): CategoryDefinition {
  return categories[id];
}

export function categoryPath(category: CategoryDefinition): string {
  return `/category/${category.slug}`;
}

export function findCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return orderedCategories.find((category) => category.slug === slug);
}
