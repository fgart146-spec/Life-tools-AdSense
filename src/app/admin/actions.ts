'use server';

import { redirect } from 'next/navigation';
import { revalidatePath, revalidateTag } from 'next/cache';
import { createSupabaseServerClient, getAdminUser } from '@/lib/supabase/server';

export interface ActionResult {
  ok: boolean;
  message: string;
}

/* -------------------------------------------------------------------------- */
/* 인증                                                                         */
/* -------------------------------------------------------------------------- */

export async function signInAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, message: 'Supabase가 설정되지 않았습니다.' };

  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  if (!email || !password) return { ok: false, message: '이메일과 비밀번호를 입력하세요.' };

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, message: '로그인에 실패했습니다. 정보를 확인해 주세요.' };

  const admin = await getAdminUser();
  if (!admin) {
    await supabase.auth.signOut();
    return { ok: false, message: '관리자로 등록되지 않은 계정입니다.' };
  }

  redirect('/admin');
}

export async function signOutAction(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect('/admin/login');
}

/* -------------------------------------------------------------------------- */
/* 공통 헬퍼                                                                    */
/* -------------------------------------------------------------------------- */

async function requireAdmin() {
  const admin = await getAdminUser();
  if (!admin) redirect('/admin/login');
  return admin;
}

async function writeLog(
  entity: string,
  entityId: string | null,
  action: string,
  detail: Record<string, unknown>,
) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;
  await supabase.from('update_log').insert({ entity, entity_id: entityId, action, detail });
}

/** 공개 페이지 정적 결과를 다시 만든다 (관리자 저장 → 재생성 → 반영). */
async function revalidatePublic(tags: string[]) {
  // 데이터 캐시(unstable_cache) 즉시 만료 + 정적 페이지 재생성
  for (const tag of tags) revalidateTag(tag, { expire: 0 });
  revalidatePath('/', 'layout');
}

/* -------------------------------------------------------------------------- */
/* 기준값                                                                       */
/* -------------------------------------------------------------------------- */

export async function saveBasisValueAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const admin = await requireAdmin();
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, message: 'Supabase가 설정되지 않았습니다.' };

  const key = String(formData.get('key') ?? '').trim();
  const label = String(formData.get('label') ?? '').trim();
  const rawValue = String(formData.get('value') ?? '').trim();
  const basisDate = String(formData.get('basis_date') ?? '').trim() || null;
  const sourceLabel = String(formData.get('source_label') ?? '').trim() || null;
  const sourceUrl = String(formData.get('source_url') ?? '').trim() || null;

  if (!key || !rawValue) return { ok: false, message: '키와 값을 입력하세요.' };

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawValue);
  } catch {
    return { ok: false, message: 'JSON 형식이 올바르지 않습니다.' };
  }

  const { error } = await supabase.from('basis_values').upsert({
    key,
    label: label || key,
    value: parsed,
    basis_date: basisDate,
    source_label: sourceLabel,
    source_url: sourceUrl,
    updated_at: new Date().toISOString(),
    updated_by: admin.user.id,
  });

  if (error) return { ok: false, message: `저장 실패: ${error.message}` };

  await writeLog('basis_values', key, 'upsert', { basisDate });
  await revalidatePublic(['basis-values']);
  return { ok: true, message: '저장했습니다. 공개 페이지 재생성을 요청했습니다.' };
}

/* -------------------------------------------------------------------------- */
/* 시즌 추천                                                                    */
/* -------------------------------------------------------------------------- */

export async function saveSeasonalAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const admin = await requireAdmin();
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, message: 'Supabase가 설정되지 않았습니다.' };

  const month = Number(formData.get('month'));
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return { ok: false, message: '월은 1~12 사이여야 합니다.' };
  }

  const toolIds = String(formData.get('tool_ids') ?? '')
    .split(/[\n,]/)
    .map((value) => value.trim())
    .filter(Boolean);

  const { error: deleteError } = await supabase
    .from('seasonal_slots')
    .delete()
    .eq('month', month);
  if (deleteError) return { ok: false, message: `저장 실패: ${deleteError.message}` };

  if (toolIds.length > 0) {
    const rows = toolIds.map((toolId, index) => ({
      month,
      tool_id: toolId,
      position: index,
      active: true,
      updated_by: admin.user.id,
    }));
    const { error } = await supabase.from('seasonal_slots').insert(rows);
    if (error) return { ok: false, message: `저장 실패: ${error.message}` };
  }

  await writeLog('seasonal_slots', String(month), 'replace', { count: toolIds.length });
  await revalidatePublic(['seasonal']);
  return { ok: true, message: `${month}월 구성을 저장했습니다.` };
}

/* -------------------------------------------------------------------------- */
/* 도구 메모                                                                    */
/* -------------------------------------------------------------------------- */

export async function saveToolNoteAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const admin = await requireAdmin();
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, message: 'Supabase가 설정되지 않았습니다.' };

  const toolId = String(formData.get('tool_id') ?? '').trim();
  const reviewStatus = String(formData.get('review_status') ?? 'ok');
  const note = String(formData.get('note') ?? '').trim() || null;
  if (!toolId) return { ok: false, message: '도구를 선택하세요.' };

  const { error } = await supabase.from('tool_notes').upsert({
    tool_id: toolId,
    review_status: reviewStatus,
    note,
    last_reviewed_at: new Date().toISOString().slice(0, 10),
    updated_at: new Date().toISOString(),
    updated_by: admin.user.id,
  });

  if (error) return { ok: false, message: `저장 실패: ${error.message}` };

  await writeLog('tool_notes', toolId, 'upsert', { reviewStatus });
  return { ok: true, message: '검토 메모를 저장했습니다.' };
}

/* -------------------------------------------------------------------------- */
/* 사이트 설정                                                                  */
/* -------------------------------------------------------------------------- */

export async function saveSettingAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const admin = await requireAdmin();
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, message: 'Supabase가 설정되지 않았습니다.' };

  const key = String(formData.get('key') ?? '').trim();
  const rawValue = String(formData.get('value') ?? '').trim();
  if (!key || !rawValue) return { ok: false, message: '키와 값을 입력하세요.' };

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawValue);
  } catch {
    return { ok: false, message: 'JSON 형식이 올바르지 않습니다.' };
  }

  const { error } = await supabase.from('site_settings').upsert({
    key,
    value: parsed,
    updated_at: new Date().toISOString(),
    updated_by: admin.user.id,
  });

  if (error) return { ok: false, message: `저장 실패: ${error.message}` };

  await writeLog('site_settings', key, 'upsert', {});
  await revalidatePublic([]);
  return { ok: true, message: '저장했습니다.' };
}

/* -------------------------------------------------------------------------- */
/* 수동 재생성                                                                  */
/* -------------------------------------------------------------------------- */

export async function revalidateAllAction(): Promise<ActionResult> {
  await requireAdmin();
  await revalidatePublic(['basis-values', 'seasonal']);
  await writeLog('site', null, 'revalidate', {});
  return { ok: true, message: '공개 페이지 재생성을 요청했습니다.' };
}

/* -------------------------------------------------------------------------- */
/* AI 제안 검토                                                                 */
/* -------------------------------------------------------------------------- */

export async function reviewSuggestionAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const admin = await requireAdmin();
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, message: 'Supabase가 설정되지 않았습니다.' };

  const id = String(formData.get('id') ?? '').trim();
  const status = String(formData.get('status') ?? '');
  const allowed = ['approved', 'rejected', 'done'];
  if (!id || !allowed.includes(status)) {
    return { ok: false, message: '잘못된 요청입니다.' };
  }

  const { error } = await supabase
    .from('ai_suggestions')
    .update({
      status,
      reviewed_at: new Date().toISOString(),
      reviewed_by: admin.user.id,
    })
    .eq('id', id);

  if (error) return { ok: false, message: `저장 실패: ${error.message}` };

  await writeLog('ai_suggestions', id, status, {});
  // 제안 승인은 콘텐츠를 자동으로 바꾸지 않는다. 실제 반영은 코드 작업으로 이어진다.
  return { ok: true, message: '검토 상태를 저장했습니다.' };
}
