import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/washing-machine-smell/meta';
import { content as ko } from '@/life/washing-machine-smell/content.ko';

export const article: LifeArticleModule = { meta, content: { ko } };
