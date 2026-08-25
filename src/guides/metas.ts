import type { GuideMeta } from '@/lib/guides/types';
import { meta as unitPriceBasics } from '@/guides/unit-price-basics/meta';
import { meta as bulkNotAlwaysCheaper } from '@/guides/bulk-not-always-cheaper/meta';
import { meta as bogoRealDiscount } from '@/guides/bogo-real-discount/meta';
import { meta as couponAndCardDiscount } from '@/guides/coupon-and-card-discount/meta';
import { meta as electricityBillBasics } from '@/guides/electricity-bill-basics/meta';
import { meta as airconCostGuide } from '@/guides/aircon-cost-guide/meta';
import { meta as familyBudgetBasics } from '@/guides/family-budget-basics/meta';
import { meta as meatPerPersonGuide } from '@/guides/meat-per-person-guide/meta';
import { meta as kimjangGuide } from '@/guides/kimjang-guide/meta';
import { meta as salaryNetGuide } from '@/guides/salary-net-guide/meta';
import { meta as weeklyHolidayPayGuide } from '@/guides/weekly-holiday-pay-guide/meta';
import { meta as marginBasics } from '@/guides/margin-basics/meta';
import { meta as pricingGuide } from '@/guides/pricing-guide/meta';
import { meta as breakEvenGuide } from '@/guides/break-even-guide/meta';
import { meta as roasGuide } from '@/guides/roas-guide/meta';

/**
 * 가이드 메타데이터 목록 (가벼움 · 클라이언트 안전).
 * 본문 모듈은 index.ts 쪽에서만 로드한다.
 */
export const guideMetas: readonly GuideMeta[] = [
  unitPriceBasics,
  bulkNotAlwaysCheaper,
  bogoRealDiscount,
  couponAndCardDiscount,
  electricityBillBasics,
  airconCostGuide,
  familyBudgetBasics,
  meatPerPersonGuide,
  kimjangGuide,
  salaryNetGuide,
  weeklyHolidayPayGuide,
  marginBasics,
  pricingGuide,
  breakEvenGuide,
  roasGuide,
];
