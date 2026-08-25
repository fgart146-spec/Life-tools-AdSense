import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/makeup-stain/meta';
import { content as ko } from '@/life/makeup-stain/content.ko';
import { content as en } from '@/life/makeup-stain/content.en';
import { content as ja } from '@/life/makeup-stain/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
