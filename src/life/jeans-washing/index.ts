import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/jeans-washing/meta';
import { content as ko } from '@/life/jeans-washing/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
