import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/drain-smell/meta';
import { content as ko } from '@/life/drain-smell/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
