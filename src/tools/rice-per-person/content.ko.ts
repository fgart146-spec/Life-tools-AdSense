import type { ToolContent } from '@/lib/tools/types';
import type { RiceCopy } from './copy';

export const contentKo: ToolContent<RiceCopy> = {
  title: '쌀·밥 인원수 계산기',
  seoTitle: '쌀 양 계산기 — 몇 인분이면 쌀 몇 g, 물은 얼마나',
  seoDescription:
    '인원과 끼니 수를 넣으면 필요한 쌀 양(g·컵)과 밥물 양을 계산합니다. 손님 초대나 캠핑 준비에 활용하세요.',
  lead: '몇 명이 몇 끼를 먹을지 넣으면 필요한 쌀 양과 밥물을 계산합니다. 밥솥 계량컵 기준으로도 알려드립니다.',
  summary: '인원과 끼니 수로 필요한 쌀 양과 밥물을 계산합니다.',
  keywords: {
    primaryKeyword: '쌀 양 계산기',
    secondaryKeywords: [
      '밥 몇 인분 쌀',
      '쌀 1인분 몇 g',
      '밥물 양 계산',
      '10인분 쌀',
      '밥솥 계량컵 쌀',
    ],
    searchIntent:
      '여러 명이 먹을 밥을 지을 때 쌀을 얼마나 씻어야 하고 물은 얼마나 넣어야 하는지 알고 싶다.',
  },
  howItWorks: [
    '밥 1공기(약 210g)를 짓는 데 필요한 백미를 90g으로 잡습니다.',
    '환산 인원 = (성인 + 어린이 × 0.5) × 식사량 계수이며, 여기에 끼니 수와 1끼당 공기 수를 곱해 총 공기 수를 구합니다.',
    '총 공기 수 × 90g으로 필요한 쌀 양을 계산하고, 밥솥 계량컵(180ml, 약 150g) 기준 컵 수로도 환산합니다.',
    '백미 기준 밥물은 쌀 무게의 약 1.2배(ml)로 계산합니다. 쌀 종류와 취향에 따라 조절하세요.',
    '기준값은 일반 가정 기준이며 공식 표준은 아닙니다.',
  ],
  formula: [
    { label: '총 공기 수', expression: '총 공기 = 환산 인원 × 끼니 수 × 1끼당 공기 수' },
    { label: '필요한 쌀', expression: '쌀(g) = 총 공기 수 × 90g' },
    { label: '계량컵 환산', expression: '컵 수 = 쌀(g) ÷ 150g' },
    { label: '밥물', expression: '물(ml) = 쌀(g) × 1.2' },
  ],
  example: {
    scenario: '성인 6명이 한 끼를 먹습니다. 1인 1공기 기준입니다.',
    steps: [
      '총 공기 수: 6 × 1 × 1 = 6공기',
      '필요한 쌀: 6 × 90 = 540g',
      '계량컵: 540 ÷ 150 = 약 3.6컵, 물은 540 × 1.2 = 약 648ml',
    ],
    conclusion:
      '쌀 약 540g(3.6컵)과 물 약 648ml를 준비하면 됩니다. 밥을 남기고 싶다면 1인 1.2공기로 계산하세요.',
  },
  notes: [
    '현미·잡곡은 물을 더 넣어야 합니다. 보통 백미보다 20~30% 정도 더 잡습니다.',
    '묵은쌀은 수분이 적어 물을 조금 더, 햅쌀은 수분이 많아 물을 조금 덜 넣습니다.',
    '밥솥 종류에 따라 눈금이 다릅니다. 밥솥 눈금이 있으면 그 기준을 우선하세요.',
    '국밥·비빔밥처럼 밥을 많이 쓰는 메뉴는 1인 1.5공기로 잡는 편이 안전합니다.',
  ],
  faq: [
    {
      question: '쌀 1인분은 몇 g인가요?',
      answer:
        '밥 1공기 기준으로 백미 약 90g입니다. 밥으로는 약 210g이 됩니다. 많이 먹는 편이라면 100~120g으로 잡으세요.',
    },
    {
      question: '밥솥 계량컵 1컵은 몇 g인가요?',
      answer:
        '전기밥솥에 들어 있는 계량컵은 180ml로, 백미 기준 약 150g입니다. 일반 계량컵(200ml)은 약 160~165g이므로 컵 종류를 확인하세요.',
    },
    {
      question: '물은 얼마나 넣어야 하나요?',
      answer:
        '백미는 쌀 무게의 약 1.2배(ml)가 기본입니다. 쌀 540g이면 물 648ml 정도입니다. 진밥을 좋아하면 조금 더, 고슬고슬한 밥을 좋아하면 조금 덜 넣으세요.',
    },
    {
      question: '캠핑에서 코펠로 밥을 지을 때도 같나요?',
      answer:
        '쌀 양은 같지만 물은 조금 더(1.3배 정도) 넣는 편이 안전합니다. 화력 조절이 어려워 수분이 빨리 날아가기 때문입니다.',
    },
  ],
  relatedGuides: ['meat-per-person-guide'],
  ui: {
    adultsLabel: '성인',
    adultsUnit: '명',
    childrenLabel: '어린이',
    childrenUnit: '명',
    childrenHint: '초등학생 이하 기준',
    mealsLabel: '끼니 수',
    mealsUnit: '끼',
    mealsHint: '한 번에 지을 끼니 수',
    bowlsLabel: '1끼당 공기 수',
    bowlsUnit: '공기',
    bowlsHint: '많이 먹으면 1.5',
    appetiteLabel: '식사량',
    appetiteOptions: {
      light: '적게',
      normal: '보통',
      heavy: '많이',
    },
    riceLabel: '필요한 쌀',
    cupsLabel: '밥솥 계량컵',
    waterLabel: '밥물',
    bowlsResultLabel: '총 공기 수',
    cookedLabel: '완성된 밥 무게',
    personsLabel: '환산 인원',
    noteRice: '쌀 약 %{gram}g(%{kg}kg)이 필요합니다.',
    noteCups: '밥솥 계량컵으로 약 %{cups}컵, 물은 약 %{water}ml입니다.',
    noteBowls: '밥 약 %{bowls}공기가 나옵니다.',
    noteWater: '현미·잡곡은 물을 20~30% 더 넣으세요.',
    noteBasis: '밥 1공기 210g, 백미 90g 기준으로 계산했습니다.',
    issuePeople: '인원은 0명 이상, 합계 100명 이하로 입력해 주세요.',
    issueMeals: '끼니 수는 1~30 사이로 입력해 주세요.',
    issueBowls: '1끼당 공기 수는 0보다 크고 5 이하로 입력해 주세요.',
  },
};
