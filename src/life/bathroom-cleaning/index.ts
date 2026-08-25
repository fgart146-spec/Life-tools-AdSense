import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/bathroom-cleaning/meta';
import { content as ko } from '@/life/bathroom-cleaning/content.ko';
import { content as en } from '@/life/bathroom-cleaning/content.en';
import { content as ja } from '@/life/bathroom-cleaning/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
