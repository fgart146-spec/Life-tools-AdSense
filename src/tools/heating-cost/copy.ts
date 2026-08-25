/** 난방비 계산기 UI 문자열 */
export interface HeatingCostCopy {
  typeLabel: string;
  typeGas: string;
  typeDistrict: string;
  typeElectric: string;
  typeHint: string;

  usageLabel: string;
  usageHint: string;
  unitGas: string;
  unitDistrict: string;
  unitElectric: string;

  unitRateLabel: string;
  unitRateHint: string;
  rateUnitGas: string;
  rateUnitDistrict: string;
  rateUnitElectric: string;

  heatValueLabel: string;
  heatValueHint: string;

  baseChargeLabel: string;
  baseChargeHint: string;
  daysLabel: string;
  daysUnit: string;
  vatLabel: string;
  vatHint: string;

  totalLabel: string;
  energyChargeLabel: string;
  baseChargeRowLabel: string;
  vatRowLabel: string;
  perDayLabel: string;
  totalMjLabel: string;

  /** %{total} */
  noteTotal: string;
  /** %{perDay} */
  notePerDay: string;
  noteRate: string;
  noteElectric: string;
  noteEstimate: string;

  issueUsage: string;
  issueUnitRate: string;
  issueHeatValue: string;
  issueBaseCharge: string;
  issueDays: string;
}
