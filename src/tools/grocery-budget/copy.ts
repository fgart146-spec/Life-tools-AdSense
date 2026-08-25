/** 월 장보기 예산 계산기 UI 문자열 */
export interface GroceryBudgetCopy {
  membersLabel: string;
  membersUnit: string;

  groceryTitle: string;
  groceryTimesLabel: string;
  groceryTimesUnit: string;
  groceryAmountLabel: string;
  groceryAmountHint: string;

  diningTitle: string;
  diningTimesLabel: string;
  diningAmountLabel: string;
  diningAmountHint: string;

  deliveryTitle: string;
  deliveryTimesLabel: string;
  deliveryAmountLabel: string;

  targetLabel: string;
  targetHint: string;

  totalLabel: string;
  groceryMonthlyLabel: string;
  diningMonthlyLabel: string;
  deliveryMonthlyLabel: string;
  perPersonLabel: string;
  perDayLabel: string;
  perPersonPerDayLabel: string;
  eatingOutShareLabel: string;
  targetDiffLabel: string;

  /** %{total} */
  noteTotal: string;
  /** %{perPerson}, %{perPersonPerDay} */
  notePerPerson: string;
  /** %{share} */
  noteEatingOut: string;
  /** %{over} */
  noteOverBudget: string;
  /** %{under} */
  noteUnderBudget: string;
  noteTip: string;

  issueMembers: string;
  issueTimes: string;
  issueAmount: string;
  issueTarget: string;
}
