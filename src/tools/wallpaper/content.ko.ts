import type { ToolContent } from '@/lib/tools/types';
import type { WallpaperCopy } from './copy';

export const contentKo: ToolContent<WallpaperCopy> = {
  title: '벽지·장판 필요량 계산기',
  seoTitle: '벽지 롤 수 계산기 — 방 크기로 도배·장판 필요량',
  seoDescription:
    '방 가로·세로·높이를 넣으면 도배에 필요한 벽지 롤 수와 장판 길이를 계산합니다. 문·창문 면적과 재단 손실까지 반영합니다.',
  lead: '방 크기만 넣으면 벽지 몇 롤이 필요한지, 장판은 몇 미터가 필요한지 계산합니다.',
  summary: '방 크기로 벽지 롤 수와 장판 길이를 계산합니다.',
  keywords: {
    primaryKeyword: '벽지 롤 계산',
    secondaryKeywords: [
      '도배 벽지 몇 롤',
      '벽지 필요량 계산',
      '장판 길이 계산',
      '셀프 도배 준비물',
      '방 도배 비용',
    ],
    searchIntent:
      '방 크기를 기준으로 도배용 벽지 롤 수와 장판 소요량을 계산하고 싶다.',
  },
  howItWorks: [
    '벽 면적 = 2 × (가로 + 세로) × 천장 높이로 계산한 뒤, 문(1개당 1.8㎡)과 창문(1개당 1.5㎡) 면적을 뺍니다.',
    '천장까지 도배한다면 바닥 면적만큼 더합니다.',
    '재단 손실(로스) 10%를 더한 면적을 롤당 시공 면적으로 나누고 올림해 필요한 롤 수를 구합니다.',
    '광폭·실크 1롤은 폭 1.06m × 길이 15.6m로 약 16.5㎡, 소폭합지 1롤은 폭 0.53m × 길이 12.5m로 약 6.6㎡ 기준입니다.',
    '장판은 폭 1.8m 기준으로 바닥 면적 ÷ 1.8에 로스 10%를 더한 길이를 계산합니다.',
  ],
  formula: [
    { label: '벽 면적', expression: '2 × (가로 + 세로) × 높이 - (문 × 1.8㎡ + 창 × 1.5㎡)' },
    { label: '소요 면적', expression: '(벽 면적 + 천장 면적) × 1.1' },
    { label: '필요 롤 수', expression: '올림(소요 면적 ÷ 롤당 시공 면적)' },
    { label: '장판 길이', expression: '바닥 면적 ÷ 1.8m × 1.1' },
  ],
  example: {
    scenario: '가로 3.5m × 세로 4m, 천장 높이 2.3m인 방에 문 1개와 창문 1개가 있습니다.',
    steps: [
      '벽 면적: 2 × (3.5 + 4) × 2.3 = 34.5㎡ - 3.3㎡ = 31.2㎡',
      '로스 포함: 31.2 × 1.1 = 34.3㎡',
      '광폭 기준: 34.3 ÷ 16.5 = 2.08 → 3롤',
    ],
    conclusion:
      '광폭·실크 벽지 3롤이 필요합니다. 바닥은 14㎡(약 4.2평)로 장판은 약 8.6m가 필요합니다.',
  },
  notes: [
    '벽지 규격은 제조사마다 다릅니다. 구매 전 롤당 시공 면적(㎡ 또는 평)을 반드시 확인하세요.',
    '무늬가 큰 벽지는 무늬 맞춤 때문에 로스가 15~20%까지 늘어납니다.',
    '문·창문 크기가 표준과 다르면 결과가 달라집니다. 큰 창(발코니 창 등)은 실제 면적으로 다시 계산하세요.',
    '천장 도배는 난이도가 높습니다. 셀프 시공이라면 벽만 먼저 하는 것도 방법입니다.',
    '장판은 이음매를 줄이기 위해 폭 방향을 방 긴 쪽에 맞추는 경우가 많아 실제 소요량이 달라질 수 있습니다.',
  ],
  faq: [
    {
      question: '벽지 1롤은 몇 평을 시공하나요?',
      answer:
        '광폭·실크 벽지 1롤은 보통 5평(약 16.5㎡), 소폭합지 1롤은 약 2평(6.6㎡)을 시공합니다. 제품마다 다르므로 포장에 표시된 규격을 확인하세요.',
    },
    {
      question: '로스는 왜 10%를 더하나요?',
      answer:
        '벽 높이에 맞춰 자르면 자투리가 남고, 모서리와 개구부 주변에서 손실이 생깁니다. 무늬가 없는 벽지는 10%, 무늬 맞춤이 필요한 벽지는 15~20%를 잡는 것이 안전합니다.',
    },
    {
      question: '실크와 합지는 어떻게 다른가요?',
      answer:
        '실크벽지는 PVC 코팅이 있어 오염에 강하고 물걸레질이 가능하지만 가격이 높습니다. 합지는 종이 재질로 저렴하고 통기성이 좋지만 오염에 약합니다.',
    },
    {
      question: '장판과 마루 중 어느 쪽이 좋나요?',
      answer:
        '장판은 시공이 빠르고 저렴하며 난방 효율이 좋습니다. 마루는 질감이 좋지만 비용이 높고 습기에 약합니다. 예산과 거주 기간을 함께 고려하세요.',
    },
  ],
  relatedGuides: [],
  ui: {
    widthLabel: '방 가로',
    lengthLabel: '방 세로',
    sizeUnit: 'm',
    sizeHint: '벽 안쪽 기준',
    heightLabel: '천장 높이',
    heightHint: '보통 2.3~2.4m',
    doorsLabel: '문 개수',
    doorsUnit: '개',
    doorsHint: '1개당 1.8㎡ 제외',
    windowsLabel: '창문 개수',
    windowsHint: '1개당 1.5㎡ 제외',
    typeLabel: '벽지 종류',
    typeOptions: {
      wide: '광폭·실크 (1롤 16.5㎡)',
      narrow: '소폭합지 (1롤 6.6㎡)',
    },
    typeHint: '제품 포장의 시공 면적을 확인하세요.',
    ceilingLabel: '천장도 도배',
    ceilingHint: '바닥 면적만큼 추가됩니다.',
    priceRollLabel: '벽지 1롤 가격 (선택)',
    priceRollHint: '넣으면 예상 비용 계산',
    priceFlooringLabel: '장판 1m 가격 (선택)',
    priceFlooringHint: '폭 1.8m 기준',
    rollsLabel: '필요한 벽지',
    wallAreaLabel: '벽 면적',
    ceilingAreaLabel: '천장 면적',
    totalAreaLabel: '도배 총 면적',
    floorAreaLabel: '바닥 면적',
    flooringLengthLabel: '장판 필요 길이',
    wallpaperCostLabel: '벽지 예상 비용',
    flooringCostLabel: '장판 예상 비용',
    noteRolls: '벽지는 %{rolls}롤이 필요합니다.',
    noteArea: '도배 면적은 약 %{area}㎡입니다.',
    noteFlooring: '장판은 약 %{length}m(바닥 %{pyeong}평)가 필요합니다.',
    noteCost: '벽지 예상 비용은 약 %{cost}입니다.',
    noteLoss: '재단 손실 10%를 반영했습니다. 무늬 벽지는 15~20%로 잡는 것이 안전합니다.',
    noteBasis: '롤 규격은 제조사마다 다르므로 구매 전 시공 면적을 확인하세요.',
    issueSize: '가로·세로는 0보다 크고 50m 이하로 입력해 주세요.',
    issueHeight: '천장 높이는 0보다 크고 10m 이하로 입력해 주세요.',
    issueOpenings: '문·창문 개수는 0~20개 사이로 입력해 주세요.',
    issuePrice: '가격은 0원 이상으로 입력해 주세요.',
  },
};
