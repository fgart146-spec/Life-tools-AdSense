import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { supabaseEnv, isSupabaseConfigured } from '@/lib/supabase/env';

/**
 * 서버 컴포넌트/서버 액션용 Supabase 클라이언트 (사용자 세션 기반).
 * 환경변수가 없으면 null을 돌려주고, 호출부는 설정 안내를 표시한다.
 */
export async function createSupabaseServerClient() {
  if (!isSupabaseConfigured()) return null;

  const cookieStore = await cookies();

  return createServerClient(supabaseEnv.url, supabaseEnv.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // 서버 컴포넌트에서는 쿠키를 설정할 수 없다.
          // 세션 갱신은 /admin 경로에만 적용되는 미들웨어가 담당한다.
        }
      },
    },
  });
}

/** 현재 로그인한 관리자 정보. 관리자가 아니면 null. */
export async function getAdminUser() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('id, email, display_name, role')
    .eq('id', user.id)
    .maybeSingle();

  if (!profile) return null;
  return { user, profile };
}
