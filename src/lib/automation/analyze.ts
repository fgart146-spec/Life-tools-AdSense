import type { SearchConsoleRow } from '@/lib/automation/search-console';
import { toolDefinitions } from '@/lib/tools/definitions';
import { guideIndex } from '@/lib/guides';

/**
 * 검색 데이터 → 관리자 제안.
 *
 * 규칙 기반으로 후보를 뽑고, AI가 설정돼 있으면 설명(rationale)만 보강한다.
 * 어떤 경우에도 자동으로 공개되지 않는다. 관리자가 승인해야 반영된다.
 */
export type SuggestionKind = 'new_tool' | 'improve_tool' | 'new_guide' | 'seo_fix';

export interface SuggestionDraft {
  kind: SuggestionKind;
  title: string;
  rationale: string;
  sourceQuery: string;
  payload: Record<string, unknown>;
}

/** 노출은 많은데 클릭이 적으면 제목/설명을 손볼 후보 */
const LOW_CTR_THRESHOLD = 0.02;
const MIN_IMPRESSIONS = 100;
/** 평균 순위가 이 범위면 조금만 개선해도 효과가 큰 구간 */
const OPPORTUNITY_POSITION = { min: 5, max: 20 };

function slugFromPage(page: string | null): string | null {
  if (!page) return null;
  try {
    const url = new URL(page);
    const segments = url.pathname.split('/').filter(Boolean);
    // /ko/unit-price-100g → unit-price-100g
    return segments.length >= 2 ? (segments[1] ?? null) : null;
  } catch {
    return null;
  }
}

/** 검색어가 기존 도구/가이드로 커버되는지 대략 판단 */
function isCovered(query: string): boolean {
  const normalized = query.replace(/\s+/g, '');
  const inTools = toolDefinitions.some((tool) =>
    normalized.includes(tool.slug.replace(/-/g, '')),
  );
  const inGuides = guideIndex.some((guide) =>
    normalized.includes(guide.slug.replace(/-/g, '')),
  );
  return inTools || inGuides;
}

export function buildSuggestions(rows: readonly SearchConsoleRow[]): SuggestionDraft[] {
  const drafts: SuggestionDraft[] = [];

  // 1) 노출 대비 클릭이 낮은 페이지 → title/description 개선
  for (const row of rows) {
    if (row.impressions < MIN_IMPRESSIONS) continue;
    if (row.ctr >= LOW_CTR_THRESHOLD) continue;

    const slug = slugFromPage(row.page);
    drafts.push({
      kind: 'seo_fix',
      title: `제목·설명 개선 검토: ${slug ?? row.page ?? row.query}`,
      rationale: `"${row.query}" 검색어에서 노출 ${row.impressions}회, 클릭 ${row.clicks}회(CTR ${(
        row.ctr * 100
      ).toFixed(1)}%)입니다. 평균 순위는 ${row.position.toFixed(1)}위로, 제목과 설명이 검색 의도와 맞는지 점검할 가치가 있습니다.`,
      sourceQuery: row.query,
      payload: { page: row.page, slug, impressions: row.impressions, ctr: row.ctr },
    });
  }

  // 2) 평균 순위가 5~20위인 검색어 → 본문 보강 기회
  for (const row of rows) {
    if (row.impressions < MIN_IMPRESSIONS) continue;
    if (row.position < OPPORTUNITY_POSITION.min || row.position > OPPORTUNITY_POSITION.max) {
      continue;
    }
    const slug = slugFromPage(row.page);
    if (!slug) continue;

    drafts.push({
      kind: 'improve_tool',
      title: `본문 보강 후보: ${slug}`,
      rationale: `"${row.query}"에서 평균 ${row.position.toFixed(1)}위입니다. 이 구간은 본문 보강과 내부 링크 추가로 순위가 올라갈 여지가 큽니다.`,
      sourceQuery: row.query,
      payload: { slug, position: row.position, impressions: row.impressions },
    });
  }

  // 3) 노출은 있는데 대응 도구가 없는 검색어 → 신규 도구/가이드 후보
  for (const row of rows) {
    if (row.impressions < MIN_IMPRESSIONS) continue;
    if (isCovered(row.query)) continue;

    drafts.push({
      kind: 'new_tool',
      title: `신규 수요 발견: ${row.query}`,
      rationale: `"${row.query}"로 노출 ${row.impressions}회가 발생했지만 대응하는 전용 도구가 없습니다. 기존 도구에 흡수할지, 전용 도구를 만들지, 가이드로 다룰지 검토가 필요합니다.`,
      sourceQuery: row.query,
      payload: { query: row.query, impressions: row.impressions, position: row.position },
    });
  }

  // 같은 검색어로 중복 제안이 쌓이지 않도록 kind+query 기준으로 정리한다.
  const seen = new Set<string>();
  return drafts.filter((draft) => {
    const key = `${draft.kind}:${draft.sourceQuery}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
