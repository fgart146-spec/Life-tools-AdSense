import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'holiday-food',
  slug: 'holiday-food',
  category: 'food',
  emoji: '🥮',
  status: 'published',
  locales: ['ko'],
  related: ['meat-per-person', 'rice-per-person', 'grocery-budget', 'camping-food'],
  updatedAt: '2026-08-25',
  weight: 78,
};
