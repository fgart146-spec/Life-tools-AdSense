import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'unit-price-each',
  slug: 'unit-price-each',
  category: 'shopping',
  emoji: '🧻',
  status: 'published',
  locales: ['ko', 'en', 'ja'],
  related: ['unit-price-100g', 'unit-price-ml', 'bundle-price', 'compare-price'],
  updatedAt: '2026-08-25',
  weight: 78,
};
