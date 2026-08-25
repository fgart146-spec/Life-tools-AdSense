import type { MeatType } from './calc';
import type { Appetite } from '@/lib/calc/portion';

/** 고기 인원수 계산기 UI 문자열 */
export interface MeatCopy {
  adultsLabel: string;
  adultsUnit: string;
  childrenLabel: string;
  childrenUnit: string;
  childrenHint: string;

  appetiteLabel: string;
  appetiteOptions: Record<Appetite, string>;
  appetiteHint: string;

  meatTypeLabel: string;
  meatTypeOptions: Record<MeatType, string>;

  customGramLabel: string;
  customGramHint: string;

  priceLabel: string;
  priceUnit: string;
  priceHint: string;

  totalLabel: string;
  perPersonLabel: string;
  personsLabel: string;
  costLabel: string;
  costPerPersonLabel: string;

  /** %{kg}, %{gram} */
  noteTotal: string;
  /** %{perPerson} */
  notePerPerson: string;
  /** %{cost} */
  noteCost: string;
  noteBuffer: string;
  noteBasis: string;

  issuePeople: string;
  issueCustomGram: string;
  issuePrice: string;
}
