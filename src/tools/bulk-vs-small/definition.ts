import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'bulk-vs-small',
  slug: 'bulk-vs-small',
  category: 'shopping',
  emoji: '🥫',
  status: 'published',
  locales: ['ko'],
  related: ['compare-price', 'unit-price-100g', 'unit-price-ml', 'bundle-price'],
  updatedAt: '2026-08-25',
  weight: 76,
};
