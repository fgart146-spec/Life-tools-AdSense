import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/towel-smell/meta';
import { content as ko } from '@/life/towel-smell/content.ko';
import { content as en } from '@/life/towel-smell/content.en';
import { content as ja } from '@/life/towel-smell/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
