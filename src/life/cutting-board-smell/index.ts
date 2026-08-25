import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/cutting-board-smell/meta';
import { content as ko } from '@/life/cutting-board-smell/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
