import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'severance-pay',
  slug: 'severance-pay',
  category: 'work',
  emoji: '🎓',
  status: 'published',
  locales: ['ko'],
  related: ['salary-net', 'monthly-salary', 'hourly-wage', 'weekly-holiday-pay'],
  updatedAt: '2026-08-25',
  weight: 89,
};
