import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/fridge-cleaning/meta';
import { content as ko } from '@/life/fridge-cleaning/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
