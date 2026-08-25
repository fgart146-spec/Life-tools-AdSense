import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/black-clothes-fading/meta';
import { content as ko } from '@/life/black-clothes-fading/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
