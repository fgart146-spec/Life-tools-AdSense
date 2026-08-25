import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/condensation/meta';
import { content as ko } from '@/life/condensation/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
