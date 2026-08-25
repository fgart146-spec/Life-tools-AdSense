/** 김장 양념 계산기 UI 문자열 */
export interface KimjangSauceCopy {
  modeLabel: string;
  modeSalted: string;
  modeCount: string;

  saltedLabel: string;
  saltedUnit: string;
  saltedHint: string;

  countLabel: string;
  countUnit: string;
  countHint: string;

  weightLabel: string;
  weightUnit: string;
  weightHint: string;

  strengthLabel: string;
  strengthMild: string;
  strengthNormal: string;
  strengthStrong: string;
  strengthHint: string;

  primaryLabel: string;
  saltedResultLabel: string;
  listTitle: string;
  itemLabels: Record<string, string>;

  /** %{chili} */
  noteChili: string;
  /** %{salted} */
  noteSalted: string;
  noteTaste: string;
  noteBasis: string;

  issueSalted: string;
  issueCount: string;
  issueWeight: string;
}
