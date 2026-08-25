import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'card-coupon-price',
  slug: 'card-coupon-price',
  category: 'shopping',
  emoji: '💳',
  status: 'published',
  locales: ['ko'],
  related: ['discount-price', 'compare-price', 'unit-price-100g', 'bundle-price'],
  updatedAt: '2026-08-25',
  weight: 86,
};
