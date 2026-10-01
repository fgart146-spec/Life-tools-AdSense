import type { ToolContent } from '@/lib/tools/types';
import { ELECTRICITY_BASIS } from '@/lib/data/kr-electricity';
import type { ApplianceElectricityCopy } from '@/lib/tools/shared/appliance-copy';

export const contentKo: ToolContent<ApplianceElectricityCopy> = {
  title: '에어컨 전기료 계산기',
  seoTitle: '에어컨 전기료 계산기 — 하루 몇 시간 켜면 얼마 나올까',
  seoDescription:
    '에어컨 제품 라벨의 소비전력과 사용 시간을 넣어 한 달 추가 전기요금을 추정합니다. 기존 사용량을 함께 입력하면 누진 구간 차이도 계산합니다.',
  lead: '먼저 제품 라벨이나 사양표의 소비전력을 확인해 직접 입력하세요. 아래 종류별 W값은 제품 사양이 아닌 계산 예시입니다. 기존 사용량을 함께 넣으면 누진 구간을 반영한 예상 증가액을 볼 수 있습니다.',
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
    '입력한 W가 사용 시간 내내 일정하다고 가정합니다. 인버터 제품은 실제 전력이 운전 조건에 따라 바뀌므로, 정격값을 넣은 결과를 실제 청구액으로 받아들이지 마세요.',
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
      '1,800W가 사용 시간 내내 유지된다고 가정한 계산 예시입니다. 하루 8시간, 30일 사용하고 기존 사용량은 250kWh(고압 계약, 8월)입니다.',
    steps: [
      '추가 사용량: 1,800 × 8 × 30 ÷ 1,000 = 432kWh',
      '기존 250kWh 요금과 682kWh 요금을 각각 계산',
      '두 금액의 차이가 에어컨으로 늘어난 요금',
    ],
    conclusion:
      '432kWh는 일정한 1,800W를 가정한 추가 사용량입니다. 실제 제품의 평균 소비전력이 다르면 계산 결과도 달라지므로, 제품 표시와 고지서 사용량을 대조하세요.',
  },
  notes: [
    '종류별 기본 W값은 특정 제조사 모델에서 측정한 값이 아닙니다. 가능하면 해당 제품의 냉방 소비전력·전력 사용량 표시를 확인하고 직접 입력하세요.',
    '인버터 에어컨의 전력은 설정 온도, 실내외 온도, 운전 상태에 따라 달라집니다. 켜두는 편이 항상 유리하다는 규칙으로 계산하지 않습니다.',
    '실외기 주변 환기, 필터 청소 상태에 따라 소비전력이 달라집니다.',
    '아파트는 관리비에 전기요금이 포함되어 개별 고지서가 없을 수 있습니다. 관리비 명세서의 사용량을 확인하세요.',
    `요금 기준은 ${ELECTRICITY_BASIS.basisDate} 적용 요금표입니다.`,
  ],
  faq: [
    {
      question: '에어컨 소비전력은 어디서 확인하나요?',
      answer:
        '제품의 에너지소비효율 라벨, 사양표 또는 모델 설명서에서 냉방 소비전력을 확인하세요. 최소~최대 범위만 있다면 임의의 중간값이 실제 평균이라는 보장은 없습니다. 해당 모델의 사용량 자료가 있으면 그것을 우선하고, 없다면 여러 W값을 넣어 범위로 비교하세요.',
    },
    {
      question: '인버터 에어컨은 계속 켜두는 게 나은가요?',
      answer:
        '이 계산기는 전원을 끄고 다시 켤 때의 운전 변화를 따로 모델링하지 않습니다. 같은 평균 소비전력을 가정한 사용 시간만 비교할 수 있으므로, 어느 운전 방식이 유리한지는 제품 자료와 실제 사용량으로 확인해야 합니다.',
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
  sources: [
    { label: ELECTRICITY_BASIS.sourceLabel, url: ELECTRICITY_BASIS.sourceUrl },
    {
      label: '전기냉방기의 에너지소비효율등급 표시 적용 범위',
      url: 'https://eep.energy.or.kr/business_introduction/effi_standard.aspx',
      publisher: '한국에너지공단',
      accessedAt: '2026-10-02',
    },
    { label: '에어컨 소비전력은 계산 예시 대신 사용 중인 모델의 라벨·사양표·설명서에서 확인하세요.' },
  ],
  relatedGuides: ['aircon-cost-guide', 'electricity-bill-basics'],
  ui: {
    presetLabel: '소비전력 예시 (제품값 우선)',
    presetCustom: '제품값 직접 입력',
    presets: [
      { label: '벽걸이형', watt: 700 },
      { label: '스탠드형', watt: 1800 },
      { label: '스탠드형(대형)', watt: 2500 },
      { label: '창문형', watt: 800 },
    ],
    wattLabel: '소비전력',
    wattUnit: 'W',
    wattHint: '제품 라벨·사양표의 냉방 소비전력을 직접 입력하세요. 기본값은 예시입니다.',
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
    noteEstimate: '입력한 W가 일정하다고 가정한 추정치입니다. 실제 평균 소비전력과 요금 조건에 따라 차이가 납니다.',
    issueWatt: '소비전력은 0보다 크게 입력해 주세요.',
    issueHours: '하루 사용시간은 1~24 사이로 입력해 주세요.',
    issueDays: '사용일수는 1~31 사이로 입력해 주세요.',
    issueBaseUsage: '기존 사용량은 0 이상으로 입력해 주세요.',
  },
};
