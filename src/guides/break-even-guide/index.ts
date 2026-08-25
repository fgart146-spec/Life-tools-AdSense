import type { GuideModule } from '@/lib/guides/types';
import { meta } from './meta';
import { contentKo } from './content.ko';
import { contentEn } from './content.en';
import { contentJa } from './content.ja';

export const breakEvenGuide: GuideModule = {
  meta,
  content: { ko: contentKo, en: contentEn, ja: contentJa },
};
