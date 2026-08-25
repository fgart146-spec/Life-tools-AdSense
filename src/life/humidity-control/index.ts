import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/humidity-control/meta';
import { content as ko } from '@/life/humidity-control/content.ko';
import { content as en } from '@/life/humidity-control/content.en';
import { content as ja } from '@/life/humidity-control/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
