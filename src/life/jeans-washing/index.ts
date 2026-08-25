import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/jeans-washing/meta';
import { content as ko } from '@/life/jeans-washing/content.ko';
import { content as en } from '@/life/jeans-washing/content.en';
import { content as ja } from '@/life/jeans-washing/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
