import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/wine-stain/meta';
import { content as en } from '@/life/wine-stain/content.en';

export const article: LifeArticleModule = { meta, content: { en } };
