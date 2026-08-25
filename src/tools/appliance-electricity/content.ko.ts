import type { ToolContent } from '@/lib/tools/types';
import { ELECTRICITY_BASIS } from '@/lib/data/kr-electricity';
import type { ApplianceElectricityCopy } from '@/lib/tools/shared/appliance-copy';

export const contentKo: ToolContent<ApplianceElectricityCopy> = {
  title: '가전제품 전기료 계산기',
  seoTitle: '가전제품 전기료 계산기 — 기기별 한 달 전기요금',
  seoDescription:
    '전기장판, 건조기, 에어프라이어 등 가전제품의 소비전력과 사용 시간으로 한 달 전기요금을 계산합니다. 누진 구간까지 반영합니다.',
  lead: '가전제품 하나가 한 달에 전기요금을 얼마나 올리는지 계산합니다. 소비전력과 사용 시간만 넣으면 됩니다.',
  summary: '가전제품별 소비전력으로 월 추가 전기요금을 계산합니다.',
  keywords: {
    primaryKeyword: '가전제품 전기료 계산',
    secondaryKeywords: [
      '전기장판 전기세',
      '건조기 전기요금',
      '에어프라이어 전기료',
      'W 전기요금 계산',
      '소비전력 요금 계산',
    ],
    searchIntent:
      '특정 가전제품을 사용할 때 한 달 전기요금이 얼마나 늘어나는지 계산하고 싶다.',
  },
  howItWorks: [
    '추가 사용량(kWh) = 소비전력(W) × 하루 사용시간 × 사용일수 ÷ 1,000 입니다.',
    '전기요금은 누진제이므로 같은 사용량이라도 기존 사용량에 따라 추가 요금이 달라집니다. 기존 월 사용량을 넣으면 실제 증가액을 계산합니다.',
    '자주 쓰는 가전은 목록에서 고르면 대표 소비전력이 자동으로 입력됩니다. 제품마다 차이가 있으니 라벨 값으로 조정하세요.',
    '대기전력은 이 계산에 포함되지 않습니다. 24시간 켜두는 기기는 사용시간을 24로 넣으세요.',
    '냉장고처럼 상시 가동되는 기기는 제품 라벨의 "월간 소비전력량(kWh/월)"을 직접 쓰는 편이 정확합니다.',
  ],
  formula: [
    { label: '추가 사용량', expression: 'kWh = 소비전력(W) × 시간 × 일수 ÷ 1,000' },
    {
      label: '추가 요금',
      expression: '추가 요금 = 요금(기존 + 추가) - 요금(기존)',
      note: '누진 구간 변화를 반영하기 위해 두 요금의 차이로 계산합니다.',
    },
  ],
  example: {
    scenario: '600W 전기건조기를 하루 1.5시간, 한 달 20일 사용하는 경우입니다.',
    steps: [
      '추가 사용량: 600 × 1.5 × 20 ÷ 1,000 = 18kWh',
      '기존 사용량 300kWh(고압, 12월)를 넣으면 318kWh 요금과 300kWh 요금의 차이를 계산',
      '누진 2단계 단가가 적용되어 약 3천원대 증가',
    ],
    conclusion:
      '건조기 하나로 월 3천원대가 늘어납니다. 기존 사용량이 400kWh를 넘는 집이라면 같은 사용량이라도 더 큰 폭으로 늘어납니다.',
  },
  notes: [
    '표시된 소비전력은 대표값입니다. 같은 종류라도 모델과 사용 모드(강/약)에 따라 크게 달라집니다.',
    '히터·전기장판 같은 발열 기기는 온도 설정에 따라 실제 소비전력이 표시값보다 낮을 수 있습니다.',
    '냉장고·김치냉장고는 24시간 가동되지만 압축기가 계속 도는 것은 아니어서, 라벨의 월간 소비전력량을 쓰는 편이 정확합니다.',
    `요금 기준은 ${ELECTRICITY_BASIS.basisDate} 적용 요금표입니다. 실제 고지서와 차이가 있을 수 있습니다.`,
  ],
  faq: [
    {
      question: '소비전력은 어디에 적혀 있나요?',
      answer:
        '제품 뒷면이나 바닥의 정격 라벨, 또는 설명서 사양표에 W(와트) 단위로 표시되어 있습니다. 에너지소비효율등급 라벨이 있는 제품은 월간 소비전력량(kWh/월)이 함께 적혀 있는 경우도 많습니다.',
    },
    {
      question: '대기전력도 계산되나요?',
      answer:
        '포함되지 않습니다. 대기전력은 기기당 보통 1~5W 수준이지만 여러 기기가 24시간 이어지면 무시할 수 없습니다. 별도로 계산하려면 소비전력에 대기전력 값을, 사용시간에 24를 넣어 계산해 보세요.',
    },
    {
      question: '냉장고 전기요금은 어떻게 계산하나요?',
      answer:
        '냉장고는 압축기가 간헐적으로 작동하므로 정격 소비전력 × 24시간으로 계산하면 과대평가됩니다. 라벨의 월간 소비전력량(예: 30kWh/월)을 기존 사용량에 더해 전기요금 계산기로 확인하는 편이 정확합니다.',
    },
    {
      question: '왜 같은 기기인데 집마다 요금이 다른가요?',
      answer:
        '누진제 때문입니다. 이미 사용량이 많은 집은 추가 사용분이 더 높은 단가 구간에 걸리므로 같은 기기라도 요금 증가폭이 큽니다.',
    },
  ],
  basisDate: ELECTRICITY_BASIS.basisDate,
  sources: [{ label: ELECTRICITY_BASIS.sourceLabel, url: ELECTRICITY_BASIS.sourceUrl }],
  relatedGuides: ['electricity-bill-basics'],
  ui: {
    presetLabel: '가전제품',
    presetCustom: '직접 입력',
    presets: [
      { label: '전기장판', watt: 150 },
      { label: '전기히터', watt: 1500 },
      { label: '에어프라이어', watt: 1500 },
      { label: '전기밥솥(보온)', watt: 100 },
      { label: '건조기', watt: 600 },
      { label: '세탁기', watt: 500 },
      { label: '식기세척기', watt: 1200 },
      { label: '전자레인지', watt: 1000 },
      { label: 'TV(55인치)', watt: 120 },
      { label: '데스크톱 PC', watt: 200 },
      { label: '선풍기', watt: 50 },
      { label: '제습기', watt: 300 },
    ],
    wattLabel: '소비전력',
    wattUnit: 'W',
    wattHint: '제품 라벨의 정격 소비전력',
    wattPlaceholder: '예: 600',
    hoursLabel: '하루 사용시간',
    hoursUnit: '시간',
    hoursHint: '24시간 가동이면 24',
    daysLabel: '사용일수',
    daysUnit: '일',
    daysHint: '한 달 기준 30일',
    baseUsageLabel: '기존 월 사용량 (선택)',
    baseUsageUnit: 'kWh',
    baseUsageHint: '이 기기를 제외한 사용량',
    contractLabel: '계약 종별',
    contractLow: '저압 (단독·빌라)',
    contractHigh: '고압 (아파트)',
    monthLabel: '사용 월',
    monthUnit: '월',
    monthHint: '7~8월은 누진 완화',
    addedCostLabel: '이 기기로 늘어나는 요금',
    addedUsageLabel: '추가 사용량',
    perDayLabel: '하루당 요금',
    totalBillLabel: '전체 예상 청구금액',
    noteMain: '이 기기 때문에 전기요금이 약 %{cost} 늘어납니다.',
    noteUsage: '추가 사용량은 약 %{usage}kWh입니다.',
    notePerDay: '하루로 나누면 약 %{perDay}입니다.',
    noteProgressive: '기존 사용량이 많을수록 같은 기기라도 추가 요금이 커집니다.',
    noteEstimate: '설정 모드와 실제 가동 시간에 따라 결과가 달라질 수 있습니다.',
    issueWatt: '소비전력은 0보다 크게 입력해 주세요.',
    issueHours: '하루 사용시간은 1~24 사이로 입력해 주세요.',
    issueDays: '사용일수는 1~31 사이로 입력해 주세요.',
    issueBaseUsage: '기존 사용량은 0 이상으로 입력해 주세요.',
  },
};
