import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/black-clothes-fading/meta';
import { content as ko } from '@/life/black-clothes-fading/content.ko';
import { content as en } from '@/life/black-clothes-fading/content.en';
import { content as ja } from '@/life/black-clothes-fading/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
