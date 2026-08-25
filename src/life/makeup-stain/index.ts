import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/makeup-stain/meta';
import { content as ko } from '@/life/makeup-stain/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
