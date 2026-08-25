import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/seasonal-clothes-storage/meta';
import { content as ko } from '@/life/seasonal-clothes-storage/content.ko';
import { content as en } from '@/life/seasonal-clothes-storage/content.en';
import { content as ja } from '@/life/seasonal-clothes-storage/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
