/** 주휴수당 계산기 UI 문자열 */
export interface HolidayPayCopy {
  hourlyLabel: string;
  hourlyUnit: string;
  hourlyHint: string;
  hourlyPlaceholder: string;

  weeklyHoursLabel: string;
  weeklyHoursUnit: string;
  weeklyHoursHint: string;

  weeklyAmountLabel: string;
  holidayHoursLabel: string;
  weeklyWorkPayLabel: string;
  weeklyTotalLabel: string;
  monthlyAmountLabel: string;

  /** %{amount} */
  noteAmount: string;
  /** %{hours} */
  noteHours: string;
  /** %{monthly} */
  noteMonthly: string;
  noteNotEligible: string;
  noteCondition: string;

  issueHourly: string;
  issueHours: string;
}
