import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/tatami-mold/meta';
import { content as ja } from '@/life/tatami-mold/content.ja';

export const article: LifeArticleModule = { meta, content: { ja } };
