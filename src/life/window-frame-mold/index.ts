import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/window-frame-mold/meta';
import { content as ko } from '@/life/window-frame-mold/content.ko';
import { content as en } from '@/life/window-frame-mold/content.en';
import { content as ja } from '@/life/window-frame-mold/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
