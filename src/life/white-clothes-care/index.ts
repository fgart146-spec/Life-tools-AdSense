import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/white-clothes-care/meta';
import { content as ko } from '@/life/white-clothes-care/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
