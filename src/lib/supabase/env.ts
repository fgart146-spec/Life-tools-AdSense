/** Supabase 환경변수 상태. 값이 없으면 관리자 기능만 비활성화되고 공개 사이트는 정상 동작한다. */
export const supabaseEnv = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
};

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseEnv.url && supabaseEnv.anonKey);
}

export function hasServiceRole(): boolean {
  return Boolean(supabaseEnv.url && supabaseEnv.serviceRoleKey);
}
