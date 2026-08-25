import { unstable_cache } from 'next/cache';
import { seasonalToolIds } from '@/lib/seasonal';
import { createSupabaseReadOnlyClient } from '@/lib/supabase/read-only';

/**
 * 시즌 추천 구성.
 * 관리자가 설정한 값이 있으면 그것을, 없으면 코드 기본값을 사용한다.
 * 조회는 빌드/ISR 재생성 시점에만 발생한다.
 *
 * ⚠ 캐시에는 DB 결과만 담는다(코드 기본값을 캐시에 섞으면 코드 수정이 반영되지 않는다).
 */
const fetchSeasonalRows = unstable_cache(
  async (month: number): Promise<string[]> => {
    const supabase = createSupabaseReadOnlyClient();
    if (!supabase) return [];

    try {
      const { data, error } = await supabase
        .from('seasonal_slots')
        .select('tool_id, position')
        .eq('month', month)
        .eq('active', true)
        .order('position', { ascending: true });

      if (error || !data) return [];
      return data.map((row) => row.tool_id as string);
    } catch {
      return [];
    }
  },
  ['seasonal-slots-rows'],
  { revalidate: 86400, tags: ['seasonal'] },
);

export async function getSeasonalToolIds(month: number): Promise<readonly string[]> {
  const fromDatabase = await fetchSeasonalRows(month);
  if (fromDatabase.length > 0) return fromDatabase;
  return seasonalToolIds(new Date(2000, month - 1, 1));
}
