import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/kettle-limescale/meta';
import { content as ko } from '@/life/kettle-limescale/content.ko';
import { content as en } from '@/life/kettle-limescale/content.en';
import { content as ja } from '@/life/kettle-limescale/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
