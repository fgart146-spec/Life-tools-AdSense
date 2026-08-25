import type { LifeArticleModule } from '@/lib/life/types';
import { meta } from '@/life/washing-machine-smell/meta';
import { content as ko } from '@/life/washing-machine-smell/content.ko';
import { content as en } from '@/life/washing-machine-smell/content.en';
import { content as ja } from '@/life/washing-machine-smell/content.ja';

export const article: LifeArticleModule = { meta, content: { ko, en, ja } };
