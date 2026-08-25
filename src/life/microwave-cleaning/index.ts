import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/microwave-cleaning/meta';
import { content as ko } from '@/life/microwave-cleaning/content.ko';
import { content as en } from '@/life/microwave-cleaning/content.en';
import { content as ja } from '@/life/microwave-cleaning/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
