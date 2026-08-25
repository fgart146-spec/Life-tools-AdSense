import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/stainless-stain/meta';
import { content as ko } from '@/life/stainless-stain/content.ko';
import { content as en } from '@/life/stainless-stain/content.en';
import { content as ja } from '@/life/stainless-stain/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
