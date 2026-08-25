import type { ToolContent } from '@/lib/tools/types';
import { ELECTRICITY_BASIS } from '@/lib/data/kr-electricity';
import type { ApplianceElectricityCopy } from '@/lib/tools/shared/appliance-copy';

export const contentKo: ToolContent<ApplianceElectricityCopy> = {
  title: '에어컨 전기료 계산기',
  seoTitle: '에어컨 전기료 계산기 — 하루 몇 시간 켜면 얼마 나올까',
  seoDescription:
    '에어컨 소비전력과 사용 시간을 넣으면 한 달 추가 전기요금을 계산합니다. 누진 구간까지 반영해 실제로 늘어나는 금액을 보여줍니다.',
  lead: '에어컨을 하루 몇 시간 켜면 전기요금이 얼마나 늘어나는지 계산합니다. 기존 사용량을 함께 넣으면 누진 구간까지 반영한 실제 증가액이 나옵니다.',
  summary: '에어컨 사용 시간에 따른 한 달 추가 전기요금을 계산합니다.',
  keywords: {
    primaryKeyword: '에어컨 전기료',
    secondaryKeywords: [
      '에어컨 전기요금 계산',
      '에어컨 하루 8시간 전기세',
      '인버터 에어컨 전기료',
      '에어컨 24시간 요금',
      '냉방비 계산',
    ],
    searchIntent:
      '에어컨을 하루 몇 시간씩 켰을 때 한 달 전기요금이 얼마나 늘어나는지 알고 싶다.',
  },
  howItWorks: [
    '추가 사용량(kWh) = 소비전력(W) × 하루 사용시간 × 사용일수 ÷ 1,000 으로 계산합니다.',
    '전기요금은 누진제이므로, 추가 요금은 "기존 사용량 + 추가 사용량"의 요금에서 "기존 사용량"의 요금을 뺀 값입니다. 기존 사용량이 많을수록 추가 요금이 커집니다.',
    '기존 월 사용량을 비워 두면 에어컨만 사용했을 때의 요금으로 계산합니다.',
    '7~8월은 누진 구간이 완화되어 같은 사용량이라도 요금이 낮아집니다.',
    '인버터 에어컨은 설정 온도 도달 후 소비전력이 크게 떨어지므로, 정격 소비전력을 그대로 넣으면 실제보다 높게 나옵니다.',
  ],
  formula: [
    { label: '추가 사용량', expression: 'kWh = 소비전력(W) × 시간 × 일수 ÷ 1,000' },
    {
      label: '추가 요금',
      expression: '추가 요금 = 요금(기존 + 추가 사용량) - 요금(기존 사용량)',
      note: '누진 구간이 달라지므로 단순히 사용량 × 단가로 계산하지 않습니다.',
    },
    { label: '하루당 요금', expression: '하루당 요금 = 추가 요금 ÷ 사용일수' },
  ],
  example: {
    scenario:
      '소비전력 1,800W 스탠드형 에어컨을 하루 8시간, 30일 사용합니다. 기존 사용량은 250kWh(아파트 고압, 8월)입니다.',
    steps: [
      '추가 사용량: 1,800 × 8 × 30 ÷ 1,000 = 432kWh',
      '기존 250kWh 요금과 682kWh 요금을 각각 계산',
      '두 금액의 차이가 에어컨으로 늘어난 요금',
    ],
    conclusion:
      '누진 3단계까지 올라가기 때문에 추가 요금이 사용량 비율보다 훨씬 크게 늘어납니다. 사용 시간을 하루 2시간만 줄여도 체감 차이가 큽니다.',
  },
  notes: [
    '인버터 에어컨의 실제 평균 소비전력은 정격의 30~60% 수준인 경우가 많습니다. 제품 라벨의 "냉방 소비전력"과 "월간 소비전력량"을 참고해 조정하세요.',
    '구형 정속형 에어컨은 켜고 끄기를 반복하면 오히려 전력 소모가 큽니다. 인버터는 계속 켜두는 편이 유리한 경우가 많습니다.',
    '실외기 주변 환기, 필터 청소 상태에 따라 소비전력이 달라집니다.',
    '아파트는 관리비에 전기요금이 포함되어 개별 고지서가 없을 수 있습니다. 관리비 명세서의 사용량을 확인하세요.',
    `요금 기준은 ${ELECTRICITY_BASIS.basisDate} 적용 요금표입니다.`,
  ],
  faq: [
    {
      question: '에어컨 소비전력은 어디서 확인하나요?',
      answer:
        '제품 옆면이나 뒷면의 에너지소비효율 라벨, 또는 제품 사양표에 "냉방 소비전력(W)"으로 표시되어 있습니다. 인버터 제품은 최소~최대 범위로 적혀 있기도 한데, 이 경우 중간값을 넣으면 현실에 가깝습니다.',
    },
    {
      question: '인버터 에어컨은 계속 켜두는 게 나은가요?',
      answer:
        '설정 온도에 도달하면 소비전력이 크게 낮아지므로, 짧은 간격으로 껐다 켜는 것보다 계속 켜두는 편이 유리한 경우가 많습니다. 다만 몇 시간 이상 자리를 비운다면 끄는 것이 낫습니다.',
    },
    {
      question: '왜 사용량이 2배 늘면 요금은 2배 이상 늘어나나요?',
      answer:
        '누진제 때문입니다. 사용량이 늘어나면 뒤쪽 구간의 높은 단가가 적용되므로 요금 증가폭이 더 큽니다. 이 계산기는 그 차이를 반영해 실제 증가액을 보여줍니다.',
    },
    {
      question: '여름철 요금이 조금 덜 오르는 이유는?',
      answer:
        '7~8월에는 누진 구간이 확대(1단계 300kWh, 2단계 450kWh)되기 때문입니다. 월을 7이나 8로 입력하면 자동 반영됩니다.',
    },
  ],
  basisDate: ELECTRICITY_BASIS.basisDate,
  sources: [{ label: ELECTRICITY_BASIS.sourceLabel, url: ELECTRICITY_BASIS.sourceUrl }],
  relatedGuides: ['aircon-cost-guide', 'electricity-bill-basics'],
  ui: {
    presetLabel: '에어컨 종류',
    presetCustom: '직접 입력',
    presets: [
      { label: '벽걸이형', watt: 700 },
      { label: '스탠드형', watt: 1800 },
      { label: '스탠드형(대형)', watt: 2500 },
      { label: '창문형', watt: 800 },
      { label: '인버터 평균 사용', watt: 900 },
    ],
    wattLabel: '소비전력',
    wattUnit: 'W',
    wattHint: '제품 라벨의 냉방 소비전력',
    wattPlaceholder: '예: 1,800',
    hoursLabel: '하루 사용시간',
    hoursUnit: '시간',
    hoursHint: '평균적으로 켜두는 시간',
    daysLabel: '사용일수',
    daysUnit: '일',
    daysHint: '한 달 기준 30일',
    baseUsageLabel: '기존 월 사용량 (선택)',
    baseUsageUnit: 'kWh',
    baseUsageHint: '에어컨 외 사용량. 비우면 에어컨만 계산',
    contractLabel: '계약 종별',
    contractLow: '저압 (단독·빌라)',
    contractHigh: '고압 (아파트)',
    monthLabel: '사용 월',
    monthUnit: '월',
    monthHint: '7~8월은 누진 완화',
    addedCostLabel: '에어컨으로 늘어나는 요금',
    addedUsageLabel: '추가 사용량',
    perDayLabel: '하루당 요금',
    totalBillLabel: '전체 예상 청구금액',
    noteMain: '이 조건이면 전기요금이 약 %{cost} 늘어납니다.',
    noteUsage: '추가 사용량은 약 %{usage}kWh입니다.',
    notePerDay: '하루로 나누면 약 %{perDay}입니다.',
    noteProgressive: '기존 사용량이 많을수록 같은 시간을 켜도 추가 요금이 커집니다.',
    noteEstimate: '인버터 제품은 실제 소비전력이 정격보다 낮아 계산보다 적게 나올 수 있습니다.',
    issueWatt: '소비전력은 0보다 크게 입력해 주세요.',
    issueHours: '하루 사용시간은 1~24 사이로 입력해 주세요.',
    issueDays: '사용일수는 1~31 사이로 입력해 주세요.',
    issueBaseUsage: '기존 사용량은 0 이상으로 입력해 주세요.',
  },
};
