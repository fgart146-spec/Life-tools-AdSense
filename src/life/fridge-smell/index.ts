import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/fridge-smell/meta';
import { content as ko } from '@/life/fridge-smell/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
