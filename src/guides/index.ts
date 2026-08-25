import type { GuideModule } from '@/lib/guides/types';
import { unitPriceBasicsGuide } from '@/guides/unit-price-basics';
import { bulkNotAlwaysCheaperGuide } from '@/guides/bulk-not-always-cheaper';
import { bogoRealDiscountGuide } from '@/guides/bogo-real-discount';
import { couponAndCardDiscountGuide } from '@/guides/coupon-and-card-discount';
import { electricityBillBasicsGuide } from '@/guides/electricity-bill-basics';
import { airconCostGuide } from '@/guides/aircon-cost-guide';
import { familyBudgetBasicsGuide } from '@/guides/family-budget-basics';
import { meatPerPersonGuide } from '@/guides/meat-per-person-guide';
import { kimjangGuide } from '@/guides/kimjang-guide';
import { salaryNetGuide } from '@/guides/salary-net-guide';
import { weeklyHolidayPayGuide } from '@/guides/weekly-holiday-pay-guide';
import { marginBasicsGuide } from '@/guides/margin-basics';
import { pricingGuide } from '@/guides/pricing-guide';
import { breakEvenGuide } from '@/guides/break-even-guide';
import { roasGuide } from '@/guides/roas-guide';

/** 모든 가이드 모듈 (서버 전용) */
export const guideModules: readonly GuideModule[] = [
  unitPriceBasicsGuide,
  bulkNotAlwaysCheaperGuide,
  bogoRealDiscountGuide,
  couponAndCardDiscountGuide,
  electricityBillBasicsGuide,
  airconCostGuide,
  familyBudgetBasicsGuide,
  meatPerPersonGuide,
  kimjangGuide,
  salaryNetGuide,
  weeklyHolidayPayGuide,
  marginBasicsGuide,
  pricingGuide,
  breakEvenGuide,
  roasGuide,
];
