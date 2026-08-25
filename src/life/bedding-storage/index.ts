import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/bedding-storage/meta';
import { content as ko } from '@/life/bedding-storage/content.ko';
import { content as en } from '@/life/bedding-storage/content.en';
import { content as ja } from '@/life/bedding-storage/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
