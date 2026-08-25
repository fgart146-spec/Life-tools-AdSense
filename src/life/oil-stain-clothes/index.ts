import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/oil-stain-clothes/meta';
import { content as ko } from '@/life/oil-stain-clothes/content.ko';
import { content as en } from '@/life/oil-stain-clothes/content.en';
import { content as ja } from '@/life/oil-stain-clothes/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
