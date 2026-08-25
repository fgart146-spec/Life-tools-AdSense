import type { ComponentType } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';
import type {
  ToolContent,
  ToolDefinition,
  ToolModule,
  ToolRenderContext,
} from '@/lib/tools/types';
import type { EffectiveBasis } from '@/lib/admin/basis';

/** 모든 계산기가 공통으로 쓰는 UI 문자열 (도구별 content에 중복 작성하지 않는다) */
export interface CalculatorCommonCopy {
  inputTitle: string;
  reset: string;
  resultTitle: string;
  resultDetail: string;
  placeholder: string;
  issuesTitle: string;
  breakdownTitle: string;
  savingsTitle: string;
}

export function commonCalculatorCopy(locale: Locale): CalculatorCommonCopy {
  const dict = getDictionary(locale);
  return {
    inputTitle: dict.tool.inputTitle,
    reset: dict.common.reset,
    resultTitle: dict.common.result,
    resultDetail: dict.common.resultDetail,
    placeholder: dict.tool.resultPlaceholder,
    issuesTitle: dict.tool.inputIssues,
    breakdownTitle: dict.tool.breakdownTitle,
    savingsTitle: dict.tool.savingsTitle,
  };
}

export interface CalculatorProps<TCopy> {
  locale: Locale;
  copy: TCopy;
  common: CalculatorCommonCopy;
  /** 관리자 기준값. 제도 종속 계산기만 사용한다. */
  basis?: EffectiveBasis;
}

/**
 * 도구 모듈 정의 헬퍼.
 * 도구별 copy 타입을 이 함수 안에서 고정하고, 레지스트리에는 공통 타입으로 노출한다.
 */
export function defineTool<TCopy>(options: {
  definition: ToolDefinition;
  content: Partial<Record<Locale, ToolContent<TCopy>>>;
  Calculator: ComponentType<CalculatorProps<TCopy>>;
}): ToolModule {
  const { definition, content, Calculator } = options;

  return {
    definition,
    content,
    render: (locale: Locale, context?: ToolRenderContext) => {
      const localeContent = content[locale];
      if (!localeContent) return null;
      return (
        <Calculator
          locale={locale}
          copy={localeContent.ui}
          common={commonCalculatorCopy(locale)}
          basis={context?.basis}
        />
      );
    },
  };
}
