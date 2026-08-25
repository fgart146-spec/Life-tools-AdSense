import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/sneaker-washing/meta';
import { content as ko } from '@/life/sneaker-washing/content.ko';
import { content as en } from '@/life/sneaker-washing/content.en';
import { content as ja } from '@/life/sneaker-washing/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
