import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/white-clothes-yellowing/meta';
import { content as ko } from '@/life/white-clothes-yellowing/content.ko';
import { content as en } from '@/life/white-clothes-yellowing/content.en';
import { content as ja } from '@/life/white-clothes-yellowing/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
