import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/gas-stove-cleaning/meta';
import { content as ko } from '@/life/gas-stove-cleaning/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
