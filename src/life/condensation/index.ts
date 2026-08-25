import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/condensation/meta';
import { content as ko } from '@/life/condensation/content.ko';
import { content as ja } from '@/life/condensation/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, ja } };
