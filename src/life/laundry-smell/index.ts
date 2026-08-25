import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/laundry-smell/meta';
import { content as ko } from '@/life/laundry-smell/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
