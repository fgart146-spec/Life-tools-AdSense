import type { ToolDefinition } from '@/lib/tools/types';

export const definition: ToolDefinition = {
  id: 'wallpaper',
  slug: 'wallpaper',
  category: 'home',
  emoji: '🧱',
  status: 'published',
  locales: ['ko'],
  related: ['area-converter', 'moving-cost', 'living-cost', 'compare-price'],
  updatedAt: '2026-08-25',
  weight: 75,
};
