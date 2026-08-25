import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'hourly-wage',
  slug: 'hourly-wage',
  category: 'work',
  emoji: '⏱️',
  status: 'published',
  locales: ['ko'],
  related: ['weekly-holiday-pay', 'monthly-salary', 'salary-net', 'severance-pay'],
  updatedAt: '2026-08-25',
  weight: 93,
};
