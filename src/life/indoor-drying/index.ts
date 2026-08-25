import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/indoor-drying/meta';
import { content as ko } from '@/life/indoor-drying/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
