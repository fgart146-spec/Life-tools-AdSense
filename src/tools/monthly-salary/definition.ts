import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'monthly-salary',
  slug: 'monthly-salary',
  category: 'work',
  emoji: '📅',
  status: 'published',
  locales: ['ko'],
  related: ['salary-net', 'hourly-wage', 'weekly-holiday-pay', 'living-cost'],
  updatedAt: '2026-09-23',
  weight: 97,
};
