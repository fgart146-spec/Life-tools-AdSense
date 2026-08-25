import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/microwave-cleaning/meta';
import { content as ko } from '@/life/microwave-cleaning/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
