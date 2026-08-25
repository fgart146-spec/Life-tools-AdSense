import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/padding-washing/meta';
import { content as ko } from '@/life/padding-washing/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
