import type { Appetite } from '@/lib/calc/portion';

/** 쌀·밥 인원수 계산기 UI 문자열 */
export interface RiceCopy {
  adultsLabel: string;
  adultsUnit: string;
  childrenLabel: string;
  childrenUnit: string;
  childrenHint: string;

  mealsLabel: string;
  mealsUnit: string;
  mealsHint: string;

  bowlsLabel: string;
  bowlsUnit: string;
  bowlsHint: string;

  appetiteLabel: string;
  appetiteOptions: Record<Appetite, string>;

  riceLabel: string;
  cupsLabel: string;
  waterLabel: string;
  bowlsResultLabel: string;
  cookedLabel: string;
  personsLabel: string;

  /** %{kg}, %{gram} */
  noteRice: string;
  /** %{cups}, %{water} */
  noteCups: string;
  /** %{bowls} */
  noteBowls: string;
  noteWater: string;
  noteBasis: string;

  issuePeople: string;
  issueMeals: string;
  issueBowls: string;
}
