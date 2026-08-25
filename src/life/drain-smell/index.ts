import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/drain-smell/meta';
import { content as ko } from '@/life/drain-smell/content.ko';
import { content as en } from '@/life/drain-smell/content.en';
import { content as ja } from '@/life/drain-smell/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
