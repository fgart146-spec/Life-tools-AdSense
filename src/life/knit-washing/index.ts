import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/knit-washing/meta';
import { content as ko } from '@/life/knit-washing/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
