import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/drum-washer-cleaning/meta';
import { content as ko } from '@/life/drum-washer-cleaning/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
