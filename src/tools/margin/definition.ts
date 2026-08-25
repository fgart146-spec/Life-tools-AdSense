import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'margin',
  slug: 'margin',
  category: 'business',
  emoji: '📦',
  status: 'published',
  locales: ['ko', 'en', 'ja'],
  related: ['target-price', 'cost-ratio', 'break-even', 'roas'],
  updatedAt: '2026-08-25',
  weight: 95,
};
