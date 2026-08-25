import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'bundle-price',
  slug: 'bundle-price',
  category: 'shopping',
  emoji: '📦',
  status: 'published',
  locales: ['ko'],
  related: ['unit-price-each', 'compare-price', 'bulk-vs-small', 'bogo-2plus1'],
  updatedAt: '2026-08-25',
  weight: 74,
};
