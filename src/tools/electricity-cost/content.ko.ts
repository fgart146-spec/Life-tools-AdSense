import type { ToolContent } from '@/lib/tools/types';
import { ELECTRICITY_BASIS } from '@/lib/data/kr-electricity';
import type { ElectricityCostCopy } from './copy';

export const contentKo: ToolContent<ElectricityCostCopy> = {
  title: '전기요금 예상 계산기',
  seoTitle: '전기요금 계산기 — 사용량으로 이번 달 요금 예상',
  seoDescription:
    '이번 달 사용량(kWh)을 넣으면 누진 구간까지 반영한 전기요금을 계산합니다. 기본요금·전력량요금·기후환경요금·부가세를 단계별로 보여드립니다.',
  lead: '이번 달 사용량을 넣으면 누진 구간별 요금과 세금까지 반영한 예상 청구금액을 계산합니다.',
  summary: '사용량(kWh)으로 누진제를 반영한 전기요금을 계산합니다.',
  keywords: {
    primaryKeyword: '전기요금 계산기',
    secondaryKeywords: [
      '전기세 계산',
      'kWh 요금 계산',
      '전기 누진세 계산',
      '아파트 전기요금',
      '여름 전기요금',
    ],
    searchIntent:
      '이번 달 사용량으로 전기요금이 얼마나 나올지, 누진 구간이 어떻게 적용되는지 알고 싶다.',
  },
  howItWorks: [
    '주택용 전기요금은 기본요금 + 전력량요금 + 기후환경요금 + 연료비조정요금으로 구성되고, 여기에 부가가치세 10%와 전력산업기반기금 2.7%가 더해집니다.',
    '전력량요금은 누진제입니다. 사용량이 많아질수록 뒤쪽 구간의 단가가 높아지며, 이 계산기는 구간별 사용량을 나눠 각각 계산합니다.',
    '7~8월에는 누진 구간이 완화됩니다(1단계 300kWh, 2단계 450kWh). 월을 입력하면 자동으로 반영됩니다.',
    '하계(7~8월)와 동계(12~2월)에 1,000kWh를 넘게 쓰면 슈퍼유저 요금(저압 736.2원/kWh)이 적용됩니다.',
    '아파트는 대부분 고압, 단독주택·빌라는 저압인 경우가 많습니다. 고압이 단가가 더 낮습니다.',
    '최종 금액은 10원 미만을 절사합니다. 실제 고지서에는 복지할인, 대가족 할인 등이 추가로 반영될 수 있습니다.',
  ],
  formula: [
    {
      label: '전기요금계',
      expression: '기본요금 + 전력량요금(누진) + 기후환경요금 + 연료비조정요금',
    },
    { label: '부가가치세', expression: '전기요금계 × 10% (원 단위 반올림)' },
    { label: '전력산업기반기금', expression: '전기요금계 × 2.7% (10원 미만 절사)' },
    { label: '청구금액', expression: '(전기요금계 + 부가세 + 기금)에서 10원 미만 절사' },
  ],
  example: {
    scenario: '아파트(고압)에서 5월에 350kWh를 사용한 경우입니다.',
    steps: [
      '기본요금: 1,260원 (201~400kWh 구간)',
      '전력량요금: 200kWh × 105원 + 150kWh × 174원 = 21,000 + 26,100 = 47,100원',
      '기후환경요금: 350 × 9원 = 3,150원 / 연료비조정: 350 × 5원 = 1,750원',
      '전기요금계 53,260원 → 부가세 5,326원 + 기금 1,430원',
    ],
    conclusion:
      '예상 청구금액은 약 60,010원입니다. 같은 사용량이라도 저압이면 약 70,640원으로 1만원 이상 차이가 납니다.',
  },
  notes: [
    '실제 고지서에는 검침일 기준 사용량, 복지할인, 대가족·다자녀 할인, 미납·조정 금액이 반영되어 이 계산과 차이가 날 수 있습니다.',
    '아파트는 관리비에 전기요금이 포함되며, 단지 전체를 하나로 계약해 세대별로 나누는 방식(고압)이 일반적입니다.',
    '누진제 때문에 사용량이 조금만 늘어도 요금이 크게 뛸 수 있습니다. 400kWh(여름 450kWh) 부근에서는 특히 차이가 큽니다.',
    `요금표는 ${ELECTRICITY_BASIS.tariffEffectiveDate} 인상분이 계속 적용 중이고, 전력산업기반기금은 ${ELECTRICITY_BASIS.fundRateEffectiveDate}부터 2.7%입니다(최종 확인 ${ELECTRICITY_BASIS.basisDate}). 요금 개정 후에는 값이 달라질 수 있으니 고지서와 비교해 보세요.`,
  ],
  faq: [
    {
      question: '우리 집은 고압인가요, 저압인가요?',
      answer:
        '아파트처럼 단지 단위로 한국전력과 계약하고 관리비로 전기요금을 내는 경우는 대부분 고압입니다. 단독주택·빌라처럼 세대별로 한전과 직접 계약해 고지서를 받는 경우는 저압인 경우가 많습니다. 고지서에 계약종별이 표시되어 있습니다.',
    },
    {
      question: '누진제는 어떻게 적용되나요?',
      answer:
        '사용량 전체에 한 가지 단가를 곱하는 것이 아니라, 구간별로 나눠 계산합니다. 예를 들어 350kWh를 쓰면 처음 200kWh는 1단계 단가로, 나머지 150kWh는 2단계 단가로 계산합니다.',
    },
    {
      question: '여름에는 왜 요금이 덜 오르나요?',
      answer:
        '7~8월에는 냉방 수요를 고려해 누진 구간이 확대됩니다. 1단계가 300kWh, 2단계가 450kWh까지로 넓어져서 같은 사용량이라도 요금이 낮아집니다.',
    },
    {
      question: '에어컨을 하루 몇 시간 켜면 얼마나 더 나올까요?',
      answer:
        '에어컨 전기료 계산기에서 소비전력과 사용시간을 넣으면 추가 사용량과 추가 요금을 계산할 수 있습니다. 누진 구간 때문에 기존 사용량이 많을수록 추가 요금도 커집니다.',
    },
    {
      question: '이 계산과 실제 고지서가 다릅니다.',
      answer:
        '검침 기간이 달력상의 한 달과 다르고, 각종 할인과 조정 항목이 있기 때문입니다. 이 계산기는 요금 구조를 이해하고 대략적인 규모를 파악하는 용도로 사용하세요.',
    },
  ],
  basisDate: ELECTRICITY_BASIS.basisDate,
  sources: [
    { label: ELECTRICITY_BASIS.sourceLabel, url: ELECTRICITY_BASIS.sourceUrl },
  ],
  relatedGuides: ['electricity-bill-basics', 'aircon-cost-guide'],
  ui: {
    usageLabel: '이번 달 사용량',
    usageUnit: 'kWh',
    usageHint: '고지서나 관리비 명세서에 표시된 사용량',
    usagePlaceholder: '예: 350',
    contractLabel: '계약 종별',
    contractLow: '저압 (단독·빌라)',
    contractHigh: '고압 (아파트)',
    contractHint: '고지서의 계약종별을 확인하세요.',
    monthLabel: '사용 월',
    monthUnit: '월',
    monthHint: '7~8월은 누진 구간이 완화됩니다.',
    totalLabel: '예상 청구금액',
    baseChargeLabel: '기본요금',
    energyChargeLabel: '전력량요금',
    climateLabel: '기후환경요금',
    fuelLabel: '연료비조정요금',
    subtotalLabel: '전기요금계',
    vatLabel: '부가가치세',
    fundLabel: '전력산업기반기금',
    unitPriceLabel: '1kWh당 실질 단가',
    tierTitle: '누진 구간별 요금',
    tierRangeLabel: '%{from}~%{to}kWh',
    tierRangeLastLabel: '%{from}kWh 초과',
    noteTotal: '예상 청구금액은 약 %{total}입니다.',
    noteUnitPrice: '실질 단가는 1kWh당 약 %{unitPrice}입니다.',
    noteSummer: '7~8월 누진 완화 구간이 적용되었습니다.',
    noteProgressive: '사용량이 구간을 넘어서면 단가가 올라가므로, 조금만 줄여도 요금 차이가 큽니다.',
    noteEstimate: '실제 고지서는 검침 기간과 할인 항목에 따라 달라질 수 있습니다.',
    issueUsage: '사용량은 0 이상으로 입력해 주세요.',
    issueMonth: '월은 1~12 사이로 입력해 주세요.',
  },
};
