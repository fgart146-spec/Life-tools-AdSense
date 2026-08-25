import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/knit-washing/meta';
import { content as ko } from '@/life/knit-washing/content.ko';
import { content as en } from '@/life/knit-washing/content.en';
import { content as ja } from '@/life/knit-washing/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
