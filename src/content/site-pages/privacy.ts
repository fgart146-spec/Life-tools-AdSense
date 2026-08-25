import { siteConfig } from '@/config/site';
import type { SitePageContentMap } from './types';
import { SITE_PAGE_UPDATED_AT } from './types';

export const privacyContent: SitePageContentMap = {
  ko: {
    title: '개인정보처리방침',
    seoTitle: '개인정보처리방침',
    seoDescription:
      '계산 입력값은 서버로 전송되지 않습니다. 이 사이트가 수집하는 정보와 광고·분석 도구의 쿠키 사용을 설명합니다.',
    lead: '이 사이트는 계산에 입력한 값을 서버로 보내지 않습니다. 아래는 그 외에 수집될 수 있는 정보와 이용 목적입니다.',
    updatedAt: SITE_PAGE_UPDATED_AT,
    sections: [
      {
        heading: '1. 계산 입력값',
        paragraphs: [
          '가격, 사용량, 급여 등 계산기에 입력하는 모든 값은 사용자의 브라우저 안에서만 처리됩니다. 서버로 전송되지 않으며 저장되지 않습니다.',
          '최근 사용한 도구처럼 편의 기능이 추가될 경우에도, 해당 정보는 브라우저의 로컬 저장소에만 보관되며 서버로 전송되지 않습니다.',
        ],
      },
      {
        heading: '2. 회원가입과 개인정보',
        paragraphs: [
          '이 사이트는 회원가입 기능을 제공하지 않으며, 이름·연락처·주소 등 개인을 식별할 수 있는 정보를 직접 수집하지 않습니다.',
          '문의 이메일을 보내신 경우, 답변을 위해 필요한 범위에서만 해당 내용을 보관하며 목적 달성 후 파기합니다.',
        ],
      },
      {
        heading: '3. 자동으로 수집되는 정보',
        paragraphs: [
          '웹사이트 이용 과정에서 접속 로그, 브라우저 종류, 방문한 페이지 등 일반적인 이용 정보가 자동으로 수집될 수 있습니다. 이 정보는 서비스 개선과 오류 파악을 위해 사용됩니다.',
        ],
        bullets: [
          'Google Analytics 4 — 방문 페이지, 방문 시간, 기기·브라우저 정보 등 익명 통계',
          'Google Search Console — 검색 노출·클릭 통계(개인 식별 정보 없음)',
          'Google AdSense — 광고 게재 및 성과 측정을 위한 쿠키(설정 시)',
        ],
      },
      {
        heading: '4. 광고와 쿠키',
        paragraphs: [
          '이 사이트에는 Google AdSense를 포함한 제3자 광고가 게재될 수 있습니다. Google을 포함한 제3자 공급업체는 쿠키를 사용하여 사용자의 이전 방문 기록을 바탕으로 광고를 게재할 수 있습니다.',
          'Google의 광고 쿠키 사용은 Google 광고 설정(https://adssettings.google.com)에서 사용자가 직접 비활성화할 수 있습니다. 또한 브라우저 설정에서 쿠키를 차단하거나 삭제할 수 있습니다.',
          '제3자 공급업체의 개인정보 처리에 관한 자세한 내용은 https://policies.google.com/technologies/ads 에서 확인할 수 있습니다.',
        ],
      },
      {
        heading: '5. 개인정보의 제3자 제공',
        paragraphs: [
          '이 사이트는 이용자의 개인정보를 제3자에게 판매하거나 임의로 제공하지 않습니다. 법령에 따라 요구되는 경우에만 관련 절차에 따라 제공될 수 있습니다.',
        ],
      },
      {
        heading: '6. 아동의 개인정보',
        paragraphs: [
          '이 사이트는 만 14세 미만 아동을 대상으로 하지 않으며, 아동의 개인정보를 의도적으로 수집하지 않습니다.',
        ],
      },
      {
        heading: '7. 이용자의 권리',
        paragraphs: [
          '이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다. 다만 일부 기능의 동작이 제한될 수 있습니다.',
          '수집된 정보와 관련해 문의사항이 있으면 아래 연락처로 요청하실 수 있습니다.',
        ],
      },
      {
        heading: '8. 문의처',
        paragraphs: [
          `개인정보 관련 문의: ${siteConfig.contactEmail}`,
          '이 방침이 변경되는 경우, 변경 내용과 시행일을 이 페이지에 게시합니다.',
        ],
      },
    ],
  },
  en: {
    title: 'Privacy policy',
    seoTitle: 'Privacy policy',
    seoDescription:
      'Calculator inputs never leave your browser. This page explains what else may be collected and how advertising and analytics cookies are used.',
    lead: 'The numbers you type into a calculator are never sent to a server. This page covers everything else.',
    updatedAt: SITE_PAGE_UPDATED_AT,
    sections: [
      {
        heading: '1. Calculator inputs',
        paragraphs: [
          'Prices, usage figures, salaries and every other value you enter are processed entirely in your browser. They are not transmitted to a server and are not stored by us.',
          'If convenience features such as recently used tools are added, that information stays in your browser local storage only.',
        ],
      },
      {
        heading: '2. Accounts and personal data',
        paragraphs: [
          'There is no sign-up on this site, and we do not directly collect names, phone numbers or addresses.',
          'If you email us, we keep the message only as long as needed to answer it.',
        ],
      },
      {
        heading: '3. Information collected automatically',
        paragraphs: [
          'Standard usage information — access logs, browser type, pages visited — may be collected while you browse. It is used to improve the service and diagnose errors.',
        ],
        bullets: [
          'Google Analytics 4 — anonymous statistics such as pages viewed and device type',
          'Google Search Console — search impression and click statistics, no personal identifiers',
          'Google AdSense — cookies used for serving and measuring ads, when enabled',
        ],
      },
      {
        heading: '4. Advertising and cookies',
        paragraphs: [
          'Third-party advertising, including Google AdSense, may appear on this site. Third-party vendors, including Google, use cookies to serve ads based on a user prior visits to this or other websites.',
          'You can opt out of personalised advertising at https://adssettings.google.com, and you can block or delete cookies in your browser settings.',
          'More detail on how partners use data is available at https://policies.google.com/technologies/ads.',
        ],
      },
      {
        heading: '5. Sharing with third parties',
        paragraphs: [
          'We do not sell personal information, and we do not share it except where required by law.',
        ],
      },
      {
        heading: '6. Children',
        paragraphs: [
          'This site is not directed at children and we do not knowingly collect personal information from them.',
        ],
      },
      {
        heading: '7. Your choices',
        paragraphs: [
          'You can refuse cookies in your browser settings, although some features may then behave differently.',
          'For any question about the information described here, use the contact address below.',
        ],
      },
      {
        heading: '8. Contact',
        paragraphs: [
          `Privacy enquiries: ${siteConfig.contactEmail}`,
          'If this policy changes, the change and its effective date will be posted on this page.',
        ],
      },
    ],
  },
  ja: {
    title: 'プライバシーポリシー',
    seoTitle: 'プライバシーポリシー',
    seoDescription:
      '計算に入力した値はサーバーへ送信されません。それ以外に収集される可能性がある情報と、広告・分析クッキーの利用について説明します。',
    lead: '計算機に入力した数値はサーバーへ送信されません。このページではそれ以外の情報について説明します。',
    updatedAt: SITE_PAGE_UPDATED_AT,
    sections: [
      {
        heading: '1. 計算の入力値',
        paragraphs: [
          '価格・使用量・給与など、計算機に入力したすべての値はブラウザ内でのみ処理されます。サーバーへ送信されず、保存もされません。',
          '「最近使ったツール」などの利便機能を追加する場合も、その情報はブラウザのローカルストレージにのみ保存されます。',
        ],
      },
      {
        heading: '2. 会員登録と個人情報',
        paragraphs: [
          '当サイトに会員登録機能はなく、氏名・連絡先・住所などの個人を特定できる情報を直接収集しません。',
          'お問い合わせメールをいただいた場合は、回答に必要な範囲でのみ内容を保管し、目的達成後に削除します。',
        ],
      },
      {
        heading: '3. 自動的に収集される情報',
        paragraphs: [
          'サイト利用時に、アクセスログ・ブラウザの種類・閲覧ページなど一般的な利用情報が自動的に収集される場合があります。サービス改善と不具合把握に利用します。',
        ],
        bullets: [
          'Google Analytics 4 — 閲覧ページや端末情報などの匿名統計',
          'Google Search Console — 検索の表示・クリック統計（個人を特定する情報は含みません）',
          'Google AdSense — 広告配信と効果測定のためのクッキー（設定時）',
        ],
      },
      {
        heading: '4. 広告とクッキー',
        paragraphs: [
          '当サイトには Google AdSense を含む第三者配信の広告が表示される場合があります。Google を含む第三者配信事業者は、クッキーを使用して過去のアクセス情報に基づく広告を表示することがあります。',
          'パーソナライズ広告は https://adssettings.google.com で無効にできます。ブラウザ設定でクッキーを拒否・削除することも可能です。',
          '第三者配信事業者のデータ利用については https://policies.google.com/technologies/ads をご確認ください。',
        ],
      },
      {
        heading: '5. 第三者提供',
        paragraphs: [
          '個人情報を販売することはありません。法令に基づく場合を除き、第三者へ提供することもありません。',
        ],
      },
      {
        heading: '6. 子どもの個人情報',
        paragraphs: [
          '当サイトは子どもを対象としておらず、子どもの個人情報を意図的に収集することはありません。',
        ],
      },
      {
        heading: '7. 利用者の選択',
        paragraphs: [
          'ブラウザ設定でクッキーの保存を拒否できます。ただし一部の機能の動作が変わる場合があります。',
          '本ページの内容についてご質問がある場合は、下記の連絡先までご連絡ください。',
        ],
      },
      {
        heading: '8. お問い合わせ',
        paragraphs: [
          `プライバシーに関するお問い合わせ： ${siteConfig.contactEmail}`,
          '本ポリシーを変更する場合は、変更内容と施行日をこのページに掲載します。',
        ],
      },
    ],
  },
};
