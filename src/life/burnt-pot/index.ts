import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/burnt-pot/meta';
import { content as ko } from '@/life/burnt-pot/content.ko';
import { content as en } from '@/life/burnt-pot/content.en';
import { content as ja } from '@/life/burnt-pot/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
