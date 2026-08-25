import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/food-stain-basics/meta';
import { content as ko } from '@/life/food-stain-basics/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
