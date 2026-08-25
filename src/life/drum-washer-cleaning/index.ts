import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/drum-washer-cleaning/meta';
import { content as ko } from '@/life/drum-washer-cleaning/content.ko';
import { content as en } from '@/life/drum-washer-cleaning/content.en';

export const article: LifeArticleModule = { meta, content: { ko, en } };
