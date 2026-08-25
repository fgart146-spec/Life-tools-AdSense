import { siteConfig } from '@/config/site';
import type { SitePageContentMap } from './types';
import { SITE_PAGE_UPDATED_AT } from './types';

export const aboutContent: SitePageContentMap = {
  ko: {
    title: '사이트 소개',
    seoTitle: '사이트 소개',
    seoDescription:
      '생활계산소는 돈 쓰기 전에 한 번 확인할 수 있는 무료 생활·경제 계산기를 제공합니다. 어떤 기준으로 계산하고 무엇을 하지 않는지 정리했습니다.',
    lead: '생활계산소는 장보기·생활비·급여·판매처럼 돈과 관련된 결정을 내리기 전에 숫자를 확인할 수 있게 만든 사이트입니다.',
    updatedAt: SITE_PAGE_UPDATED_AT,
    sections: [
      {
        heading: '무엇을 하는 사이트인가요',
        paragraphs: [
          '용량이 다른 상품 중 어느 쪽이 실제로 싼지, 에어컨을 하루 몇 시간 켜면 전기요금이 얼마나 늘어나는지, 연봉에서 세금을 빼면 얼마가 남는지 — 이런 계산을 회원가입 없이 바로 할 수 있습니다.',
          '단순히 숫자만 출력하지 않습니다. 어떤 기준으로 계산했는지, 결과가 무슨 뜻인지, 조건이 바뀌면 어떻게 되는지를 함께 설명합니다.',
        ],
      },
      {
        heading: '계산은 어디서 이루어지나요',
        paragraphs: [
          '모든 계산은 사용자의 브라우저 안에서 이루어집니다. 입력한 금액이나 급여 정보는 서버로 전송되지 않고 저장되지도 않습니다.',
          '페이지는 대부분 미리 생성된 정적 문서로 제공되므로, 계산 때문에 서버에 요청이 발생하지 않습니다.',
        ],
      },
      {
        heading: '기준과 출처',
        paragraphs: [
          '전기요금, 4대보험 요율, 최저임금처럼 제도에 따라 달라지는 값은 적용 기준일과 근거를 각 페이지에 표시합니다.',
          '음식량이나 이사비처럼 공식 표준이 없는 항목은 "일반적인 가정 기준"임을 명시하고, 사용자가 직접 값을 조정할 수 있게 만들었습니다.',
        ],
        bullets: [
          '제도 종속 계산: 기준일 + 출처 표기',
          '관행 기준 계산: 기준 근거 명시 + 사용자 조정 가능',
          '요율 변경 시 관리자 화면에서 기준값을 갱신',
        ],
      },
      {
        heading: '하지 않는 것',
        paragraphs: [
          '이 사이트는 특정 상품이나 금융상품을 추천하지 않습니다. 투자·세무·법률 자문을 제공하지도 않습니다.',
          '광고를 더 보여주기 위해 계산 과정을 나누거나, 결과를 보기 위해 여러 번 클릭하게 만드는 구성을 사용하지 않습니다.',
        ],
      },
      {
        heading: '운영과 문의',
        paragraphs: [
          `계산 결과가 이상하거나 기준값이 오래되었다면 알려주세요. ${siteConfig.contactEmail} 으로 연락하실 수 있습니다.`,
          '어떤 계산기가 더 필요한지에 대한 제안도 환영합니다. 실제로 반복해서 쓰이는 계산을 우선해서 추가하고 있습니다.',
        ],
      },
    ],
  },
  en: {
    title: 'About this site',
    seoTitle: 'About',
    seoDescription:
      'Free everyday money calculators with the reasoning shown: what basis each result uses, what it means, and what this site deliberately does not do.',
    lead: 'This site exists so you can check the numbers before a spending decision — groceries, household bills, pay and pricing.',
    updatedAt: SITE_PAGE_UPDATED_AT,
    sections: [
      {
        heading: 'What it does',
        paragraphs: [
          'Work out which pack size is genuinely cheaper, what an appliance adds to your electricity bill, or what a price leaves you after fees — without creating an account.',
          'Every tool explains the basis of the calculation, what the result means and how it changes when your inputs change.',
        ],
      },
      {
        heading: 'Where the calculation happens',
        paragraphs: [
          'Everything is calculated in your browser. The numbers you type are never sent to a server and are not stored.',
          'Pages are pre-rendered static documents, so using a calculator does not create a server request.',
        ],
      },
      {
        heading: 'Basis and sources',
        paragraphs: [
          'Where rules or rates apply — electricity tariffs, social insurance rates, minimum wage — the page states the date the figures were checked and what they are based on.',
          'Where no official standard exists, such as portion sizes, the page says so plainly and lets you adjust the assumptions yourself.',
        ],
      },
      {
        heading: 'What it does not do',
        paragraphs: [
          'This site does not recommend products or financial services, and it does not provide investment, tax or legal advice.',
          'It also does not split a calculation across steps or hide results behind extra clicks in order to show more advertising.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          `If a result looks wrong or a figure is out of date, please tell us at ${siteConfig.contactEmail}.`,
          'Suggestions for new calculators are welcome. Tools people use repeatedly are prioritised.',
        ],
      },
    ],
  },
  ja: {
    title: 'サイトについて',
    seoTitle: 'サイトについて',
    seoDescription:
      '暮らしとお金の計算を、根拠つきで確認できる無料ツール集です。何を基準に計算し、何をしないのかをまとめました。',
    lead: '買い物・光熱費・給与・販売価格など、お金に関わる判断の前に数字を確認できるようにしたサイトです。',
    updatedAt: SITE_PAGE_UPDATED_AT,
    sections: [
      {
        heading: 'できること',
        paragraphs: [
          '容量の違う商品のどちらが安いか、家電を使うと電気代がいくら増えるか、価格から手数料を引くといくら残るか。登録なしですぐ計算できます。',
          '数字を出すだけでなく、どんな基準で計算したのか、結果が何を意味するのか、条件が変わるとどうなるかも合わせて説明します。',
        ],
      },
      {
        heading: '計算はどこで行われるか',
        paragraphs: [
          'すべての計算はブラウザ内で行われます。入力した金額や給与情報がサーバーへ送信・保存されることはありません。',
          'ページはあらかじめ生成された静的文書として配信されるため、計算のたびにサーバーへ問い合わせは発生しません。',
        ],
      },
      {
        heading: '基準と出典',
        paragraphs: [
          '電気料金や保険料率など制度によって変わる値は、適用基準日と根拠を各ページに表示します。',
          '食材の量のように公式な標準がないものは「一般的な家庭の目安」であることを明記し、利用者が値を調整できるようにしています。',
        ],
      },
      {
        heading: 'しないこと',
        paragraphs: [
          '特定の商品や金融商品を推奨しません。投資・税務・法務の助言も行いません。',
          '広告表示を増やすために計算を分割したり、結果を見るために余計なクリックを求める構成も採用しません。',
        ],
      },
      {
        heading: 'お問い合わせ',
        paragraphs: [
          `計算結果や基準値に誤りがあれば ${siteConfig.contactEmail} までご連絡ください。`,
          '追加してほしい計算ツールのご要望も歓迎します。繰り返し使われる計算を優先して追加しています。',
        ],
      },
    ],
  },
};
