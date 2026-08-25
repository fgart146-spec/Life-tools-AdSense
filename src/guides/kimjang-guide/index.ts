import type { GuideModule } from '@/lib/guides/types';
import { meta } from './meta';
import { contentKo } from './content.ko';

export const kimjangGuide: GuideModule = { meta, content: { ko: contentKo } };
