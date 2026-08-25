import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'unit-price-ml',
  slug: 'unit-price-ml',
  category: 'shopping',
  emoji: '🧴',
  status: 'published',
  locales: ['ko', 'en', 'ja'],
  related: ['unit-price-100g', 'compare-price', 'bulk-vs-small', 'unit-price-each'],
  updatedAt: '2026-08-25',
  weight: 80,
};
