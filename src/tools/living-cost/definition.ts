import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'living-cost',
  slug: 'living-cost',
  category: 'utilities',
  emoji: '🏡',
  status: 'published',
  locales: ['ko'],
  related: ['grocery-budget', 'electricity-cost', 'heating-cost', 'salary-net'],
  updatedAt: '2026-08-25',
  weight: 92,
};
