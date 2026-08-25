import type { Locale } from '@/lib/i18n/config';
import type { CategoryId } from '@/lib/tools/categories';
import type { ToolDefinition } from '@/lib/tools/types';
// 장보기·쇼핑
import { definition as bogo1plus1 } from '@/tools/bogo-1plus1/definition';
import { definition as bogo2plus1 } from '@/tools/bogo-2plus1/definition';
import { definition as bulkVsSmall } from '@/tools/bulk-vs-small/definition';
import { definition as bundlePrice } from '@/tools/bundle-price/definition';
import { definition as cardCouponPrice } from '@/tools/card-coupon-price/definition';
import { definition as comparePrice } from '@/tools/compare-price/definition';
import { definition as discountPrice } from '@/tools/discount-price/definition';
import { definition as unitPrice100g } from '@/tools/unit-price-100g/definition';
import { definition as unitPriceEach } from '@/tools/unit-price-each/definition';
import { definition as unitPriceMl } from '@/tools/unit-price-ml/definition';
// 생활비·공과금
import { definition as airconElectricity } from '@/tools/aircon-electricity/definition';
import { definition as applianceElectricity } from '@/tools/appliance-electricity/definition';
import { definition as electricityCost } from '@/tools/electricity-cost/definition';
import { definition as groceryBudget } from '@/tools/grocery-budget/definition';
import { definition as heatingCost } from '@/tools/heating-cost/definition';
import { definition as livingCost } from '@/tools/living-cost/definition';
// 가족·음식
import { definition as campingFood } from '@/tools/camping-food/definition';
import { definition as holidayFood } from '@/tools/holiday-food/definition';
import { definition as kimjangCabbage } from '@/tools/kimjang-cabbage/definition';
import { definition as kimjangSauce } from '@/tools/kimjang-sauce/definition';
import { definition as meatPerPerson } from '@/tools/meat-per-person/definition';
import { definition as ricePerPerson } from '@/tools/rice-per-person/definition';
// 직장·급여
import { definition as hourlyWage } from '@/tools/hourly-wage/definition';
import { definition as monthlySalary } from '@/tools/monthly-salary/definition';
import { definition as salaryNet } from '@/tools/salary-net/definition';
import { definition as severancePay } from '@/tools/severance-pay/definition';
import { definition as weeklyHolidayPay } from '@/tools/weekly-holiday-pay/definition';
// 사업·판매
import { definition as breakEven } from '@/tools/break-even/definition';
import { definition as costRatio } from '@/tools/cost-ratio/definition';
import { definition as margin } from '@/tools/margin/definition';
import { definition as roas } from '@/tools/roas/definition';
import { definition as targetPrice } from '@/tools/target-price/definition';
// 집·이사
import { definition as areaConverter } from '@/tools/area-converter/definition';
import { definition as movingCost } from '@/tools/moving-cost/definition';
import { definition as wallpaper } from '@/tools/wallpaper/definition';

/**
 * 모든 도구의 가벼운 정의 목록.
 * 각 도구 폴더의 definition.ts 는 데이터만 담고 있어 클라이언트 번들에 포함돼도 안전하다.
 * (본문/계산 로직/컴포넌트는 registry.ts 쪽에서만 로드한다.)
 */
export const toolDefinitions: readonly ToolDefinition[] = [
  // 장보기·쇼핑
  comparePrice,
  discountPrice,
  unitPrice100g,
  bogo1plus1,
  cardCouponPrice,
  bogo2plus1,
  unitPriceMl,
  unitPriceEach,
  bulkVsSmall,
  bundlePrice,
  // 생활비·공과금
  electricityCost,
  airconElectricity,
  livingCost,
  applianceElectricity,
  heatingCost,
  groceryBudget,
  // 가족·음식
  meatPerPerson,
  ricePerPerson,
  holidayFood,
  campingFood,
  kimjangCabbage,
  kimjangSauce,
  // 직장·급여
  salaryNet,
  monthlySalary,
  hourlyWage,
  weeklyHolidayPay,
  severancePay,
  // 사업·판매
  margin,
  targetPrice,
  breakEven,
  costRatio,
  roas,
  // 집·이사
  areaConverter,
  movingCost,
  wallpaper,
];

export function publishedTools(locale?: Locale): ToolDefinition[] {
  return toolDefinitions.filter(
    (tool) =>
      tool.status === 'published' && (locale === undefined || tool.locales.includes(locale)),
  );
}

export function toolsByCategory(category: CategoryId, locale: Locale): ToolDefinition[] {
  return publishedTools(locale)
    .filter((tool) => tool.category === category)
    .sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0));
}

export function findToolBySlug(slug: string): ToolDefinition | undefined {
  return toolDefinitions.find((tool) => tool.slug === slug);
}

export function findToolById(id: string): ToolDefinition | undefined {
  return toolDefinitions.find((tool) => tool.id === id);
}

/** 도구 URL 경로 (로케일 접두사 제외) */
export function toolPath(tool: ToolDefinition): string {
  return `/${tool.slug}`;
}
