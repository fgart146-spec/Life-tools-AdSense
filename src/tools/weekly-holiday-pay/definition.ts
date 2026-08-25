import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'weekly-holiday-pay',
  slug: 'weekly-holiday-pay',
  category: 'work',
  emoji: '🗓️',
  status: 'published',
  locales: ['ko'],
  related: ['hourly-wage', 'monthly-salary', 'salary-net', 'severance-pay'],
  updatedAt: '2026-08-25',
  weight: 91,
};
