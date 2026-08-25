import type { ToolContent } from '@/lib/tools/types';
import type { KimjangSauceCopy } from './copy';

export const contentKo: ToolContent<KimjangSauceCopy> = {
  title: '김장 양념 계산기',
  seoTitle: '김장 양념 계산기 — 절임배추 kg에 맞춘 재료량',
  seoDescription:
    '절임배추 무게나 배추 포기 수를 넣으면 고춧가루·마늘·젓갈 등 김장 양념 재료를 재료별로 계산합니다.',
  lead: '절임배추 무게만 넣으면 고춧가루부터 젓갈까지 양념 재료를 한 번에 계산합니다. 매운 정도도 조절할 수 있습니다.',
  summary: '절임배추 무게에 맞춰 김장 양념 재료량을 계산합니다.',
  keywords: {
    primaryKeyword: '김장 양념 계산',
    secondaryKeywords: [
      '김장 고춧가루 양',
      '절임배추 20kg 양념',
      '김장 배추 20포기 양념',
      '김치 양념 비율',
      '김장 젓갈 양',
    ],
    searchIntent:
      '절임배추 무게(또는 포기 수)에 맞춰 고춧가루·마늘·젓갈 등 양념 재료를 얼마나 준비해야 하는지 알고 싶다.',
  },
  howItWorks: [
    '절임배추 10kg을 기준으로 정한 재료 비율에 실제 무게를 곱해 계산합니다.',
    '포기 수로 입력하면 생배추 무게(포기 수 × 포기 무게)에 절임 수율 70%를 곱해 절임배추 무게로 환산합니다.',
    '양념 세기를 조절하면 모든 재료가 같은 비율로 늘거나 줄어듭니다(연하게 0.8배, 진하게 1.2배).',
    '기준 비율은 절임배추 10kg당 고춧가루 900g, 무 2kg, 다진마늘 300g, 새우젓 300g, 멸치액젓 400ml 등입니다.',
    '집안·지역마다 비율이 다르므로 참고 기준으로 사용하고, 익숙한 레시피가 있다면 그 비율을 우선하세요.',
  ],
  formula: [
    { label: '절임배추 환산', expression: '절임배추(kg) = 포기 수 × 포기 무게 × 0.7' },
    { label: '재료별 필요량', expression: '재료량 = 10kg 기준량 × (절임배추 ÷ 10) × 양념 세기' },
  ],
  example: {
    scenario: '배추 20포기(1포기 3kg)로 김장을 합니다.',
    steps: [
      '생배추: 20 × 3 = 60kg → 절임배추: 60 × 0.7 = 42kg',
      '고춧가루: 900g × (42 ÷ 10) = 3,780g (약 3.8kg)',
      '무 8.4kg, 다진마늘 1.26kg, 멸치액젓 1.68L',
    ],
    conclusion:
      '절임배추 42kg 기준으로 고춧가루 약 3.8kg이 필요합니다. 매운 김치를 좋아한다면 "진하게"를 선택해 4.5kg 정도로 잡으세요.',
  },
  notes: [
    '고춧가루는 품종과 고운 정도에 따라 매운맛과 색이 다릅니다. 같은 양이라도 결과가 달라질 수 있습니다.',
    '젓갈은 지역차가 큽니다. 남부는 멸치액젓, 중부는 새우젓 비중이 높은 편입니다. 취향에 맞게 조절하세요.',
    '찹쌀풀은 찹쌀가루 100g에 물 1L 비율로 끓여 식힌 뒤 사용합니다.',
    '굴·생새우 등 해산물을 넣으면 김치가 빨리 익습니다. 오래 두고 먹을 김치라면 넣지 않는 편이 좋습니다.',
    '비율은 일반적인 가정 레시피 기준이며 공식 표준은 아닙니다.',
  ],
  faq: [
    {
      question: '절임배추 20kg에 고춧가루는 얼마나 넣나요?',
      answer:
        '이 계산기의 기준 비율로는 1.8kg입니다(10kg당 900g). 매운맛을 좋아하면 2kg 이상, 순한 김치를 원하면 1.5kg 정도로 조절하세요.',
    },
    {
      question: '포기 수만 알고 있는데 계산할 수 있나요?',
      answer:
        '가능합니다. 입력 방식을 "포기 수"로 바꾸고 포기 수와 1포기 무게를 넣으면 절임배추 무게로 환산해 계산합니다.',
    },
    {
      question: '양념이 남으면 어떻게 하나요?',
      answer:
        '냉동 보관했다가 겉절이나 깍두기에 사용할 수 있습니다. 다만 젓갈이 들어간 양념은 냉장 보관 기간이 짧으니 되도록 필요한 만큼만 만드세요.',
    },
    {
      question: '무는 왜 이렇게 많이 들어가나요?',
      answer:
        '채 썬 무가 양념의 수분과 단맛을 담당하기 때문입니다. 절임배추 10kg당 2kg이 일반적인 비율이며, 시원한 맛을 좋아하면 더 넣기도 합니다.',
    },
  ],
  relatedGuides: ['kimjang-guide'],
  ui: {
    modeLabel: '입력 방식',
    modeSalted: '절임배추 무게',
    modeCount: '배추 포기 수',
    saltedLabel: '절임배추 무게',
    saltedUnit: 'kg',
    saltedHint: '구매한 절임배추 기준',
    countLabel: '배추 포기 수',
    countUnit: '포기',
    countHint: '생배추 기준',
    weightLabel: '1포기 무게',
    weightUnit: 'kg',
    weightHint: '보통 2~4kg',
    strengthLabel: '양념 세기',
    strengthMild: '연하게',
    strengthNormal: '보통',
    strengthStrong: '진하게',
    strengthHint: '모든 재료가 같은 비율로 조절됩니다.',
    primaryLabel: '고춧가루',
    saltedResultLabel: '절임배추',
    listTitle: '양념 재료',
    itemLabels: {
      chili: '고춧가루',
      radish: '무 (채썰기)',
      garlic: '다진 마늘',
      ginger: '다진 생강',
      saeujeot: '새우젓',
      fishSauce: '멸치액젓',
      glutinousFlour: '찹쌀가루 (풀용)',
      sugar: '설탕',
      greenOnion: '쪽파',
      mustardLeaf: '갓',
      waterParsley: '미나리',
    },
    noteChili: '고춧가루는 약 %{chili}이 필요합니다.',
    noteSalted: '절임배추 %{salted}kg 기준으로 계산했습니다.',
    noteTaste: '지역과 집안마다 비율이 다르니 익숙한 레시피가 있다면 그쪽을 우선하세요.',
    noteBasis: '절임배추 10kg당 고춧가루 900g 비율을 기준으로 합니다.',
    issueSalted: '절임배추 무게는 0보다 크게 입력해 주세요.',
    issueCount: '배추 포기 수는 1포기 이상으로 입력해 주세요.',
    issueWeight: '1포기 무게는 0보다 크고 10kg 이하로 입력해 주세요.',
  },
};
