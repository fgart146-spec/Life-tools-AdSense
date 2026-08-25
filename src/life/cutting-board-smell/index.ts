import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/cutting-board-smell/meta';
import { content as ko } from '@/life/cutting-board-smell/content.ko';
import { content as en } from '@/life/cutting-board-smell/content.en';
import { content as ja } from '@/life/cutting-board-smell/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
