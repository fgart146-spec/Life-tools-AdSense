import type { ToolContent } from '@/lib/tools/types';
import type { FoodListCopy } from '@/lib/tools/shared/food-list-copy';

export const contentKo: ToolContent<FoodListCopy> = {
  title: '명절·가족모임 음식량 계산기',
  seoTitle: '명절 음식량 계산기 — 몇 인분이면 재료 얼마나',
  seoDescription:
    '가족 인원을 넣으면 갈비·전·나물·잡채·과일 등 명절 상차림 재료를 목록으로 계산합니다. 장보기 전에 확인하세요.',
  lead: '모이는 인원만 넣으면 갈비·전·나물·잡채·떡·과일까지 준비할 양을 목록으로 알려드립니다.',
  summary: '인원수에 맞는 명절 상차림 재료량을 계산합니다.',
  keywords: {
    primaryKeyword: '명절 음식 몇 인분',
    secondaryKeywords: [
      '명절 음식량 계산',
      '차례상 재료 양',
      '가족모임 음식 준비',
      '전 부침가루 양',
      '갈비 인원수',
    ],
    searchIntent:
      '명절이나 가족모임에서 인원수에 맞게 재료를 얼마나 사야 하는지 알고 싶다.',
  },
  howItWorks: [
    '환산 인원 = (성인 + 어린이 × 0.5) × 식사량 계수로 계산합니다.',
    '한 상차림 기준 1인 준비량에 환산 인원을 곱해 재료별 필요량을 구합니다.',
    '전통적인 구성(갈비·전·나물·잡채·떡·과일)을 기준으로 하며, 차리지 않는 메뉴는 무시하면 됩니다.',
    '한 번에 여러 끼를 준비한다면 인원을 늘려 잡거나 결과에 배수를 곱해 사용하세요.',
    '재료는 올림해서 표시하므로 조금 여유가 있습니다.',
  ],
  formula: [
    { label: '환산 인원', expression: '(성인 + 어린이 × 0.5) × 식사량 계수' },
    { label: '재료별 필요량', expression: '1인 기준량 × 환산 인원' },
  ],
  example: {
    scenario: '성인 6명, 어린이 3명이 모입니다.',
    steps: [
      '환산 인원: 6 + 3 × 0.5 = 7.5명분',
      '갈비: 250g × 7.5 = 1,875g → 약 1.9kg',
      '부침가루: 100g × 7.5 = 750g, 계란 15개',
    ],
    conclusion:
      '갈비 약 1.9kg, 부침가루 750g, 계란 15개 정도가 기준입니다. 남은 음식을 나눠 갈 계획이라면 1.2배 정도 넉넉히 준비하세요.',
  },
  notes: [
    '명절 음식은 남기는 것을 전제로 준비하는 경우가 많습니다. 나눠 가실 계획이라면 계산값의 1.2~1.5배로 잡으세요.',
    '갈비는 뼈 무게가 포함되어 있어 살코기 기준보다 많이 필요합니다. 이 계산은 뼈 포함 무게 기준입니다.',
    '전은 종류별로 나눠 준비하면 부침가루와 계란 소비가 늘어납니다. 3종 이상 부치면 20% 정도 여유를 두세요.',
    '식용유는 전을 부치는 양에 비례합니다. 팬 크기와 부치는 횟수에 따라 편차가 큽니다.',
    '기준량은 일반적인 가정 상차림 기준이며 지역·집안마다 다릅니다.',
  ],
  faq: [
    {
      question: '차례상 규모는 어떻게 반영하나요?',
      answer:
        '식사량 선택으로 조절하세요. 간소하게 차린다면 "적게", 손님이 많고 나눠 갈 음식까지 준비한다면 "많이"를 고르면 20~25% 차이가 납니다.',
    },
    {
      question: '전은 몇 종류를 부치는 게 보통인가요?',
      answer:
        '동태전·동그랑땡·호박전·산적 정도로 3~4종을 부치는 경우가 많습니다. 종류가 늘수록 부침가루와 계란, 식용유가 더 필요하니 20% 정도 여유를 두세요.',
    },
    {
      question: '남은 음식이 너무 많습니다.',
      answer:
        '실제로 먹는 양은 계산값보다 적은 경우가 많습니다. 전은 냉동 보관이 가능하지만 나물은 오래 두기 어려우므로, 나물류부터 줄여 잡는 것을 권합니다.',
    },
    {
      question: '비용도 계산할 수 있나요?',
      answer:
        '이 계산기는 재료량만 계산합니다. 품목별 가격 비교가 필요하면 100g당 가격 계산기나 뭐가 더 싼지 비교 계산기를 함께 사용하세요.',
    },
  ],
  relatedGuides: ['meat-per-person-guide'],
  ui: {
    adultsLabel: '성인',
    adultsUnit: '명',
    childrenLabel: '어린이',
    childrenUnit: '명',
    childrenHint: '초등학생 이하 기준',
    appetiteLabel: '상차림 규모',
    appetiteOptions: { light: '간소하게', normal: '보통', heavy: '푸짐하게' },
    appetiteHint: '나눠 갈 음식까지 준비하면 "푸짐하게"',
    multiplierLabel: '',
    multiplierUnit: '',
    multiplierHint: '',
    itemLabels: {
      galbi: '갈비·불고기',
      jeonFlour: '부침가루',
      egg: '계란',
      fish: '전용 생선',
      namul: '나물 (합계)',
      japchae: '잡채용 당면',
      soupMeat: '국거리 고기',
      tteok: '떡 (송편·떡국떡)',
      fruit: '과일',
      oil: '식용유',
    },
    primaryLabel: '갈비·불고기',
    personsLabel: '환산 인원',
    listTitle: '재료 목록',
    noteMain: '환산 인원 %{persons}명 기준으로 계산했습니다.',
    noteBuffer: '나눠 갈 음식까지 준비한다면 1.2배 정도 여유를 두세요.',
    noteBasis: '기준량은 일반적인 가정 상차림 기준이며 집안마다 다릅니다.',
    issuePeople: '인원은 0명 이상, 합계 100명 이하로 입력해 주세요.',
    issueMultiplier: '값을 다시 확인해 주세요.',
  },
};
