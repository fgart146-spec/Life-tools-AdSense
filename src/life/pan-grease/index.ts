import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/pan-grease/meta';
import { content as ko } from '@/life/pan-grease/content.ko';
import { content as en } from '@/life/pan-grease/content.en';
import { content as ja } from '@/life/pan-grease/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
