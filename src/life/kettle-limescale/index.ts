import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/kettle-limescale/meta';
import { content as ko } from '@/life/kettle-limescale/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
