import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/sink-cleaning/meta';
import { content as ko } from '@/life/sink-cleaning/content.ko';
import { content as en } from '@/life/sink-cleaning/content.en';
import { content as ja } from '@/life/sink-cleaning/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
