/**
 * 생활백과 시즌 추천.
 *
 * 명세 36장: 추천 목록만 계절에 따라 바뀌고, 페이지 URL은 절대 바뀌지 않는다.
 * 데이터가 아니라 노출 순서만 다루므로 DB 없이 코드로 관리한다.
 */
const SEASONAL_BY_MONTH: Record<number, readonly string[]> = {
  1: ['bathroom-mold', 'seasonal-clothes-storage', 'drum-washer-cleaning'],
  2: ['bathroom-mold', 'seasonal-clothes-storage', 'washing-machine-smell'],
  3: ['seasonal-clothes-storage', 'sneaker-washing', 'white-clothes-yellowing'],
  4: ['sneaker-washing', 'white-clothes-yellowing', 'airfryer-cleaning'],
  5: ['towel-smell', 'white-clothes-yellowing', 'drain-smell'],
  // 장마·여름: 습기와 냄새 문제가 몰린다
  6: ['towel-smell', 'bathroom-mold', 'washing-machine-smell'],
  7: ['towel-smell', 'washing-machine-smell', 'bathroom-mold'],
  8: ['towel-smell', 'drain-smell', 'bathroom-mold'],
  9: ['seasonal-clothes-storage', 'drum-washer-cleaning', 'oil-stain-clothes'],
  10: ['seasonal-clothes-storage', 'burnt-pot', 'airfryer-cleaning'],
  // 김장·연말: 얼룩과 주방 문제가 늘어난다
  11: ['kimchi-stain', 'oil-stain-clothes', 'burnt-pot'],
  12: ['kimchi-stain', 'oil-stain-clothes', 'seasonal-clothes-storage'],
};

/** 해당 월의 추천 문서 slug. 없으면 빈 배열(허브가 인기 문서로 대체한다). */
export function seasonalLifeSlugs(month: number): readonly string[] {
  return SEASONAL_BY_MONTH[month] ?? [];
}
