/**
 * 도구 → 기준 조견표 매핑.
 *
 * 한국 제도(전기요금 누진제·4대보험·최저임금)에 종속된 계산기에만 붙는다.
 * 표는 계산기와 같은 계산 함수로 빌드 시점에 생성되므로 요율이 바뀌면 함께 바뀐다.
 */
export type ReferenceTableKind = 'electricity' | 'salary' | 'wage';

const TOOL_REFERENCE_TABLE: Record<string, ReferenceTableKind> = {
  // 전기요금 누진 구간이 결과를 좌우하는 계산기
  'electricity-cost': 'electricity',
  'aircon-electricity': 'electricity',
  'appliance-electricity': 'electricity',
  'heating-cost': 'electricity',
  // 4대보험·소득세 공제가 결과를 좌우하는 계산기
  'salary-net': 'salary',
  'monthly-salary': 'salary',
  // 최저임금·주휴수당 기준이 결과를 좌우하는 계산기
  'hourly-wage': 'wage',
  'weekly-holiday-pay': 'wage',
};

export function referenceTableFor(toolId: string): ReferenceTableKind | null {
  return TOOL_REFERENCE_TABLE[toolId] ?? null;
}
