import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'heating-cost',
  slug: 'heating-cost',
  category: 'utilities',
  emoji: '🔥',
  status: 'published',
  locales: ['ko'],
  related: ['electricity-cost', 'appliance-electricity', 'living-cost', 'aircon-electricity'],
  updatedAt: '2026-09-23',
  weight: 88,
};
