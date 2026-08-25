import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'aircon-electricity',
  slug: 'aircon-electricity',
  category: 'utilities',
  emoji: '❄️',
  status: 'published',
  locales: ['ko'],
  related: ['electricity-cost', 'appliance-electricity', 'heating-cost', 'living-cost'],
  updatedAt: '2026-08-25',
  weight: 94,
};
