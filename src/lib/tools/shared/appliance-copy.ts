/** 가전 전기료 계산기(에어컨/일반 가전)가 공유하는 UI 문자열 */
export interface AppliancePreset {
  label: string;
  /** 소비전력 (W) */
  watt: number;
}

export interface ApplianceElectricityCopy {
  presetLabel: string;
  presetCustom: string;
  presets: AppliancePreset[];

  wattLabel: string;
  wattUnit: string;
  wattHint: string;
  wattPlaceholder: string;

  hoursLabel: string;
  hoursUnit: string;
  hoursHint: string;

  daysLabel: string;
  daysUnit: string;
  daysHint: string;

  baseUsageLabel: string;
  baseUsageUnit: string;
  baseUsageHint: string;

  contractLabel: string;
  contractLow: string;
  contractHigh: string;

  monthLabel: string;
  monthUnit: string;
  monthHint: string;

  addedCostLabel: string;
  addedUsageLabel: string;
  perDayLabel: string;
  totalBillLabel: string;

  /** %{cost} */
  noteMain: string;
  /** %{usage} */
  noteUsage: string;
  /** %{perDay} */
  notePerDay: string;
  noteProgressive: string;
  noteEstimate: string;

  issueWatt: string;
  issueHours: string;
  issueDays: string;
  issueBaseUsage: string;
}
