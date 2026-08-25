import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/window-frame-cleaning/meta';
import { content as ko } from '@/life/window-frame-cleaning/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
