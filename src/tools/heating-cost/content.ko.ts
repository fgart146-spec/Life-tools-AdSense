import type { ToolContent } from '@/lib/tools/types';
import type { HeatingCostCopy } from './copy';

export const contentKo: ToolContent<HeatingCostCopy> = {
  title: '난방비 예상 계산기',
  seoTitle: '난방비 계산기 — 도시가스·지역난방·전기난방 요금 예상',
  seoDescription:
    '검침 사용량과 단가를 넣으면 이번 달 난방비를 계산합니다. 도시가스(㎥), 지역난방(Mcal), 전기난방(kWh)을 모두 지원합니다.',
  lead: '도시가스·지역난방·전기난방의 사용량과 단가를 넣으면 이번 달 예상 난방비와 하루당 비용을 계산합니다.',
  summary: '사용량과 단가로 도시가스·지역난방·전기난방 요금을 계산합니다.',
  keywords: {
    primaryKeyword: '난방비 계산기',
    secondaryKeywords: [
      '도시가스 요금 계산',
      '지역난방 요금 계산',
      '가스비 계산',
      '난방비 얼마',
      '겨울 난방비 절약',
    ],
    searchIntent:
      '이번 달 난방비가 얼마나 나올지, 사용량을 줄이면 얼마나 아낄 수 있는지 알고 싶다.',
  },
  howItWorks: [
    '도시가스는 ㎥로 검침하지만 요금은 열량(MJ) 기준입니다. 사용량(㎥) × 열량계수(MJ/㎥) × 단가(원/MJ)로 계산합니다.',
    '지역난방은 사용량(Mcal) × 단가(원/Mcal), 전기난방은 사용량(kWh) × 단가(원/kWh)로 계산합니다.',
    '기본요금이 있는 경우 더하고, 단가에 부가세가 포함돼 있지 않다면 10%를 더합니다.',
    '단가와 열량계수는 지역·공급사·시기에 따라 다릅니다. 기본값은 참고용이므로 고지서에 적힌 값으로 바꿔 입력하면 훨씬 정확합니다.',
    '사용일수를 넣으면 하루당 난방비도 함께 계산합니다.',
  ],
  formula: [
    { label: '도시가스', expression: '요금 = 사용량(㎥) × 열량(MJ/㎥) × 단가(원/MJ) + 기본요금' },
    { label: '지역난방', expression: '요금 = 사용량(Mcal) × 단가(원/Mcal) + 기본요금' },
    { label: '전기난방', expression: '요금 = 사용량(kWh) × 단가(원/kWh)' },
    { label: '부가가치세', expression: '단가에 포함돼 있지 않으면 (사용요금 + 기본요금) × 10%' },
  ],
  example: {
    scenario: '도시가스 100㎥를 사용했고, 고지서상 단가는 22.4원/MJ, 열량계수 43.1MJ/㎥입니다.',
    steps: [
      '열량 환산: 100 × 43.1 = 4,310MJ',
      '사용요금: 4,310 × 22.4 = 96,544원',
      '기본요금 1,250원을 더하고 부가세 10% 적용',
    ],
    conclusion:
      '예상 난방비는 약 107,570원, 하루당 약 3,590원입니다. 사용량을 10% 줄이면 약 1만원을 아낄 수 있습니다.',
  },
  notes: [
    '도시가스 단가는 지역(도시가스사)마다 다르고, 취사용·난방용 구분이 있습니다. 고지서의 단가를 그대로 넣는 것이 가장 정확합니다.',
    '열량계수는 계절과 공급 가스에 따라 42~44MJ/㎥ 범위에서 조금씩 달라집니다.',
    '지역난방은 기본요금(계약면적 기준)과 사용요금이 분리되어 있으며, 단지에 따라 세대 계량 방식이 다릅니다.',
    '전기난방은 누진제 영향을 크게 받습니다. 정확한 금액은 전기요금 계산기로 확인하세요.',
    '난방 사용량은 외기온도, 단열 상태, 재실 시간에 따라 크게 달라집니다. 지난달 고지서 사용량을 기준으로 예상해 보세요.',
  ],
  faq: [
    {
      question: '고지서에서 어떤 숫자를 넣어야 하나요?',
      answer:
        '도시가스 고지서에는 사용량(㎥), 열량계수(MJ/㎥), 단가(원/MJ)가 표시되어 있습니다. 그 세 값을 그대로 넣으면 고지서와 거의 같은 금액이 나옵니다.',
    },
    {
      question: '왜 ㎥가 아니라 MJ로 계산하나요?',
      answer:
        '도시가스 요금은 부피가 아니라 열량 기준으로 매겨지기 때문입니다. 같은 1㎥라도 열량이 다르면 요금이 달라집니다. 그래서 사용량에 열량계수를 곱해 MJ로 환산한 뒤 단가를 곱합니다.',
    },
    {
      question: '난방비를 줄이는 가장 효과적인 방법은?',
      answer:
        '실내 온도를 1~2도 낮추는 것이 가장 직접적입니다. 그 외에 창문 단열(뽁뽁이·문풍지), 보일러 외출 모드 활용, 사용하지 않는 방 밸브 잠그기(다만 전체 순환에 영향이 있어 과도한 차단은 비효율)가 흔히 권장됩니다.',
    },
    {
      question: '전기장판이 보일러보다 저렴한가요?',
      answer:
        '난방 면적이 좁고 짧게 쓴다면 전기장판이 저렴한 경우가 많습니다. 다만 전기요금은 누진제라 사용량이 많은 가정에서는 예상보다 비싸질 수 있습니다. 가전제품 전기료 계산기로 함께 비교해 보세요.',
    },
  ],
  relatedGuides: ['electricity-bill-basics'],
  ui: {
    typeLabel: '난방 방식',
    typeGas: '도시가스',
    typeDistrict: '지역난방',
    typeElectric: '전기난방',
    typeHint: '방식을 바꾸면 단위와 기본 단가가 함께 바뀝니다.',
    usageLabel: '사용량',
    usageHint: '고지서의 이번 달 검침 사용량',
    unitGas: '㎥',
    unitDistrict: 'Mcal',
    unitElectric: 'kWh',
    unitRateLabel: '단가',
    unitRateHint: '고지서에 적힌 단가로 바꾸면 정확합니다.',
    rateUnitGas: '원/MJ',
    rateUnitDistrict: '원/Mcal',
    rateUnitElectric: '원/kWh',
    heatValueLabel: '열량계수',
    heatValueHint: '도시가스 고지서에 표시됩니다 (보통 42~44)',
    baseChargeLabel: '기본요금',
    baseChargeHint: '없으면 0',
    daysLabel: '사용일수',
    daysUnit: '일',
    vatLabel: '단가에 부가세가 포함되어 있음',
    vatHint: '체크하면 부가세를 추가로 더하지 않습니다.',
    totalLabel: '예상 난방비',
    energyChargeLabel: '사용요금',
    baseChargeRowLabel: '기본요금',
    vatRowLabel: '부가가치세',
    perDayLabel: '하루당 비용',
    totalMjLabel: '환산 열량',
    noteTotal: '이번 달 예상 난방비는 약 %{total}입니다.',
    notePerDay: '하루당 약 %{perDay} 수준입니다.',
    noteRate: '단가와 열량계수는 지역·시기에 따라 다르므로 고지서 값으로 넣으면 더 정확합니다.',
    noteElectric: '전기난방은 누진제 영향이 커서, 정확한 금액은 전기요금 계산기로 확인하세요.',
    noteEstimate: '실제 청구서는 검침 기간과 할인 항목에 따라 달라질 수 있습니다.',
    issueUsage: '사용량은 0 이상으로 입력해 주세요.',
    issueUnitRate: '단가는 0 이상으로 입력해 주세요.',
    issueHeatValue: '열량계수는 0보다 크게 입력해 주세요.',
    issueBaseCharge: '기본요금은 0 이상으로 입력해 주세요.',
    issueDays: '사용일수는 1~31 사이로 입력해 주세요.',
  },
};
