/** 관리자 화면에서 사용하는 테이블 타입 (수기 정의) */
export interface AdminProfile {
  id: string;
  email: string;
  display_name: string | null;
  role: 'owner' | 'editor';
  created_at: string;
}

export interface BasisValueRow {
  key: string;
  label: string;
  value: Record<string, unknown>;
  basis_date: string | null;
  source_label: string | null;
  source_url: string | null;
  note: string | null;
  updated_at: string;
}

export interface ToolNoteRow {
  tool_id: string;
  review_status: 'ok' | 'needs_review' | 'blocked';
  note: string | null;
  last_reviewed_at: string | null;
  updated_at: string;
}

export interface SeasonalSlotRow {
  id: string;
  month: number;
  tool_id: string;
  position: number;
  active: boolean;
  updated_at: string;
}

export interface SiteSettingRow {
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

export interface SearchInsightRow {
  id: string;
  query: string;
  page: string | null;
  impressions: number;
  clicks: number;
  ctr: number | null;
  position: number | null;
  period_start: string;
  period_end: string;
  created_at: string;
}

export interface AiSuggestionRow {
  id: string;
  kind: 'new_tool' | 'improve_tool' | 'new_guide' | 'seo_fix';
  title: string;
  rationale: string | null;
  payload: Record<string, unknown>;
  status: 'pending' | 'approved' | 'rejected' | 'done';
  source_query: string | null;
  created_at: string;
  reviewed_at: string | null;
}

export interface UpdateLogRow {
  id: string;
  entity: string;
  entity_id: string | null;
  action: string;
  detail: Record<string, unknown> | null;
  created_at: string;
}
