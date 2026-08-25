import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'rice-per-person',
  slug: 'rice-per-person',
  category: 'food',
  emoji: '🍚',
  status: 'published',
  locales: ['ko'],
  related: ['meat-per-person', 'camping-food', 'holiday-food', 'grocery-budget'],
  updatedAt: '2026-08-25',
  weight: 80,
};
