import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/lint-removal/meta';
import { content as ko } from '@/life/lint-removal/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
