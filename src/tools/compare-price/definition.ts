import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'compare-price',
  slug: 'compare-price',
  category: 'shopping',
  emoji: '🛒',
  status: 'published',
  locales: ['ko', 'en', 'ja'],
  related: ['unit-price-100g', 'unit-price-ml', 'bulk-vs-small', 'discount-price', 'bogo-1plus1'],
  updatedAt: '2026-08-25',
  weight: 100,
};
