/** 시급 계산기 UI 문자열 */
export interface HourlyWageCopy {
  modeLabel: string;
  modeToHourly: string;
  modeToMonthly: string;

  amountLabelMonthly: string;
  amountLabelHourly: string;
  amountUnit: string;
  amountHint: string;

  weeklyHoursLabel: string;
  weeklyHoursUnit: string;
  weeklyHoursHint: string;

  includeHolidayLabel: string;
  includeHolidayHint: string;

  hourlyLabel: string;
  monthlyLabel: string;
  dailyLabel: string;
  weeklyLabel: string;
  annualLabel: string;
  monthlyHoursLabel: string;
  minimumRatioLabel: string;

  /** %{hourly} */
  noteHourly: string;
  /** %{monthly} */
  noteMonthly: string;
  /** %{hours} */
  noteHours: string;
  /** %{ratio}, %{minimum} */
  noteMinimum: string;
  noteBelowMinimum: string;
  noteBasis: string;

  issueAmount: string;
  issueHours: string;
}
