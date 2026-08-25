import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/balcony-mold/meta';
import { content as ko } from '@/life/balcony-mold/content.ko';
import { content as en } from '@/life/balcony-mold/content.en';
import { content as ja } from '@/life/balcony-mold/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
