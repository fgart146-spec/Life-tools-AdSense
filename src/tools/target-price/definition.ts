import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'target-price',
  slug: 'target-price',
  category: 'business',
  emoji: '🎯',
  status: 'published',
  locales: ['ko', 'en', 'ja'],
  related: ['margin', 'cost-ratio', 'break-even', 'roas'],
  updatedAt: '2026-08-25',
  weight: 87,
};
