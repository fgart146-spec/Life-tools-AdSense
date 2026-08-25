import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/shoe-smell/meta';
import { content as ko } from '@/life/shoe-smell/content.ko';
import { content as en } from '@/life/shoe-smell/content.en';
import { content as ja } from '@/life/shoe-smell/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
