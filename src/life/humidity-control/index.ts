import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/humidity-control/meta';
import { content as ko } from '@/life/humidity-control/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
