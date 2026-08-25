import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/sneaker-washing/meta';
import { content as ko } from '@/life/sneaker-washing/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
