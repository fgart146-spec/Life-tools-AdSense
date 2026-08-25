import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/stainless-stain/meta';
import { content as ko } from '@/life/stainless-stain/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
