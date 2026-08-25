import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'discount-price',
  slug: 'discount-price',
  category: 'shopping',
  emoji: '💸',
  status: 'published',
  locales: ['ko', 'en', 'ja'],
  related: ['card-coupon-price', 'compare-price', 'bogo-1plus1', 'unit-price-100g'],
  updatedAt: '2026-08-25',
  weight: 95,
};
