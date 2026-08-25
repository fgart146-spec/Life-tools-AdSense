/** 면적 변환기 UI 문자열 */
export interface AreaConverterCopy {
  valueLabel: string;
  valueHint: string;
  valuePlaceholder: string;

  unitLabel: string;
  unitPyeong: string;
  unitSqm: string;
  unitSqft: string;

  ratioLabel: string;
  ratioHint: string;

  sqmLabel: string;
  pyeongLabel: string;
  sqftLabel: string;
  squareSideLabel: string;
  exclusiveLabel: string;

  /** %{sqm}, %{pyeong} */
  noteMain: string;
  /** %{sqft} */
  noteSqft: string;
  /** %{side} */
  noteSide: string;
  /** %{exclusive} */
  noteExclusive: string;
  noteBasis: string;

  issueValue: string;
  issueRatio: string;
}
