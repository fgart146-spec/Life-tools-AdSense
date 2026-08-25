import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'camping-food',
  slug: 'camping-food',
  category: 'food',
  emoji: '🏕️',
  status: 'published',
  locales: ['ko'],
  related: ['meat-per-person', 'rice-per-person', 'grocery-budget', 'holiday-food'],
  updatedAt: '2026-08-25',
  weight: 72,
};
