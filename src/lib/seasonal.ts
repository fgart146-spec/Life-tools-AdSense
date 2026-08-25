/**
 * 시즌 추천. 메인 화면 '이번 달 추천' 구성을 날짜로 결정한다.
 * - 빌드/ISR 재생성 시점 기준으로 계산된다(페이지뷰마다 서버 연산이 발생하지 않는다).
 * - 존재하지 않거나 비공개인 도구 id는 화면에서 자동으로 걸러진다.
 * - PHASE 8에서 관리자 화면으로 이 구성을 덮어쓸 수 있게 확장한다.
 */
export interface SeasonalRule {
  /** 1~12 */
  months: readonly number[];
  toolIds: readonly string[];
}

export const seasonalRules: readonly SeasonalRule[] = [
  {
    months: [1, 2],
    toolIds: ['holiday-food', 'heating-cost', 'appliance-electricity', 'living-cost'],
  },
  { months: [3], toolIds: ['moving-cost', 'living-cost', 'area-converter', 'wallpaper'] },
  { months: [4], toolIds: ['grocery-budget', 'living-cost', 'compare-price'] },
  { months: [5], toolIds: ['living-cost', 'grocery-budget', 'meat-per-person'] },
  {
    months: [6, 7, 8],
    toolIds: ['aircon-electricity', 'electricity-cost', 'camping-food', 'appliance-electricity'],
  },
  { months: [9, 10], toolIds: ['holiday-food', 'meat-per-person', 'grocery-budget'] },
  { months: [11], toolIds: ['kimjang-cabbage', 'kimjang-sauce', 'heating-cost'] },
  { months: [12], toolIds: ['heating-cost', 'living-cost', 'appliance-electricity'] },
];

export function seasonalToolIds(date: Date = new Date()): readonly string[] {
  const month = date.getMonth() + 1;
  const rule = seasonalRules.find((candidate) => candidate.months.includes(month));
  return rule?.toolIds ?? [];
}
