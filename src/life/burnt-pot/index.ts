import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/burnt-pot/meta';
import { content as ko } from '@/life/burnt-pot/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
