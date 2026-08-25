import { siteConfig } from '@/config/site';
import type { SitePageContentMap } from './types';
import { SITE_PAGE_UPDATED_AT } from './types';

export const contactContent: SitePageContentMap = {
  ko: {
    title: '문의',
    seoTitle: '문의',
    seoDescription:
      '계산 오류 신고, 기준값 갱신 요청, 새 계산기 제안, 제휴 문의를 받는 연락처를 안내합니다.',
    lead: `문의는 이메일로 받고 있습니다. ${siteConfig.contactEmail} 으로 보내주시면 확인 후 답변드립니다.`,
    updatedAt: SITE_PAGE_UPDATED_AT,
    sections: [
      {
        heading: '이런 문의를 환영합니다',
        paragraphs: [
          '계산 결과가 실제와 다르거나, 기준값이 오래된 경우 알려주시면 우선순위를 높여 확인합니다.',
          '필요한 계산기가 있는데 사이트에 없다면 어떤 상황에서 필요한지 함께 적어주세요. 실제 사용 맥락이 있으면 만들기가 훨씬 수월합니다.',
        ],
        bullets: [
          '계산 오류 신고 (입력값과 예상 결과를 함께 적어주시면 빠릅니다)',
          '기준값·요율 갱신 요청',
          '새 계산기 제안',
          '오탈자·번역 개선 제안',
          '제휴·광고 문의',
        ],
      },
      {
        heading: '답변까지 걸리는 시간',
        paragraphs: [
          '보통 2~3일 안에 답변드립니다. 계산 오류처럼 다른 이용자에게도 영향이 있는 내용은 먼저 확인합니다.',
          '답변이 필요 없는 제안이라도 확인 후 반영 여부를 검토합니다.',
        ],
      },
      {
        heading: '문의 전 확인해 주세요',
        paragraphs: [
          '결과가 예상과 다르다면 입력 단위(g/kg, ml/L)와 세전·세후 기준을 먼저 확인해 주세요. 이 두 가지가 가장 흔한 원인입니다.',
          '제도 종속 계산(전기요금·급여)은 각 페이지 하단의 적용 기준일을 함께 확인해 주세요.',
        ],
      },
      {
        heading: '연락처',
        paragraphs: [`이메일: ${siteConfig.contactEmail}`],
      },
    ],
  },
  en: {
    title: 'Contact',
    seoTitle: 'Contact',
    seoDescription:
      'How to report a calculation error, request an updated figure, suggest a new calculator or ask about partnerships.',
    lead: `Email is the best way to reach us: ${siteConfig.contactEmail}.`,
    updatedAt: SITE_PAGE_UPDATED_AT,
    sections: [
      {
        heading: 'What to write about',
        paragraphs: [
          'If a result does not match reality, or a figure is out of date, telling us moves it up the queue.',
          'If a calculator you need is missing, describe the situation you need it for. Real context makes a much better tool.',
        ],
        bullets: [
          'Calculation errors — include your inputs and the expected result',
          'Outdated rates or reference figures',
          'Suggestions for new calculators',
          'Typos and translation improvements',
          'Partnership or advertising enquiries',
        ],
      },
      {
        heading: 'Response time',
        paragraphs: [
          'Most emails are answered within two to three days. Reports that affect other users are looked at first.',
          'Even suggestions that need no reply are reviewed.',
        ],
      },
      {
        heading: 'Before you write',
        paragraphs: [
          'If a result looks wrong, check the units (grams against kilograms, millilitres against litres) and whether figures are before or after tax. Those are the two most common causes.',
          'For rule-dependent tools, check the basis date shown at the bottom of the page.',
        ],
      },
      {
        heading: 'Address',
        paragraphs: [`Email: ${siteConfig.contactEmail}`],
      },
    ],
  },
  ja: {
    title: 'お問い合わせ',
    seoTitle: 'お問い合わせ',
    seoDescription:
      '計算の誤りのご報告、基準値の更新依頼、新しい計算ツールのご提案、提携のご相談を受け付けています。',
    lead: `お問い合わせはメールで受け付けています。${siteConfig.contactEmail} までご連絡ください。`,
    updatedAt: SITE_PAGE_UPDATED_AT,
    sections: [
      {
        heading: 'こんなご連絡を歓迎します',
        paragraphs: [
          '計算結果が実際と異なる場合や、基準値が古い場合はお知らせください。優先して確認します。',
          '必要な計算ツールが見つからない場合は、どんな場面で必要かも書き添えてください。実際の利用場面が分かると作りやすくなります。',
        ],
        bullets: [
          '計算の誤りのご報告（入力値と想定結果を添えていただけると助かります）',
          '基準値・料率の更新依頼',
          '新しい計算ツールのご提案',
          '誤字・翻訳の改善提案',
          '提携・広告のご相談',
        ],
      },
      {
        heading: '返信までの目安',
        paragraphs: [
          '通常2〜3日以内に返信します。ほかの利用者にも影響する内容は先に確認します。',
          '返信が不要なご提案も、反映の可否を検討します。',
        ],
      },
      {
        heading: 'お問い合わせ前のご確認',
        paragraphs: [
          '結果が想定と違う場合は、まず単位（g と kg、ml と L）と税込・税抜、額面・手取りの区別をご確認ください。原因の多くはこの2点です。',
          '制度依存の計算（電気料金・給与）は、各ページ下部の適用基準日もご確認ください。',
        ],
      },
      {
        heading: '連絡先',
        paragraphs: [`メール： ${siteConfig.contactEmail}`],
      },
    ],
  },
};
