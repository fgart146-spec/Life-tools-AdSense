import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/sink-cleaning/meta';
import { content as ko } from '@/life/sink-cleaning/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
