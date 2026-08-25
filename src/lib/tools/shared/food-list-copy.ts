import type { Appetite } from '@/lib/calc/portion';

/** 재료 목록형 계산기(캠핑·명절 등)가 공유하는 UI 문자열 */
export interface FoodListCopy {
  adultsLabel: string;
  adultsUnit: string;
  childrenLabel: string;
  childrenUnit: string;
  childrenHint: string;

  appetiteLabel: string;
  appetiteOptions: Record<Appetite, string>;
  appetiteHint: string;

  /** 박수·끼니 수 등 배수 입력 (없으면 숨김) */
  multiplierLabel: string;
  multiplierUnit: string;
  multiplierHint: string;

  /** 재료 키 → 라벨 */
  itemLabels: Record<string, string>;

  primaryLabel: string;
  personsLabel: string;
  listTitle: string;

  /** %{persons} */
  noteMain: string;
  noteBuffer: string;
  noteBasis: string;

  issuePeople: string;
  issueMultiplier: string;
}
