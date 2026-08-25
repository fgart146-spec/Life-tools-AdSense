import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/ballpen-stain/meta';
import { content as ko } from '@/life/ballpen-stain/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
