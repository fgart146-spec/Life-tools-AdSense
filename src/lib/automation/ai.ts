import Anthropic from '@anthropic-ai/sdk';
import type { SuggestionDraft } from '@/lib/automation/analyze';

/**
 * AI 보강 (선택).
 *
 * ANTHROPIC_API_KEY가 설정된 경우에만 동작하며, 제안의 '설명'만 다듬는다.
 * 새 제안을 만들어 내거나 공개 콘텐츠를 자동으로 바꾸지 않는다.
 * 호출은 cron 배치에서만 발생한다(사용자 요청마다 호출하지 않는다).
 */
export function isAiConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

const SYSTEM_PROMPT = `당신은 생활·경제 실용도구 웹사이트의 콘텐츠 운영을 돕는 분석가입니다.
검색 데이터에서 뽑아낸 개선 후보 목록을 받고, 각 항목에 대해 운영자가 바로 판단할 수 있는 짧은 설명을 씁니다.

규칙:
- 항목 순서와 개수를 그대로 유지합니다.
- 각 설명은 한국어 2~3문장, 200자 이내로 씁니다.
- 무엇을 왜 해야 하는지, 어떤 선택지가 있는지 씁니다(기존 도구 보강 / 신규 도구 / 가이드 / 무시).
- 데이터에 없는 수치를 지어내지 않습니다.
- 마케팅 문구나 과장된 표현을 쓰지 않습니다.`;

interface EnrichedItem {
  index: number;
  rationale: string;
}

/**
 * 제안 목록의 rationale을 다듬어 돌려준다.
 * 실패하거나 미설정이면 입력을 그대로 돌려준다(자동화가 실패해도 흐름이 끊기지 않게).
 */
export async function enrichSuggestions(
  drafts: SuggestionDraft[],
): Promise<SuggestionDraft[]> {
  if (!isAiConfigured() || drafts.length === 0) return drafts;

  const client = new Anthropic();

  const items = drafts.map((draft, index) => ({
    index,
    kind: draft.kind,
    title: draft.title,
    query: draft.sourceQuery,
    facts: draft.payload,
  }));

  try {
    const response = await client.messages.create({
      model: 'claude-opus-5',
      max_tokens: 16000,
      system: SYSTEM_PROMPT,
      output_config: {
        format: {
          type: 'json_schema',
          schema: {
            type: 'object',
            additionalProperties: false,
            required: ['items'],
            properties: {
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  additionalProperties: false,
                  required: ['index', 'rationale'],
                  properties: {
                    index: { type: 'integer' },
                    rationale: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
      messages: [
        {
          role: 'user',
          content: `다음 개선 후보 목록의 설명을 다듬어 주세요.\n\n${JSON.stringify(items, null, 2)}`,
        },
      ],
    });

    const textBlock = response.content.find((block) => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') return drafts;

    const parsed = JSON.parse(textBlock.text) as { items?: EnrichedItem[] };
    if (!parsed.items) return drafts;

    const byIndex = new Map(parsed.items.map((item) => [item.index, item.rationale]));
    return drafts.map((draft, index) => ({
      ...draft,
      rationale: byIndex.get(index)?.trim() || draft.rationale,
    }));
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      console.warn('[ai] rate limited — 규칙 기반 설명을 그대로 사용합니다.');
    } else if (error instanceof Anthropic.APIError) {
      console.warn(`[ai] API 오류(${error.status}) — 규칙 기반 설명을 사용합니다.`);
    } else {
      console.warn('[ai] 보강 실패 — 규칙 기반 설명을 사용합니다.');
    }
    return drafts;
  }
}
