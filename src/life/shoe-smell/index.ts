import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/shoe-smell/meta';
import { content as ko } from '@/life/shoe-smell/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
