import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/sponge-care/meta';
import { content as ko } from '@/life/sponge-care/content.ko';
import { content as en } from '@/life/sponge-care/content.en';
import { content as ja } from '@/life/sponge-care/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
