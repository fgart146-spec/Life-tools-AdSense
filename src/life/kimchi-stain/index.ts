import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/kimchi-stain/meta';
import { content as ko } from '@/life/kimchi-stain/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
