import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/coffee-stain/meta';
import { content as ko } from '@/life/coffee-stain/content.ko';
import { content as en } from '@/life/coffee-stain/content.en';

export const article: LifeArticleModule = { meta, content: { ko, en } };
