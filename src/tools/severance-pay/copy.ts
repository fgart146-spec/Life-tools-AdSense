/** 퇴직금 계산기 UI 문자열 */
export interface SeverancePayCopy {
  startDateLabel: string;
  startDateHint: string;
  endDateLabel: string;
  endDateHint: string;

  recentPayLabel: string;
  recentPayUnit: string;
  recentPayHint: string;
  recentPayPlaceholder: string;

  bonusLabel: string;
  bonusHint: string;
  leavePayLabel: string;
  leavePayHint: string;

  severanceLabel: string;
  workedDaysLabel: string;
  workedYearsLabel: string;
  dailyWageLabel: string;
  averageDaysLabel: string;

  /** %{severance} */
  noteSeverance: string;
  /** %{years}, %{days} */
  notePeriod: string;
  /** %{daily} */
  noteDaily: string;
  noteNotEligible: string;
  noteOrdinaryWage: string;
  noteTax: string;

  issueDates: string;
  issuePeriod: string;
  issuePay: string;
}
