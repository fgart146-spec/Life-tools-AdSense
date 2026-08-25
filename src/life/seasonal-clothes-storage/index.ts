import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/seasonal-clothes-storage/meta';
import { content as ko } from '@/life/seasonal-clothes-storage/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
