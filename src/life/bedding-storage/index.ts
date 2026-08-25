import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/bedding-storage/meta';
import { content as ko } from '@/life/bedding-storage/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
