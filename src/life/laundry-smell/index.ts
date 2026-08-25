import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/laundry-smell/meta';
import { content as ko } from '@/life/laundry-smell/content.ko';
import { content as en } from '@/life/laundry-smell/content.en';
import { content as ja } from '@/life/laundry-smell/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
