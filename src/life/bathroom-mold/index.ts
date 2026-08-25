import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/bathroom-mold/meta';
import { content as ko } from '@/life/bathroom-mold/content.ko';
import { content as en } from '@/life/bathroom-mold/content.en';
import { content as ja } from '@/life/bathroom-mold/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
