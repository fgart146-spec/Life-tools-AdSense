import type { GuideModule } from '@/lib/guides/types';
import { meta } from './meta';
import { contentKo } from './content.ko';

export const weeklyHolidayPayGuide: GuideModule = { meta, content: { ko: contentKo } };
