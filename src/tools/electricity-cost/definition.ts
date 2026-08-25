import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'electricity-cost',
  slug: 'electricity-cost',
  category: 'utilities',
  emoji: '⚡',
  status: 'published',
  locales: ['ko'],
  related: ['aircon-electricity', 'appliance-electricity', 'heating-cost', 'living-cost'],
  updatedAt: '2026-08-25',
  weight: 98,
};
