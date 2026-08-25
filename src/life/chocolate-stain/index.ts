import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/chocolate-stain/meta';
import { content as ko } from '@/life/chocolate-stain/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
