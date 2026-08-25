import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/aircon-cleaning/meta';
import { content as ja } from '@/life/aircon-cleaning/content.ja';

export const article: LifeArticleModule = { meta, content: { ja } };
