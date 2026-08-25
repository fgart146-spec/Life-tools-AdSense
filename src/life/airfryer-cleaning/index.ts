import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/airfryer-cleaning/meta';
import { content as ko } from '@/life/airfryer-cleaning/content.ko';
import { content as en } from '@/life/airfryer-cleaning/content.en';
import { content as ja } from '@/life/airfryer-cleaning/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
