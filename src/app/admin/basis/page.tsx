import { redirect } from 'next/navigation';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { createSupabaseServerClient, getAdminUser } from '@/lib/supabase/server';
import { BASIS_KEYS, DEFAULT_BASIS, getEffectiveBasis } from '@/lib/admin/basis';
import { saveBasisValueAction } from '@/app/admin/actions';
import { AdminCard, AdminShell, SetupNotice } from '@/components/admin/AdminShell';
import { AdminField, AdminForm, AdminTextarea } from '@/components/admin/AdminForm';
import type { BasisValueRow } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

const ENTRIES = [
  {
    key: BASIS_KEYS.electricityLow,
    label: '주택용 저압 전기요금',
    defaultValue: DEFAULT_BASIS.electricity.low,
    hint: '기본요금 구간, 누진 단가, 하계 구간, 기후환경·연료비조정 단가를 포함한 JSON',
  },
  {
    key: BASIS_KEYS.electricityHigh,
    label: '주택용 고압 전기요금',
    defaultValue: DEFAULT_BASIS.electricity.high,
    hint: '아파트 등 고압 계약 요금표',
  },
  {
    key: BASIS_KEYS.payrollRates,
    label: '4대보험 요율 (근로자 부담)',
    defaultValue: DEFAULT_BASIS.payroll.rates,
    hint: 'nationalPension / health / longTermCare / employment 비율',
  },
];

export default async function AdminBasisPage() {
  if (!isSupabaseConfigured()) return <SetupNotice />;

  const admin = await getAdminUser();
  if (!admin) redirect('/admin/login');

  const supabase = await createSupabaseServerClient();
  const { data } = (await supabase
    ?.from('basis_values')
    .select('key, label, value, basis_date, source_label, source_url, updated_at')) ?? {
    data: null,
  };

  const rows = new Map(
    ((data ?? []) as BasisValueRow[]).map((row) => [row.key, row] as const),
  );
  const effective = await getEffectiveBasis();

  return (
    <AdminShell email={admin.profile.email} active="/admin/basis">
      <div className="grid gap-4">
        <AdminCard
          title="적용 방식"
          description="저장하면 DB에 기록되고, 공개 페이지 재생성 시점에 계산기에 반영됩니다."
        >
          <ul className="grid gap-1 text-sm text-ink-600">
            <li>현재 적용: {effective.fromDatabase ? 'DB 값' : '코드 기본값'}</li>
            <li>전기요금 기준일: {effective.electricity.basisDate}</li>
            <li>급여 요율 기준일: {effective.payroll.basisDate}</li>
            <li className="text-ink-500">
              값 구조는 코드 기본값과 동일해야 합니다. 형식이 다르면 기본값으로 되돌아갑니다.
            </li>
          </ul>
        </AdminCard>

        {ENTRIES.map((entry) => {
          const row = rows.get(entry.key);
          return (
            <AdminCard key={entry.key} title={entry.label} description={entry.key}>
              <AdminForm action={saveBasisValueAction} submitLabel="저장">
                <input type="hidden" name="key" value={entry.key} />
                <input type="hidden" name="label" value={entry.label} />
                <AdminTextarea
                  label="값 (JSON)"
                  name="value"
                  rows={12}
                  hint={entry.hint}
                  defaultValue={JSON.stringify(row?.value ?? entry.defaultValue, null, 2)}
                />
                <div className="grid gap-4 sm:grid-cols-3">
                  <AdminField
                    label="기준일"
                    name="basis_date"
                    type="date"
                    defaultValue={row?.basis_date ?? ''}
                  />
                  <AdminField
                    label="출처 표기"
                    name="source_label"
                    defaultValue={row?.source_label ?? ''}
                  />
                  <AdminField
                    label="출처 URL"
                    name="source_url"
                    defaultValue={row?.source_url ?? ''}
                  />
                </div>
              </AdminForm>
            </AdminCard>
          );
        })}
      </div>
    </AdminShell>
  );
}
