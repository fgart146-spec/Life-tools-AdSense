import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'cost-ratio',
  slug: 'cost-ratio',
  category: 'business',
  emoji: '📊',
  status: 'published',
  locales: ['ko'],
  related: ['margin', 'target-price', 'break-even', 'roas'],
  updatedAt: '2026-08-25',
  weight: 83,
};
