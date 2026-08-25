import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'appliance-electricity',
  slug: 'appliance-electricity',
  category: 'utilities',
  emoji: '🔌',
  status: 'published',
  locales: ['ko'],
  related: ['electricity-cost', 'aircon-electricity', 'heating-cost', 'living-cost'],
  updatedAt: '2026-08-25',
  weight: 90,
};
