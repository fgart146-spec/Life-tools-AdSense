import { defineTool } from '@/lib/tools/define-tool';
import { definition } from './definition';
import { Calculator } from './Calculator';
import { contentKo } from './content.ko';

export const movingCostTool = defineTool({
  definition,
  content: { ko: contentKo },
  Calculator,
});
