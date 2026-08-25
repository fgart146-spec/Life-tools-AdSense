import { redirect } from 'next/navigation';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { createSupabaseServerClient, getAdminUser } from '@/lib/supabase/server';
import { categories } from '@/lib/tools/categories';
import { toolDefinitions } from '@/lib/tools/definitions';
import { saveToolNoteAction } from '@/app/admin/actions';
import { AdminCard, AdminShell, SetupNotice } from '@/components/admin/AdminShell';
import { AdminForm, AdminTextarea } from '@/components/admin/AdminForm';
import type { ToolNoteRow } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

export default async function AdminToolsPage() {
  if (!isSupabaseConfigured()) return <SetupNotice />;

  const admin = await getAdminUser();
  if (!admin) redirect('/admin/login');

  const supabase = await createSupabaseServerClient();
  const { data } = (await supabase
    ?.from('tool_notes')
    .select('tool_id, review_status, note, last_reviewed_at, updated_at')) ?? { data: null };

  const notes = new Map(((data ?? []) as ToolNoteRow[]).map((row) => [row.tool_id, row] as const));

  return (
    <AdminShell email={admin.profile.email} active="/admin/tools">
      <AdminCard
        title="도구 목록"
        description="공개 여부와 slug는 코드에서 관리합니다(라우팅에 영향을 주기 때문). 여기서는 검토 상태와 메모를 기록합니다."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-200 text-ink-500">
                <th className="py-2 pr-3 font-medium">도구</th>
                <th className="py-2 pr-3 font-medium">카테고리</th>
                <th className="py-2 pr-3 font-medium">언어</th>
                <th className="py-2 pr-3 font-medium">업데이트</th>
                <th className="py-2 pr-3 font-medium">검토 상태</th>
              </tr>
            </thead>
            <tbody>
              {toolDefinitions.map((tool) => {
                const note = notes.get(tool.id);
                return (
                  <tr key={tool.id} className="border-b border-ink-100">
                    <td className="py-2 pr-3">
                      <span className="mr-1" aria-hidden="true">
                        {tool.emoji}
                      </span>
                      {tool.id}
                    </td>
                    <td className="py-2 pr-3 text-ink-600">
                      {categories[tool.category].label.ko}
                    </td>
                    <td className="py-2 pr-3 uppercase text-ink-600">{tool.locales.join(', ')}</td>
                    <td className="tabular py-2 pr-3 text-ink-600">{tool.updatedAt}</td>
                    <td className="py-2 pr-3">
                      <span
                        className={
                          note?.review_status === 'needs_review'
                            ? 'text-amber-700'
                            : note?.review_status === 'blocked'
                              ? 'text-red-700'
                              : 'text-ink-500'
                        }
                      >
                        {note?.review_status ?? '-'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AdminCard>

      <div className="mt-4">
        <AdminCard
          title="검토 메모 남기기"
          description="기준값 변경이 필요한 도구를 표시해 두세요."
        >
          <AdminForm action={saveToolNoteAction} submitLabel="저장">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="tool_id" className="mb-1.5 block text-sm font-medium text-ink-700">
                  도구
                </label>
                <select
                  id="tool_id"
                  name="tool_id"
                  className="h-11 w-full rounded-lg border border-ink-300 bg-white px-3 text-sm"
                >
                  {toolDefinitions.map((tool) => (
                    <option key={tool.id} value={tool.id}>
                      {tool.id}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="review_status"
                  className="mb-1.5 block text-sm font-medium text-ink-700"
                >
                  검토 상태
                </label>
                <select
                  id="review_status"
                  name="review_status"
                  className="h-11 w-full rounded-lg border border-ink-300 bg-white px-3 text-sm"
                >
                  <option value="ok">확인 완료</option>
                  <option value="needs_review">검토 필요</option>
                  <option value="blocked">공개 보류 검토</option>
                </select>
              </div>
            </div>
            <AdminTextarea label="메모" name="note" rows={4} />
          </AdminForm>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
