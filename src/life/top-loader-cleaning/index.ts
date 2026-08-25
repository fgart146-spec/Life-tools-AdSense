import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/top-loader-cleaning/meta';
import { content as ko } from '@/life/top-loader-cleaning/content.ko';
import { content as en } from '@/life/top-loader-cleaning/content.en';
import { content as ja } from '@/life/top-loader-cleaning/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
