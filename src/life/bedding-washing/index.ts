import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/bedding-washing/meta';
import { content as ko } from '@/life/bedding-washing/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
