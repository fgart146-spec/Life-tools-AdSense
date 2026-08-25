import type { Locale } from '@/lib/i18n/config';
import type { CategoryId } from '@/lib/tools/categories';
import { toolDefinitions } from '@/lib/tools/definitions';
import type { ToolContent, ToolDefinition, ToolModule } from '@/lib/tools/types';
import { airconElectricityTool } from '@/tools/aircon-electricity';
import { applianceElectricityTool } from '@/tools/appliance-electricity';
import { areaConverterTool } from '@/tools/area-converter';
import { bogo1plus1Tool } from '@/tools/bogo-1plus1';
import { bogo2plus1Tool } from '@/tools/bogo-2plus1';
import { breakEvenTool } from '@/tools/break-even';
import { bulkVsSmallTool } from '@/tools/bulk-vs-small';
import { bundlePriceTool } from '@/tools/bundle-price';
import { campingFoodTool } from '@/tools/camping-food';
import { cardCouponPriceTool } from '@/tools/card-coupon-price';
import { comparePriceTool } from '@/tools/compare-price';
import { costRatioTool } from '@/tools/cost-ratio';
import { discountPriceTool } from '@/tools/discount-price';
import { electricityCostTool } from '@/tools/electricity-cost';
import { groceryBudgetTool } from '@/tools/grocery-budget';
import { heatingCostTool } from '@/tools/heating-cost';
import { holidayFoodTool } from '@/tools/holiday-food';
import { hourlyWageTool } from '@/tools/hourly-wage';
import { kimjangCabbageTool } from '@/tools/kimjang-cabbage';
import { kimjangSauceTool } from '@/tools/kimjang-sauce';
import { livingCostTool } from '@/tools/living-cost';
import { marginTool } from '@/tools/margin';
import { meatPerPersonTool } from '@/tools/meat-per-person';
import { monthlySalaryTool } from '@/tools/monthly-salary';
import { movingCostTool } from '@/tools/moving-cost';
import { ricePerPersonTool } from '@/tools/rice-per-person';
import { roasTool } from '@/tools/roas';
import { salaryNetTool } from '@/tools/salary-net';
import { severancePayTool } from '@/tools/severance-pay';
import { targetPriceTool } from '@/tools/target-price';
import { unitPrice100gTool } from '@/tools/unit-price-100g';
import { unitPriceEachTool } from '@/tools/unit-price-each';
import { unitPriceMlTool } from '@/tools/unit-price-ml';
import { wallpaperTool } from '@/tools/wallpaper';
import { weeklyHolidayPayTool } from '@/tools/weekly-holiday-pay';

/**
 * 서버 전용 도구 레지스트리.
 * 각 도구의 index.tsx(정의 + 로케일 본문 + 계산기)를 모은다.
 * 클라이언트 컴포넌트에서 import하지 않는다 (본문/계산기 전체가 번들에 들어간다).
 */
const modules: ToolModule[] = [
  // 장보기·쇼핑
  comparePriceTool,
  discountPriceTool,
  unitPrice100gTool,
  bogo1plus1Tool,
  cardCouponPriceTool,
  bogo2plus1Tool,
  unitPriceMlTool,
  unitPriceEachTool,
  bulkVsSmallTool,
  bundlePriceTool,
  // 생활비·공과금
  electricityCostTool,
  airconElectricityTool,
  livingCostTool,
  applianceElectricityTool,
  heatingCostTool,
  groceryBudgetTool,
  // 가족·음식
  meatPerPersonTool,
  ricePerPersonTool,
  holidayFoodTool,
  campingFoodTool,
  kimjangCabbageTool,
  kimjangSauceTool,
  // 직장·급여
  salaryNetTool,
  monthlySalaryTool,
  hourlyWageTool,
  weeklyHolidayPayTool,
  severancePayTool,
  // 사업·판매
  marginTool,
  targetPriceTool,
  breakEvenTool,
  costRatioTool,
  roasTool,
  // 집·이사
  areaConverterTool,
  movingCostTool,
  wallpaperTool,
];

export const toolModules: readonly ToolModule[] = modules;

const moduleById = new Map(modules.map((entry) => [entry.definition.id, entry]));

export function getToolModule(id: string): ToolModule | undefined {
  return moduleById.get(id);
}

export function getToolContent(id: string, locale: Locale): ToolContent | undefined {
  return moduleById.get(id)?.content[locale];
}

export interface ToolListItem {
  id: string;
  slug: string;
  emoji: string;
  category: CategoryId;
  title: string;
  summary: string;
}

function toListItem(definition: ToolDefinition, content: ToolContent): ToolListItem {
  return {
    id: definition.id,
    slug: definition.slug,
    emoji: definition.emoji,
    category: definition.category,
    title: content.title,
    summary: content.summary,
  };
}

/** 목록/카드용 데이터. 해당 로케일 본문이 없는 도구는 제외된다. */
export function listTools(
  locale: Locale,
  options: { category?: CategoryId; ids?: readonly string[]; limit?: number } = {},
): ToolListItem[] {
  const wanted = options.ids ? new Set(options.ids) : undefined;

  const items = modules
    .filter((entry) => {
      const { definition } = entry;
      if (definition.status !== 'published') return false;
      if (!definition.locales.includes(locale)) return false;
      if (options.category && definition.category !== options.category) return false;
      if (wanted && !wanted.has(definition.id)) return false;
      return entry.content[locale] !== undefined;
    })
    .sort((a, b) => (b.definition.weight ?? 0) - (a.definition.weight ?? 0));

  const ordered = options.ids
    ? // ids가 주어지면 요청한 순서를 유지한다 (관련 도구 노출 순서 제어)
      options.ids
        .map((id) => items.find((entry) => entry.definition.id === id))
        .filter((entry): entry is ToolModule => entry !== undefined)
    : items;

  const limited = options.limit ? ordered.slice(0, options.limit) : ordered;

  return limited.map((entry) => {
    const content = entry.content[locale];
    if (!content) throw new Error(`missing content: ${entry.definition.id}/${locale}`);
    return toListItem(entry.definition, content);
  });
}

/** 로케일별 도구 상세 라우트 파라미터. generateStaticParams에서 사용한다. */
export function toolRouteParams(): { locale: Locale; slug: string }[] {
  const params: { locale: Locale; slug: string }[] = [];
  for (const entry of modules) {
    if (entry.definition.status !== 'published') continue;
    for (const locale of entry.definition.locales) {
      if (entry.content[locale]) params.push({ locale, slug: entry.definition.slug });
    }
  }
  return params;
}

/** URL에서 예약된 세그먼트. 도구 slug가 이 값과 겹치면 라우팅이 깨진다. */
const RESERVED_SLUGS = new Set([
  'tools',
  'guide',
  'life',
  'category',
  'about',
  'contact',
  'privacy',
  'terms',
  'disclaimer',
  'admin',
  'api',
  'sitemap.xml',
  'robots.txt',
]);

export interface RegistryReport {
  /** 라우팅/페이지가 깨지는 치명적 문제 → 빌드를 중단시킨다 */
  errors: string[];
  /** 추천 링크 누락 등 페이지는 동작하지만 확인이 필요한 문제 */
  warnings: string[];
}

/** 레지스트리 무결성 검사. */
export function validateRegistry(): RegistryReport {
  const issues: string[] = [];
  const warnings: string[] = [];
  const seenSlugs = new Map<string, string>();
  const seenIds = new Set<string>();
  const definitionIds = new Set(toolDefinitions.map((definition) => definition.id));

  for (const definition of toolDefinitions) {
    if (seenIds.has(definition.id)) issues.push(`중복 도구 id: ${definition.id}`);
    seenIds.add(definition.id);

    const owner = seenSlugs.get(definition.slug);
    if (owner) issues.push(`중복 slug '${definition.slug}': ${owner}, ${definition.id}`);
    seenSlugs.set(definition.slug, definition.id);

    if (RESERVED_SLUGS.has(definition.slug)) {
      issues.push(`예약어와 충돌하는 slug: ${definition.slug} (${definition.id})`);
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(definition.slug)) {
      issues.push(`slug 형식 오류(kebab-case 아님): ${definition.slug}`);
    }

    for (const relatedId of definition.related) {
      if (!definitionIds.has(relatedId)) {
        // 아직 만들지 않은 도구를 미리 연결해 둘 수 있다(화면에서는 자동으로 숨겨진다).
        warnings.push(`아직 없는 관련 도구 참조: ${definition.id} → ${relatedId}`);
      }
      if (relatedId === definition.id) {
        issues.push(`자기 자신을 관련 도구로 지정: ${definition.id}`);
      }
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(definition.updatedAt)) {
      issues.push(`updatedAt 형식 오류: ${definition.id} (${definition.updatedAt})`);
    }
  }

  // 정의 목록과 모듈 목록이 어긋나면 라우트/사이트맵이 실제 페이지와 달라진다.
  const moduleIds = new Set(modules.map((entry) => entry.definition.id));
  for (const definition of toolDefinitions) {
    if (!moduleIds.has(definition.id)) {
      issues.push(`registry에 등록되지 않은 도구: ${definition.id}`);
    }
  }
  for (const entry of modules) {
    if (!definitionIds.has(entry.definition.id)) {
      issues.push(`definitions.ts에 없는 도구 모듈: ${entry.definition.id}`);
    }
    for (const locale of entry.definition.locales) {
      if (!entry.content[locale]) {
        issues.push(`선언된 로케일 본문 누락: ${entry.definition.id}/${locale}`);
      }
    }
    for (const locale of Object.keys(entry.content) as Locale[]) {
      if (!entry.definition.locales.includes(locale)) {
        issues.push(`정의에 없는 로케일 본문: ${entry.definition.id}/${locale}`);
      }
    }
  }

  return { errors: issues, warnings };
}

// 빌드 타임에 구조 오류를 즉시 드러낸다(깨진 링크/빈 페이지 예방).
const registryReport = validateRegistry();
if (registryReport.errors.length > 0) {
  throw new Error(`도구 레지스트리 오류:\n- ${registryReport.errors.join('\n- ')}`);
}
if (registryReport.warnings.length > 0) {
  console.warn(`[tools] 확인 필요:\n- ${registryReport.warnings.join('\n- ')}`);
}
