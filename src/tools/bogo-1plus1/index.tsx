import { defineTool } from '@/lib/tools/define-tool';
import { definition } from './definition';
import { Calculator } from './Calculator';
import { contentKo } from './content.ko';
import { contentEn } from './content.en';
import { contentJa } from './content.ja';

export const bogo1plus1Tool = defineTool({
  definition,
  content: { ko: contentKo, en: contentEn, ja: contentJa },
  Calculator,
});
