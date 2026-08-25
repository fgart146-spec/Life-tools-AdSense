import { redirect } from 'next/navigation';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { createSupabaseServerClient, getAdminUser } from '@/lib/supabase/server';
import { seasonalRules } from '@/lib/seasonal';
import { toolDefinitions } from '@/lib/tools/definitions';
import { saveSeasonalAction } from '@/app/admin/actions';
import { AdminCard, AdminShell, SetupNotice } from '@/components/admin/AdminShell';
import { AdminForm, AdminTextarea } from '@/components/admin/AdminForm';
import type { SeasonalSlotRow } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

const MONTHS = Array.from({ length: 12 }, (_, index) => index + 1);

function defaultToolIds(month: number): string[] {
  const rule = seasonalRules.find((candidate) => candidate.months.includes(month));
  return [...(rule?.toolIds ?? [])];
}

export default async function AdminSeasonalPage() {
  if (!isSupabaseConfigured()) return <SetupNotice />;

  const admin = await getAdminUser();
  if (!admin) redirect('/admin/login');

  const supabase = await createSupabaseServerClient();
  const { data } = (await supabase
    ?.from('seasonal_slots')
    .select('id, month, tool_id, position, active, updated_at')
    .order('position', { ascending: true })) ?? { data: null };

  const rows = (data ?? []) as SeasonalSlotRow[];
  const byMonth = new Map<number, string[]>();
  for (const row of rows) {
    if (!row.active) continue;
    const list = byMonth.get(row.month) ?? [];
    list.push(row.tool_id);
    byMonth.set(row.month, list);
  }

  const validIds = new Set(toolDefinitions.map((tool) => tool.id));

  return (
    <AdminShell email={admin.profile.email} active="/admin/seasonal">
      <AdminCard
        title="시즌 추천 구성"
        description="메인 화면 '이번 달 추천'에 노출할 도구를 월별로 설정합니다. 비워 두면 코드 기본값을 사용합니다."
      >
        <p className="text-sm text-ink-500">
          도구 id를 줄바꿈 또는 쉼표로 구분해 입력하세요. 존재하지 않는 id는 화면에서 자동으로
          제외됩니다.
        </p>
      </AdminCard>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {MONTHS.map((month) => {
          const saved = byMonth.get(month);
          const value = (saved ?? defaultToolIds(month)).join('\n');
          const unknown = (saved ?? []).filter((id) => !validIds.has(id));

          return (
            <AdminCard
              key={month}
              title={`${month}월`}
              description={saved ? 'DB 설정 적용 중' : '코드 기본값'}
            >
              <AdminForm action={saveSeasonalAction} submitLabel="저장">
                <input type="hidden" name="month" value={month} />
                <AdminTextarea
                  label="도구 id"
                  name="tool_ids"
                  rows={5}
                  defaultValue={value}
                  hint={
                    unknown.length > 0
                      ? `존재하지 않는 id: ${unknown.join(', ')}`
                      : '예: aircon-electricity'
                  }
                />
              </AdminForm>
            </AdminCard>
          );
        })}
      </div>
    </AdminShell>
  );
}
