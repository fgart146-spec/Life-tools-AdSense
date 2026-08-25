import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/dishwasher-cleaning/meta';
import { content as en } from '@/life/dishwasher-cleaning/content.en';

export const article: LifeArticleModule = { meta, content: { en } };
