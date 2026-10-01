import { brandName, siteConfig } from '@/config/site';
import type { SitePageContentMap } from './types';

export const aboutContent: SitePageContentMap = {
  ko: {
    title: '사이트 소개',
    seoTitle: '사이트 소개',
    seoDescription:
      `${brandName('ko')}는 가격·비용을 계산하는 도구와 얼룩·세탁·청소 문제를 살피는 생활 안내를 제공합니다. 두 영역의 역할과 정보 기준을 소개합니다.`,
    lead: `${brandName('ko')}는 생활 속에서 숫자로 판단할 일에는 계산기를, 집안의 문제를 해결할 때에는 상황별 안내를 제공하는 사이트입니다.`,
    updatedAt: '2026-10-02',
    sections: [
      {
        heading: '무엇을 하는 사이트인가요',
        paragraphs: [
          '용량이 다른 상품 중 어느 쪽이 실제로 싼지, 에어컨을 하루 몇 시간 켜면 전기요금이 얼마나 늘어나는지, 연봉에서 세금을 빼면 얼마가 남는지 — 이런 계산을 회원가입 없이 바로 할 수 있습니다.',
          '계산 결과와 함께 계산식·가정·예시를 보여주어 입력값이 달라질 때 결과를 이해할 수 있도록 돕습니다.',
        ],
      },
      {
        heading: '생활백과는 언제 쓰나요',
        paragraphs: [
          '옷에 얼룩이 묻었거나 세탁기에서 냄새가 날 때처럼 답이 숫자가 아닌 문제는 생활백과에서 찾을 수 있습니다. 먼저 할 일, 소재·제품에 따라 달라지는 방법, 피해야 할 행동을 단계별로 정리합니다.',
          '청소나 세탁은 제품과 소재마다 허용되는 방법이 다릅니다. 글의 일반적인 순서를 참고하되 해당 제품의 라벨과 설명서를 먼저 확인하세요.',
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
          '전기요금, 보험료율, 최저임금처럼 바뀔 수 있는 숫자는 페이지의 기준일을 확인하세요. 개별 페이지의 출처 링크가 없는 설명은 공식 자료로 검증된 사실이라고 표시하지 않습니다.',
          '음식량이나 이사비처럼 공식 표준이 없는 항목은 "일반적인 가정 기준"임을 명시하고, 사용자가 직접 값을 조정할 수 있게 만들었습니다.',
        ],
        bullets: [
          '제도 종속 계산: 적용 기준일과 확인 가능한 자료를 함께 점검',
          '관행 기준 계산: 기준 근거 명시 + 사용자 조정 가능',
          '제품별 청소·세탁: 라벨과 제조사 설명서 우선',
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
          '계산 도구와 생활백과에서 다뤘으면 하는 상황에 대한 제안도 환영합니다. 정보 작성과 수정 원칙은 편집 정책에서 확인할 수 있습니다.',
        ],
      },
    ],
  },
  en: {
    title: 'About this site',
    seoTitle: 'About',
    seoDescription:
      'LifeCalc brings together calculators for prices and costs with practical guides to stains, laundry and household care. Learn how each area is written.',
    lead: 'LifeCalc helps with two kinds of everyday decisions: calculating a number and working through a household problem.',
    updatedAt: '2026-10-02',
    sections: [
      {
        heading: 'What it does',
        paragraphs: [
          'Work out which pack size is genuinely cheaper, what an appliance adds to your electricity bill, or what a price leaves you after fees — without creating an account.',
          'Calculator pages show the formula, assumptions and an example so you can understand the result.',
        ],
      },
      {
        heading: 'When to use the life guides',
        paragraphs: [
          'For stains, laundry, cleaning and home care, the life guides give a first step, a sequence to follow and cautions for different materials and appliances.',
          'Product instructions vary. Check the care label or manufacturer manual before using a cleaner or treating a sensitive material.',
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
          'For rates and rules that change, check the date shown on the individual page. A note without a linked source should not be mistaken for independent verification.',
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
          'Suggestions for calculators or household guides are welcome. The editorial policy explains how we intend to check and update information.',
        ],
      },
    ],
  },
  ja: {
    title: 'サイトについて',
    seoTitle: 'サイトについて',
    seoDescription:
      `${brandName('ja')}は価格・費用を確かめる計算ツールと、シミ・洗濯・掃除の手順を探せる暮らしのガイドを提供します。`,
    lead: `${brandName('ja')}は、数字で判断する場面には計算ツールを、家の困りごとには状況別の手順を提供するサイトです。`,
    updatedAt: '2026-10-02',
    sections: [
      {
        heading: 'できること',
        paragraphs: [
          '容量の違う商品のどちらが安いか、家電を使うと電気代がいくら増えるか、価格から手数料を引くといくら残るか。登録なしですぐ計算できます。',
          '計算式・前提・例を示し、結果の意味を確認できるようにしています。',
        ],
      },
      {
        heading: '暮らしのガイドを使うとき',
        paragraphs: [
          'シミ・洗濯・掃除・住まいの手入れは、最初にすること、順番、素材や家電による注意点をまとめています。',
          '使える洗剤や方法は製品によって異なります。衣類の表示やメーカーの取扱説明書を優先してください。',
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
          '料金や保険料率など変わり得る数値は、各ページの基準日を確認してください。リンクのない確認案内は、独立した出典の証明として扱いません。',
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
          '計算ツールや暮らしのガイドへのご提案も歓迎します。情報の確認・更新方針は編集方針に記載しています。',
        ],
      },
    ],
  },
};
