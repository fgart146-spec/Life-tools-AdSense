import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/window-frame-mold/meta';
import { content as ko } from '@/life/window-frame-mold/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
