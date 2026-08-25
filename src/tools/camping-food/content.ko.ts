import type { ToolContent } from '@/lib/tools/types';
import type { FoodListCopy } from '@/lib/tools/shared/food-list-copy';

export const contentKo: ToolContent<FoodListCopy> = {
  title: '캠핑 음식량 계산기',
  seoTitle: '캠핑 음식량 계산기 — 인원·박수로 준비물 한 번에',
  seoDescription:
    '인원과 박수를 넣으면 고기·쌀·물·숯까지 캠핑 준비량을 목록으로 계산합니다. 모자라지도 남지도 않게 준비하세요.',
  lead: '몇 명이 몇 박을 가는지만 넣으면 고기·쌀·물·숯 등 준비할 양을 목록으로 알려드립니다.',
  summary: '인원과 박수로 캠핑 식재료와 숯 준비량을 계산합니다.',
  keywords: {
    primaryKeyword: '캠핑 음식량',
    secondaryKeywords: [
      '캠핑 고기 양',
      '캠핑 준비물 수량',
      '1박2일 캠핑 식재료',
      '캠핑 물 얼마나',
      '캠핑 숯 양',
    ],
    searchIntent:
      '캠핑에서 인원수에 맞게 고기·쌀·물·숯을 얼마나 준비해야 하는지 알고 싶다.',
  },
  howItWorks: [
    '환산 인원 = (성인 + 어린이 × 0.5) × 식사량 계수로 계산합니다.',
    '캠핑 1박 기준 1인 준비량에 환산 인원과 박수를 곱해 재료별 필요량을 구합니다.',
    '캠핑은 고기 위주 식사가 많아 1인 350g(평소 220g보다 넉넉히)을 기본값으로 잡았습니다.',
    '물은 음용과 조리를 합쳐 1인 하루 2L 기준입니다. 여름철에는 더 넉넉히 준비하세요.',
    '숯은 1인 0.4kg 기준입니다. 화로대 크기와 굽는 시간에 따라 달라집니다.',
    '재료는 모자라는 것보다 조금 남는 편이 나으므로 올림해서 표시합니다.',
  ],
  formula: [
    { label: '환산 인원', expression: '(성인 + 어린이 × 0.5) × 식사량 계수' },
    { label: '재료별 필요량', expression: '1인 기준량 × 환산 인원 × 박수' },
  ],
  example: {
    scenario: '성인 4명, 어린이 2명이 1박 2일 캠핑을 갑니다.',
    steps: [
      '환산 인원: 4 + 2 × 0.5 = 5명분',
      '고기: 350g × 5 = 1,750g (약 1.8kg)',
      '물: 2,000ml × 5 = 10L, 숯: 0.4kg × 5 = 2kg',
    ],
    conclusion:
      '고기 약 1.8kg, 물 10L, 숯 2kg 정도를 준비하면 됩니다. 라면과 계란은 예비용으로 조금 더 챙기는 것이 안전합니다.',
  },
  notes: [
    '캠핑장 매점 유무를 확인하세요. 매점이 없다면 물과 얼음을 넉넉히 준비해야 합니다.',
    '여름철에는 물 소비가 1.5배까지 늘어납니다. 아이스박스 용량도 함께 고려하세요.',
    '숯은 화로대 크기, 바람, 굽는 시간에 따라 편차가 큽니다. 처음이라면 표시량보다 1kg 정도 여유를 두세요.',
    '고기는 미리 손질해 밀폐용기에 담아가면 쓰레기와 손질 시간을 줄일 수 있습니다.',
    '재료량은 일반적인 캠핑 기준이며 공식 표준은 아닙니다.',
  ],
  faq: [
    {
      question: '캠핑에서 고기는 1인 몇 g이 적당한가요?',
      answer:
        '보통 300~400g으로 잡습니다. 이 계산기는 350g을 기본값으로 사용합니다. 밥과 라면을 함께 먹는다면 300g, 고기 위주라면 400g 이상으로 보세요.',
    },
    {
      question: '물은 얼마나 가져가야 하나요?',
      answer:
        '음용과 조리를 합쳐 1인 하루 2L가 기준입니다. 캠핑장에 식수대가 있다면 음용수만 챙기고, 없다면 설거지용까지 고려해 더 넉넉히 준비하세요.',
    },
    {
      question: '2박 3일은 어떻게 계산하나요?',
      answer:
        '박수에 2를 넣으면 됩니다. 다만 마지막 날 아침만 먹고 철수하는 경우가 많아 실제로는 계산값보다 조금 적게 준비해도 충분한 경우가 있습니다.',
    },
    {
      question: '어린이는 어떻게 계산되나요?',
      answer:
        '성인의 0.5명분으로 환산합니다. 다만 간식과 음료는 아이들이 더 많이 먹는 경우가 있으니 별도로 챙기세요.',
    },
  ],
  relatedGuides: ['meat-per-person-guide'],
  ui: {
    adultsLabel: '성인',
    adultsUnit: '명',
    childrenLabel: '어린이',
    childrenUnit: '명',
    childrenHint: '초등학생 이하 기준',
    appetiteLabel: '식사량',
    appetiteOptions: { light: '적게', normal: '보통', heavy: '많이' },
    appetiteHint: '고기 위주면 "많이"',
    multiplierLabel: '박수',
    multiplierUnit: '박',
    multiplierHint: '1박 2일이면 1',
    itemLabels: {
      meat: '고기',
      rice: '쌀',
      ramen: '라면',
      water: '물',
      drink: '음료',
      vegetable: '쌈채소·채소',
      egg: '계란',
      kimchi: '김치',
      snack: '간식',
      charcoal: '숯',
    },
    primaryLabel: '준비할 고기',
    personsLabel: '환산 인원',
    listTitle: '준비물 목록',
    noteMain: '환산 인원 %{persons}명 기준으로 계산했습니다.',
    noteBuffer: '재료는 모자라는 것보다 조금 남는 편이 나아 올림해서 표시합니다.',
    noteBasis: '기준량은 일반적인 캠핑 준비량이며 공식 표준은 아닙니다.',
    issuePeople: '인원은 0명 이상, 합계 100명 이하로 입력해 주세요.',
    issueMultiplier: '박수는 1~30 사이로 입력해 주세요.',
  },
};
