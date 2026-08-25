import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/food-stain-basics/meta';
import { content as ko } from '@/life/food-stain-basics/content.ko';
import { content as en } from '@/life/food-stain-basics/content.en';
import { content as ja } from '@/life/food-stain-basics/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
