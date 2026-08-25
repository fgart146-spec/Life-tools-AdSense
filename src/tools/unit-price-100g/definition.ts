import type { ToolDefinition } from '@/lib/tools/types';

/** 데이터 전용 모듈: 클라이언트 번들에 포함돼도 안전하도록 무거운 import를 하지 않는다. */
export const definition: ToolDefinition = {
  id: 'unit-price-100g',
  slug: 'unit-price-100g',
  category: 'shopping',
  emoji: '⚖️',
  status: 'published',
  locales: ['ko', 'en', 'ja'],
  related: ['compare-price', 'unit-price-ml', 'unit-price-each', 'bulk-vs-small'],
  updatedAt: '2026-08-25',
  weight: 90,
};
