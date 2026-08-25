import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/pan-grease/meta';
import { content as ko } from '@/life/pan-grease/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
