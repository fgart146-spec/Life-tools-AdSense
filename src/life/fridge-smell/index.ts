import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/fridge-smell/meta';
import { content as ko } from '@/life/fridge-smell/content.ko';
import { content as ja } from '@/life/fridge-smell/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, ja } };
