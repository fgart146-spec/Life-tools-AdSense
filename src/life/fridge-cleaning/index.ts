import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/fridge-cleaning/meta';
import { content as ko } from '@/life/fridge-cleaning/content.ko';
import { content as en } from '@/life/fridge-cleaning/content.en';
import { content as ja } from '@/life/fridge-cleaning/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
