import type { MovingType } from './calc';

/** 이사비용 예산 계산기 UI 문자열 */
export interface MovingCostCopy {
  typeLabel: string;
  typeOptions: Record<MovingType, string>;
  typeHint: string;

  pyeongLabel: string;
  pyeongUnit: string;
  pyeongHint: string;

  distanceLabel: string;
  distanceUnit: string;
  distanceHint: string;

  airconLabel: string;
  airconUnit: string;
  airconHint: string;

  ladderLabel: string;
  ladderHint: string;
  cleaningLabel: string;
  cleaningHint: string;
  premiumLabel: string;
  premiumHint: string;

  totalLabel: string;
  rangeLabel: string;
  baseCostLabel: string;
  distanceCostLabel: string;
  ladderCostLabel: string;
  airconCostLabel: string;
  cleaningCostLabel: string;
  premiumCostLabel: string;

  /** %{total} */
  noteTotal: string;
  /** %{min}, %{max} */
  noteRange: string;
  notePremium: string;
  noteQuote: string;
  noteBasis: string;

  issuePyeong: string;
  issueDistance: string;
  issueAircon: string;
}
