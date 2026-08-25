/**
 * 용량 단가 계산기(100g당 / 100ml당 등)가 공유하는 UI 문자열 타입.
 * 도구마다 표현은 다르지만 입력/결과 구조가 같아 컴포넌트를 공유한다.
 */
export interface UnitPriceToolCopy {
  priceLabel: string;
  priceUnit: string;
  priceHint: string;
  pricePlaceholder: string;

  amountLabel: string;
  amountHint: string;
  amountPlaceholder: string;

  unitLabel: string;
  /** 작은 단위 (g, ml) */
  unitSmall: string;
  /** 큰 단위 (kg, L) */
  unitLarge: string;

  quantityLabel: string;
  quantityUnit: string;
  quantityHint: string;

  /** 대표 결과 라벨 (예: 100g당 가격) */
  primaryLabel: string;
  /** 보조 결과 라벨 (예: 1kg당 가격) */
  secondaryLabel: string;
  perItemLabel: string;
  totalLabel: string;

  /** %{primary} */
  noteMain: string;
  /** %{secondary} */
  noteSecondary: string;
  /** %{quantity}, %{perItem} */
  noteQuantity: string;
  noteCompare: string;

  issuePrice: string;
  issueAmount: string;
  issueQuantity: string;
}
