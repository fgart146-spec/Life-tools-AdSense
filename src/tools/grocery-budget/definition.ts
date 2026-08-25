import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'grocery-budget',
  slug: 'grocery-budget',
  category: 'utilities',
  emoji: '🧺',
  status: 'published',
  locales: ['ko'],
  related: ['living-cost', 'compare-price', 'meat-per-person', 'unit-price-100g'],
  updatedAt: '2026-08-25',
  weight: 82,
};
