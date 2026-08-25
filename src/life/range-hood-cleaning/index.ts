import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/range-hood-cleaning/meta';
import { content as ko } from '@/life/range-hood-cleaning/content.ko';
import { content as ja } from '@/life/range-hood-cleaning/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, ja } };
