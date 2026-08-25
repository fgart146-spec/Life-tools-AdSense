import { redirect } from 'next/navigation';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { createSupabaseServerClient, getAdminUser } from '@/lib/supabase/server';
import { siteConfig } from '@/config/site';
import { saveSettingAction } from '@/app/admin/actions';
import { AdminCard, AdminShell, SetupNotice } from '@/components/admin/AdminShell';
import { AdminField, AdminForm, AdminTextarea } from '@/components/admin/AdminForm';
import type { SiteSettingRow } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

const SETTING_KEYS = [
  {
    key: 'site.contact',
    label: '연락처',
    example: { email: siteConfig.contactEmail, responseHours: 48 },
    hint: '문의 페이지에 표시할 정보',
  },
  {
    key: 'ads.slots',
    label: 'AdSense 슬롯 ID',
    example: { toolTop: '', toolMiddle: '', toolBottom: '', content: '' },
    hint: '환경변수(NEXT_PUBLIC_ADSENSE_SLOT_*)가 있으면 환경변수가 우선합니다.',
  },
  {
    key: 'analytics',
    label: 'Analytics 설정',
    example: { ga4: siteConfig.analytics.gaId, searchConsoleProperty: '' },
    hint: '연동 상태를 기록해 두는 용도',
  },
];

export default async function AdminSettingsPage() {
  if (!isSupabaseConfigured()) return <SetupNotice />;

  const admin = await getAdminUser();
  if (!admin) redirect('/admin/login');

  const supabase = await createSupabaseServerClient();
  const { data } = (await supabase?.from('site_settings').select('key, value, updated_at')) ?? {
    data: null,
  };
  const rows = new Map(((data ?? []) as SiteSettingRow[]).map((row) => [row.key, row] as const));

  return (
    <AdminShell email={admin.profile.email} active="/admin/settings">
      <div className="grid gap-4">
        <AdminCard
          title="환경변수 우선 원칙"
          description="브랜드명·도메인·GA·AdSense 게시자 ID는 환경변수로 관리합니다."
        >
          <ul className="grid gap-1 text-sm text-ink-600">
            <li>사이트명(ko): {siteConfig.brand.ko}</li>
            <li>사이트 URL: {siteConfig.url}</li>
            <li>연락처: {siteConfig.contactEmail}</li>
            <li>GA4: {siteConfig.analytics.gaId || '미설정'}</li>
            <li>AdSense 게시자: {siteConfig.ads.client || '미설정'}</li>
            <li className="text-ink-500">
              여기 저장하는 값은 운영 기록용이며, 환경변수가 설정돼 있으면 환경변수가 우선합니다.
            </li>
          </ul>
        </AdminCard>

        {SETTING_KEYS.map((setting) => {
          const row = rows.get(setting.key);
          return (
            <AdminCard key={setting.key} title={setting.label} description={setting.key}>
              <AdminForm action={saveSettingAction} submitLabel="저장">
                <input type="hidden" name="key" value={setting.key} />
                <AdminTextarea
                  label="값 (JSON)"
                  name="value"
                  rows={6}
                  hint={setting.hint}
                  defaultValue={JSON.stringify(row?.value ?? setting.example, null, 2)}
                />
                {row && (
                  <AdminField
                    label="최근 수정"
                    name={`updated_${setting.key}`}
                    defaultValue={row.updated_at.slice(0, 19).replace('T', ' ')}
                  />
                )}
              </AdminForm>
            </AdminCard>
          );
        })}
      </div>
    </AdminShell>
  );
}
