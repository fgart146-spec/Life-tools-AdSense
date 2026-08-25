import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/gas-stove-cleaning/meta';
import { content as ko } from '@/life/gas-stove-cleaning/content.ko';
import { content as en } from '@/life/gas-stove-cleaning/content.en';
import { content as ja } from '@/life/gas-stove-cleaning/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
