import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/lint-removal/meta';
import { content as ko } from '@/life/lint-removal/content.ko';
import { content as en } from '@/life/lint-removal/content.en';
import { content as ja } from '@/life/lint-removal/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
