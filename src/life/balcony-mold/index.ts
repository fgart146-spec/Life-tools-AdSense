import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/balcony-mold/meta';
import { content as ko } from '@/life/balcony-mold/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
