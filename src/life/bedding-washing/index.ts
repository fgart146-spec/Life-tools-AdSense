import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/bedding-washing/meta';
import { content as ko } from '@/life/bedding-washing/content.ko';
import { content as en } from '@/life/bedding-washing/content.en';
import { content as ja } from '@/life/bedding-washing/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
