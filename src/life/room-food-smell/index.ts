import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/room-food-smell/meta';
import { content as ko } from '@/life/room-food-smell/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
