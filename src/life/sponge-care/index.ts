import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/sponge-care/meta';
import { content as ko } from '@/life/sponge-care/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
