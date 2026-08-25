import { redirect } from 'next/navigation';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { getAdminUser } from '@/lib/supabase/server';
import { SetupNotice } from '@/components/admin/AdminShell';
import { LoginForm } from './LoginForm';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  if (!isSupabaseConfigured()) return <SetupNotice />;

  const admin = await getAdminUser();
  if (admin) redirect('/admin');

  return (
    <div className="mx-auto mt-20 w-full max-w-sm px-4">
      <h1 className="text-xl font-bold text-ink-900">관리자 로그인</h1>
      <p className="mt-2 text-sm text-ink-500">
        관리자로 등록된 계정만 접근할 수 있습니다.
      </p>
      <LoginForm />
    </div>
  );
}
