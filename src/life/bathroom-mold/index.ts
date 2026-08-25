import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/bathroom-mold/meta';
import { content as ko } from '@/life/bathroom-mold/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
