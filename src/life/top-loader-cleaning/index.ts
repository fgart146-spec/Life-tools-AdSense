import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/top-loader-cleaning/meta';
import { content as ko } from '@/life/top-loader-cleaning/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
