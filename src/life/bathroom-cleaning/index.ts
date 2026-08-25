import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/bathroom-cleaning/meta';
import { content as ko } from '@/life/bathroom-cleaning/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
