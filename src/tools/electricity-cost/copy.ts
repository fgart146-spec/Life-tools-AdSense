/** 전기요금 예상 계산기 UI 문자열 */
export interface ElectricityCostCopy {
  usageLabel: string;
  usageUnit: string;
  usageHint: string;
  usagePlaceholder: string;

  contractLabel: string;
  contractLow: string;
  contractHigh: string;
  contractHint: string;

  monthLabel: string;
  monthUnit: string;
  monthHint: string;

  totalLabel: string;
  baseChargeLabel: string;
  energyChargeLabel: string;
  climateLabel: string;
  fuelLabel: string;
  subtotalLabel: string;
  vatLabel: string;
  fundLabel: string;
  unitPriceLabel: string;
  tierTitle: string;
  /** %{from}~%{to}kWh */
  tierRangeLabel: string;
  /** %{from}kWh 초과 */
  tierRangeLastLabel: string;

  /** %{total} */
  noteTotal: string;
  /** %{unitPrice} */
  noteUnitPrice: string;
  noteSummer: string;
  noteProgressive: string;
  noteEstimate: string;

  issueUsage: string;
  issueMonth: string;
}
