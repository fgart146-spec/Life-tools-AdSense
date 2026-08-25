import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/room-food-smell/meta';
import { content as ko } from '@/life/room-food-smell/content.ko';
import { content as en } from '@/life/room-food-smell/content.en';
import { content as ja } from '@/life/room-food-smell/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
