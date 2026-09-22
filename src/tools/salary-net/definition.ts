import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'salary-net',
  slug: 'salary-net',
  category: 'work',
  emoji: '💰',
  status: 'published',
  locales: ['ko'],
  related: ['monthly-salary', 'hourly-wage', 'severance-pay', 'living-cost'],
  updatedAt: '2026-09-23',
  weight: 99,
};
