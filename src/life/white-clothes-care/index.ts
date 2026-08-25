import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/white-clothes-care/meta';
import { content as ko } from '@/life/white-clothes-care/content.ko';
import { content as en } from '@/life/white-clothes-care/content.en';
import { content as ja } from '@/life/white-clothes-care/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
