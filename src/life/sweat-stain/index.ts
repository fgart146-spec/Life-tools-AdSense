import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/sweat-stain/meta';
import { content as ko } from '@/life/sweat-stain/content.ko';
import { content as en } from '@/life/sweat-stain/content.en';

export const article: LifeArticleModule = { meta, content: { ko, en } };
