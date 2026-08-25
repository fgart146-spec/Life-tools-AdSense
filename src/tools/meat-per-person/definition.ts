import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'meat-per-person',
  slug: 'meat-per-person',
  category: 'food',
  emoji: '🍖',
  status: 'published',
  locales: ['ko'],
  related: ['rice-per-person', 'camping-food', 'holiday-food', 'unit-price-100g'],
  updatedAt: '2026-08-25',
  weight: 96,
};
