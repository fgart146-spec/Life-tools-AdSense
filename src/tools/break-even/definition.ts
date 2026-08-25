import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'break-even',
  slug: 'break-even',
  category: 'business',
  emoji: '📈',
  status: 'published',
  locales: ['ko', 'en', 'ja'],
  related: ['margin', 'target-price', 'cost-ratio', 'roas'],
  updatedAt: '2026-08-25',
  weight: 85,
};
