import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/chocolate-stain/meta';
import { content as ko } from '@/life/chocolate-stain/content.ko';
import { content as en } from '@/life/chocolate-stain/content.en';
import { content as ja } from '@/life/chocolate-stain/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
