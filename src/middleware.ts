import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { isSupabaseConfigured, supabaseEnv } from '@/lib/supabase/env';

/**
 * 관리자 경로에서만 동작하는 미들웨어.
 *
 * 공개 페이지에는 미들웨어를 적용하지 않는다(비용·성능 원칙).
 * Supabase 세션 쿠키 갱신은 서버 컴포넌트에서 할 수 없기 때문에
 * /admin 경로에 한해 여기서 처리한다.
 */
export async function middleware(request: NextRequest) {
  if (!isSupabaseConfigured()) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseEnv.url, supabaseEnv.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // 세션 갱신을 위해 호출한다(결과는 각 페이지에서 다시 확인한다).
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
