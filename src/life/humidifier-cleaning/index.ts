import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/humidifier-cleaning/meta';
import { content as ko } from '@/life/humidifier-cleaning/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
