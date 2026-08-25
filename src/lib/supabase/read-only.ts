import { createClient } from '@supabase/supabase-js';
import { hasServiceRole, supabaseEnv } from '@/lib/supabase/env';

/**
 * 빌드/ISR 재생성 시점에 공개 페이지가 사용하는 읽기 전용 클라이언트.
 *
 * ⚠ 사용 규칙
 *  - 사용자 요청마다 호출하지 않는다. 정적 생성 또는 revalidate 시점에만 호출된다.
 *  - 서비스 롤 키가 없으면 null을 돌려주고, 호출부는 코드 기본값으로 동작한다.
 */
export function createSupabaseReadOnlyClient() {
  if (!hasServiceRole()) return null;

  return createClient(supabaseEnv.url, supabaseEnv.serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
