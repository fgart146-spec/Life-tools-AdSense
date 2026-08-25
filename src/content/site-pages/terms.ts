import { siteConfig } from '@/config/site';
import type { SitePageContentMap } from './types';
import { SITE_PAGE_UPDATED_AT } from './types';

export const termsContent: SitePageContentMap = {
  ko: {
    title: '이용약관',
    seoTitle: '이용약관',
    seoDescription:
      '생활계산소 서비스 이용 조건, 계산 결과의 성격, 저작권과 책임 범위를 안내합니다.',
    lead: '이 약관은 생활계산소(이하 "사이트")가 제공하는 서비스의 이용 조건을 정합니다. 사이트를 이용하면 이 약관에 동의한 것으로 봅니다.',
    updatedAt: SITE_PAGE_UPDATED_AT,
    sections: [
      {
        heading: '1. 서비스의 내용',
        paragraphs: [
          '사이트는 생활·경제와 관련된 계산 도구와 설명 콘텐츠를 무료로 제공합니다.',
          '회원가입 없이 누구나 이용할 수 있으며, 별도의 이용료를 청구하지 않습니다.',
        ],
      },
      {
        heading: '2. 계산 결과의 성격',
        paragraphs: [
          '사이트가 제공하는 모든 계산 결과는 참고용 정보입니다. 실제 요금·세금·급여·수익은 계약 조건, 법령, 사업자 정책, 개별 상황에 따라 달라질 수 있습니다.',
          '중요한 금전적·법률적 판단은 반드시 공식 기관이나 전문가의 확인을 거치시기 바랍니다.',
        ],
      },
      {
        heading: '3. 이용자의 책임',
        paragraphs: [
          '계산 결과는 이용자가 입력한 값에 따라 달라집니다. 입력값의 정확성은 이용자 책임입니다.',
          '사이트의 콘텐츠를 무단으로 대량 수집(크롤링), 복제, 재배포하거나 자동화된 방법으로 과도한 부하를 유발하는 행위는 금지됩니다.',
        ],
      },
      {
        heading: '4. 저작권',
        paragraphs: [
          '사이트에 게시된 텍스트, 계산 로직, 디자인의 저작권은 운영자에게 있습니다.',
          '개인적·비상업적 목적의 인용은 출처를 밝히는 조건으로 가능합니다. 상업적 이용이나 전재를 원하실 경우 사전에 문의해 주세요.',
        ],
      },
      {
        heading: '5. 서비스의 변경과 중단',
        paragraphs: [
          '운영자는 서비스의 내용을 변경하거나 일부 도구의 제공을 중단할 수 있습니다. 중요한 변경이 있을 경우 사이트에 안내합니다.',
          '시스템 점검, 장애, 천재지변 등의 사유로 서비스 제공이 일시적으로 중단될 수 있습니다.',
        ],
      },
      {
        heading: '6. 책임의 제한',
        paragraphs: [
          '운영자는 계산 결과를 신뢰하여 이용자가 내린 결정과 그 결과에 대해 법적 책임을 지지 않습니다.',
          '다만 명백한 계산 오류나 기준값 오류가 확인되면 신속히 수정하고, 필요한 경우 해당 내용을 페이지에 안내합니다.',
        ],
      },
      {
        heading: '7. 광고',
        paragraphs: [
          '사이트에는 제3자 광고가 게재될 수 있습니다. 광고 내용과 광고주의 상품·서비스에 대해 운영자는 보증하지 않으며, 거래는 이용자와 광고주 사이에서 이루어집니다.',
        ],
      },
      {
        heading: '8. 약관의 변경과 문의',
        paragraphs: [
          '이 약관은 변경될 수 있으며, 변경 시 이 페이지에 게시합니다.',
          `문의: ${siteConfig.contactEmail}`,
        ],
      },
    ],
  },
  en: {
    title: 'Terms of use',
    seoTitle: 'Terms of use',
    seoDescription:
      'The conditions for using this site, the status of calculation results, copyright and the limits of liability.',
    lead: 'These terms govern the use of this site. By using it, you accept them.',
    updatedAt: SITE_PAGE_UPDATED_AT,
    sections: [
      {
        heading: '1. The service',
        paragraphs: [
          'The site provides free calculators and explanatory content on everyday money topics.',
          'No account is required and no fee is charged.',
        ],
      },
      {
        heading: '2. Nature of the results',
        paragraphs: [
          'All results are for guidance only. Actual bills, taxes, pay and profit depend on contracts, legislation, provider policies and individual circumstances.',
          'For decisions that matter financially or legally, confirm the figures with the relevant authority or a qualified professional.',
        ],
      },
      {
        heading: '3. Your responsibilities',
        paragraphs: [
          'Results follow from the values you enter; their accuracy is your responsibility.',
          'Bulk scraping, copying or redistributing the content, or placing automated load on the site, is not permitted.',
        ],
      },
      {
        heading: '4. Copyright',
        paragraphs: [
          'The text, calculation logic and design on this site are the property of the operator.',
          'Short quotations for personal, non-commercial use are fine with attribution. Please ask before any commercial use or republication.',
        ],
      },
      {
        heading: '5. Changes and interruptions',
        paragraphs: [
          'The operator may change the service or withdraw individual tools. Significant changes will be announced on the site.',
          'Service may be interrupted temporarily for maintenance, faults or events outside our control.',
        ],
      },
      {
        heading: '6. Limitation of liability',
        paragraphs: [
          'The operator is not liable for decisions taken in reliance on a calculation result.',
          'Where a genuine calculation or data error is confirmed, it will be corrected promptly and, where relevant, noted on the page.',
        ],
      },
      {
        heading: '7. Advertising',
        paragraphs: [
          'Third-party advertising may appear on this site. The operator does not endorse advertised products or services; any transaction is between you and the advertiser.',
        ],
      },
      {
        heading: '8. Changes to these terms',
        paragraphs: [
          'These terms may be updated, and any update will be posted on this page.',
          `Contact: ${siteConfig.contactEmail}`,
        ],
      },
    ],
  },
  ja: {
    title: '利用規約',
    seoTitle: '利用規約',
    seoDescription:
      '当サイトの利用条件、計算結果の位置づけ、著作権と責任の範囲について説明します。',
    lead: '本規約は当サイトが提供するサービスの利用条件を定めるものです。サイトを利用された時点で本規約に同意したものとみなします。',
    updatedAt: SITE_PAGE_UPDATED_AT,
    sections: [
      {
        heading: '1. サービスの内容',
        paragraphs: [
          '当サイトは、暮らしとお金に関する計算ツールと解説コンテンツを無料で提供します。',
          '会員登録は不要で、利用料は発生しません。',
        ],
      },
      {
        heading: '2. 計算結果の位置づけ',
        paragraphs: [
          '提供するすべての計算結果は参考情報です。実際の料金・税金・給与・利益は、契約内容、法令、事業者の方針、個別の事情によって異なります。',
          '重要な金銭的・法的判断については、必ず公式機関や専門家にご確認ください。',
        ],
      },
      {
        heading: '3. 利用者の責任',
        paragraphs: [
          '計算結果は入力値によって変わります。入力値の正確性は利用者の責任となります。',
          'コンテンツの大量取得（クローリング）、複製、再配布、自動化された過度な負荷をかける行為は禁止します。',
        ],
      },
      {
        heading: '4. 著作権',
        paragraphs: [
          '当サイトに掲載するテキスト、計算ロジック、デザインの著作権は運営者に帰属します。',
          '個人的・非商業的な引用は出典を明記のうえ可能です。商業利用や転載をご希望の場合は事前にご連絡ください。',
        ],
      },
      {
        heading: '5. サービスの変更・中断',
        paragraphs: [
          '運営者はサービス内容を変更し、または一部ツールの提供を終了することがあります。重要な変更はサイト上でお知らせします。',
          'システム保守、障害、不可抗力などにより一時的に提供を中断する場合があります。',
        ],
      },
      {
        heading: '6. 免責',
        paragraphs: [
          '計算結果を信頼して行った判断とその結果について、運営者は法的責任を負いません。',
          'ただし明らかな計算誤りや基準値の誤りが確認された場合は速やかに修正し、必要に応じてページ上でお知らせします。',
        ],
      },
      {
        heading: '7. 広告',
        paragraphs: [
          '当サイトには第三者配信の広告が表示される場合があります。広告主の商品・サービスについて運営者は保証せず、取引は利用者と広告主の間で行われます。',
        ],
      },
      {
        heading: '8. 規約の変更・お問い合わせ',
        paragraphs: [
          '本規約は変更されることがあり、変更時はこのページに掲載します。',
          `お問い合わせ： ${siteConfig.contactEmail}`,
        ],
      },
    ],
  },
};
