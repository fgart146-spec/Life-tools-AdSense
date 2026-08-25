import { siteConfig } from '@/config/site';
import type { SitePageContentMap } from './types';
import { SITE_PAGE_UPDATED_AT } from './types';

export const disclaimerContent: SitePageContentMap = {
  ko: {
    title: '면책조항',
    seoTitle: '면책조항',
    seoDescription:
      '계산 결과는 참고용입니다. 제도 종속 계산의 기준일, 입력값 오류 가능성, 공식 기관 확인이 필요한 경우를 안내합니다.',
    lead: '이 사이트의 모든 계산 결과는 참고용 추정치입니다. 실제 금액과 차이가 날 수 있는 이유를 아래에 정리했습니다.',
    updatedAt: SITE_PAGE_UPDATED_AT,
    sections: [
      {
        heading: '1. 결과는 참고용입니다',
        paragraphs: [
          '이 사이트의 계산기는 일반적인 조건을 가정해 계산합니다. 개별 계약, 지역, 사업자 정책, 예외 규정은 반영되지 않습니다.',
          '따라서 결과는 "대략 이 정도"를 파악하는 용도로만 사용하시고, 실제 금액은 고지서·급여명세서·계약서로 확인하시기 바랍니다.',
        ],
      },
      {
        heading: '2. 제도 종속 계산의 기준일',
        paragraphs: [
          '전기요금, 4대보험 요율, 소득세, 최저임금처럼 제도에 따라 달라지는 값은 개정될 수 있습니다.',
          '각 도구 페이지 하단에 적용 기준일과 출처를 표시하고 있으니, 기준일 이후 제도가 바뀌었다면 결과가 실제와 다를 수 있습니다.',
        ],
        bullets: [
          '전기요금: 한국전력 요금표 개정 시 변동',
          '4대보험 요율·최저임금: 매년 변경',
          '소득세: 간이세액표가 아닌 근사 계산이며 연말정산으로 정산됨',
        ],
      },
      {
        heading: '3. 관행 기준 계산',
        paragraphs: [
          '음식량, 이사비용, 김장 재료처럼 공식 표준이 없는 항목은 일반적인 가정 기준을 사용합니다.',
          '가구 상황, 지역, 업체에 따라 편차가 크므로, 결과를 그대로 적용하기보다 출발점으로 삼고 조정하시기 바랍니다.',
        ],
      },
      {
        heading: '4. 입력값 오류',
        paragraphs: [
          '계산 결과는 입력한 값에 전적으로 의존합니다. 단위(g/kg, ml/L), 부가세 포함 여부, 세전/세후 구분을 혼동하면 결과가 크게 달라집니다.',
          '결과가 예상과 많이 다르다면 입력 단위와 기준을 먼저 확인해 보세요.',
        ],
      },
      {
        heading: '5. 전문가 상담이 필요한 경우',
        paragraphs: [
          '세금 신고, 퇴직금 산정, 근로조건 분쟁, 사업 계약처럼 법적 효력이 있는 사안은 반드시 공식 기관이나 전문가의 확인이 필요합니다.',
          '이 사이트는 세무·법률·투자 자문을 제공하지 않으며, 결과를 근거로 한 판단의 책임은 이용자에게 있습니다.',
        ],
        bullets: [
          '세금: 국세청 홈택스 또는 세무 전문가',
          '근로조건·퇴직금: 고용노동부 상담(1350) 또는 관할 고용노동청',
          '전기요금: 한국전력 고객센터(123)',
        ],
      },
      {
        heading: '6. 오류 신고',
        paragraphs: [
          `계산 오류나 오래된 기준값을 발견하시면 ${siteConfig.contactEmail} 으로 알려주세요. 확인 후 신속히 수정하겠습니다.`,
        ],
      },
    ],
  },
  en: {
    title: 'Disclaimer',
    seoTitle: 'Disclaimer',
    seoDescription:
      'Results are estimates for guidance. This page explains the assumptions, the basis dates for rule-dependent figures and when to consult an official source.',
    lead: 'Every result on this site is an estimate for guidance. Here is why it can differ from the amount you actually pay or receive.',
    updatedAt: SITE_PAGE_UPDATED_AT,
    sections: [
      {
        heading: '1. Guidance, not a quotation',
        paragraphs: [
          'The calculators assume ordinary conditions. Individual contracts, regional rules, provider policies and exceptions are not modelled.',
          'Use the result to get a sense of scale, and confirm the real figure on your bill, payslip or contract.',
        ],
      },
      {
        heading: '2. Rule-dependent figures have a basis date',
        paragraphs: [
          'Tariffs, insurance rates, income tax and minimum wage change over time.',
          'Each tool shows the date its figures were checked. If the rules changed after that date, the result may no longer match.',
        ],
      },
      {
        heading: '3. Conventional assumptions',
        paragraphs: [
          'For things like portion sizes or moving costs there is no official standard, so common household assumptions are used.',
          'Variation is wide. Treat the result as a starting point and adjust it to your own situation.',
        ],
      },
      {
        heading: '4. Input errors',
        paragraphs: [
          'Results depend entirely on what you enter. Mixing units (g and kg, ml and litres), or tax-inclusive with tax-exclusive figures, changes the answer substantially.',
          'If a result looks far off, check the units and the basis of your inputs first.',
        ],
      },
      {
        heading: '5. When to seek professional advice',
        paragraphs: [
          'Tax filings, severance calculations, employment disputes and business contracts have legal consequences and should be confirmed with an official body or a qualified professional.',
          'This site does not provide tax, legal or investment advice, and decisions made using it remain your responsibility.',
        ],
      },
      {
        heading: '6. Reporting an error',
        paragraphs: [
          `If you find a calculation error or an outdated figure, please write to ${siteConfig.contactEmail} and it will be corrected.`,
        ],
      },
    ],
  },
  ja: {
    title: '免責事項',
    seoTitle: '免責事項',
    seoDescription:
      '計算結果は参考値です。前提条件、制度依存の数値の基準日、公式機関への確認が必要な場合について説明します。',
    lead: '当サイトの計算結果はすべて参考のための概算です。実際の金額と差が出る理由をまとめました。',
    updatedAt: SITE_PAGE_UPDATED_AT,
    sections: [
      {
        heading: '1. 結果は参考値です',
        paragraphs: [
          '各計算機は一般的な条件を前提としています。個別の契約、地域、事業者の方針、例外規定は反映されません。',
          '規模感をつかむ用途にとどめ、実際の金額は請求書・給与明細・契約書でご確認ください。',
        ],
      },
      {
        heading: '2. 制度依存の数値には基準日があります',
        paragraphs: [
          '料金、保険料率、所得税、最低賃金などは改定されることがあります。',
          '各ツールに適用基準日を表示しています。基準日以降に制度が変わっている場合、結果が実際と異なることがあります。',
        ],
      },
      {
        heading: '3. 慣行に基づく前提',
        paragraphs: [
          '食材の量や引っ越し費用のように公式な標準がないものは、一般的な家庭の目安を使用しています。',
          'ばらつきが大きいため、そのまま適用せず出発点として調整してください。',
        ],
      },
      {
        heading: '4. 入力値の誤り',
        paragraphs: [
          '結果は入力値に完全に依存します。単位（g と kg、ml と L）や税込・税抜、額面・手取りの取り違えで結果は大きく変わります。',
          '想定と大きく違う場合は、まず単位と前提を確認してください。',
        ],
      },
      {
        heading: '5. 専門家への相談が必要な場合',
        paragraphs: [
          '税務申告、退職金の算定、労働条件の紛争、事業契約など法的効力のある事項は、必ず公式機関や専門家にご確認ください。',
          '当サイトは税務・法務・投資の助言を行いません。結果に基づく判断の責任は利用者にあります。',
        ],
      },
      {
        heading: '6. 誤りのご報告',
        paragraphs: [
          `計算の誤りや古い基準値を見つけた場合は ${siteConfig.contactEmail} までご連絡ください。確認のうえ速やかに修正します。`,
        ],
      },
    ],
  },
};
