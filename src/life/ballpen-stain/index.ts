import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/ballpen-stain/meta';
import { content as ko } from '@/life/ballpen-stain/content.ko';
import { content as en } from '@/life/ballpen-stain/content.en';
import { content as ja } from '@/life/ballpen-stain/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
