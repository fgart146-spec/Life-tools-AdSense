import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/airfryer-cleaning/meta';
import { content as ko } from '@/life/airfryer-cleaning/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
