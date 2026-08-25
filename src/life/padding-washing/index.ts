import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/padding-washing/meta';
import { content as ko } from '@/life/padding-washing/content.ko';
import { content as en } from '@/life/padding-washing/content.en';
import { content as ja } from '@/life/padding-washing/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
