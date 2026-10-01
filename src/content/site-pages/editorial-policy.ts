import { brandName, siteConfig } from '@/config/site';
import type { SitePageContentMap } from './types';

export const editorialPolicyContent: SitePageContentMap = {
  ko: {
    title: '콘텐츠 제작·수정 원칙',
    seoTitle: '콘텐츠 제작·수정 원칙',
    seoDescription: `${brandName('ko')}의 계산식, 기준일, 생활 정보, 출처 표시와 오류 수정 원칙을 설명합니다.`,
    lead: '계산 결과와 생활 정보가 어떤 근거에 의존하는지 사용자가 직접 확인할 수 있도록 정리한 운영 원칙입니다. 기존의 모든 글이 이미 같은 수준으로 검증됐다는 뜻은 아닙니다.',
    updatedAt: '2026-10-02',
    sections: [
      { heading: '무엇을 기준으로 작성하나요', paragraphs: [
        '각 페이지는 해결하려는 질문과 적용 범위를 먼저 정합니다. 계산기는 입력값·공식·가정·결과 해석을, 생활백과는 먼저 할 일·상황별 차이·피해야 할 행동을 설명합니다.',
        '수치나 안전에 관한 설명은 확인할 수 있는 자료가 있을 때 연결합니다. 자료를 확인하지 못한 일반적 조언은 공식 근거가 있는 사실처럼 표시하지 않습니다.',
      ] },
      { heading: '어떤 자료를 우선하나요', paragraphs: [
        '법정 요율과 제도는 담당 정부기관·공공기관의 발표와 원문을, 기기 사용과 세척은 해당 제조사의 설명서를 우선 확인합니다. 자료마다 적용 국가·연도·모델을 살펴봅니다.',
        '블로그나 커뮤니티 경험담을 공식 기준처럼 인용하지 않습니다. 링크가 없는 “라벨을 확인하세요” 같은 문장은 출처가 아니라 확인 안내로 구분합니다.',
      ] },
      { heading: '숫자와 제품별 차이는 어떻게 다루나요', paragraphs: [
        '요율·세금·최저임금처럼 바뀔 수 있는 숫자는 해당 페이지의 기준일을 확인하도록 안내합니다. 자료의 게시일과 페이지의 수정일이 다를 수 있습니다.',
        '세탁 온도, 세정제 농도, 가동 시간, 소재 손상 가능성은 제품별 허용 범위가 다릅니다. 일반적인 방법보다 실제 제품 라벨과 설명서를 우선하고, 확인할 수 없는 수치는 단정하지 않도록 검토합니다.',
      ] },
      { heading: '계산식은 어떻게 확인하나요', paragraphs: [
        '계산 함수에는 정상 입력과 경계값·잘못된 입력을 확인하는 자동 테스트를 둡니다. 수식과 화면 예시가 같은 기준값을 쓰는지도 빌드 과정에서 점검합니다.',
        '제도에 따라 달라지는 계산은 기준값의 날짜와 적용 범위를 함께 검토합니다. 개인의 계약 조건이나 공식 청구·신고 결과와 다를 수 있으므로 결과는 참고값입니다.',
      ] },
      { heading: '수정과 검토는 어떻게 하나요', paragraphs: [
        '새 자료를 확인하거나 오류 제보를 받으면 해당 문장의 근거와 적용 범위를 다시 살피고 수정합니다. 페이지의 업데이트 날짜는 실제 수정 내용을 반영할 때 갱신합니다.',
        '기존 콘텐츠는 출처와 제품별 조건을 순차적으로 점검하고 있습니다. 작성자 자격이나 직접 시험을 확인할 수 없는 경우 그런 경험을 주장하지 않습니다.',
      ] },
      { heading: '오류는 어떻게 알리나요', paragraphs: [
        `페이지 주소, 잘못되었다고 생각하는 문장이나 계산 결과, 확인할 수 있는 자료를 ${siteConfig.contactEmail} 으로 보내주세요. 개인정보나 민감한 입력값은 보내지 않아도 됩니다.`,
      ] },
    ],
  },
  en: {
    title: 'Editorial and correction policy',
    seoTitle: 'Editorial and correction policy',
    seoDescription: `How ${brandName('en')} handles formulas, dated figures, household guidance, sources and corrections.`,
    lead: 'These are the standards we use to make the basis of a calculation or household guide easier to check. They do not claim that every older page has already been reviewed to the same standard.',
    updatedAt: '2026-10-02',
    sections: [
      { heading: 'How pages are written', paragraphs: [
        'A page starts with the question it answers and the limits of that answer. Calculators show inputs, formulas, assumptions and interpretation. Household guides explain a first step, differences by situation and actions to avoid.',
        'Numerical or safety claims should point to checkable material when available. General advice without a verified source is not presented as an official fact.',
      ] },
      { heading: 'Which sources take priority', paragraphs: [
        'For legal rates and rules, we look first for the responsible government or public agency. For appliance use and cleaning, we look first for the manufacturer manual, checking the country, year and model.',
        'A blog or forum account is not treated as an official standard. An unlinked instruction to check a label is shown as a checking note, not as a source citation.',
      ] },
      { heading: 'Dates, quantities and model differences', paragraphs: [
        'Rates, taxes and wages can change. Check the basis date on the individual page; a source publication date and a page update date may differ.',
        'Wash temperatures, cleaner concentrations, run times and material compatibility vary by product. Follow the actual care label or manual first, and review unsupported precise claims before relying on them.',
      ] },
      { heading: 'Checking calculations', paragraphs: [
        'Calculation functions have automated checks for normal cases, boundaries and invalid inputs. We also check that worked examples and displayed results use the same basis.',
        'Figures tied to rules need a date and scope. A result is a guide and may differ from an actual bill, contract or filing.',
      ] },
      { heading: 'Updates and corrections', paragraphs: [
        'When a new primary source or an error report changes an answer, we review the affected claim and its scope. The page update date changes when the content is actually revised.',
        'Older pages are being reviewed in stages for sources and product-specific limits. We do not claim credentials or hands-on tests that cannot be documented.',
      ] },
      { heading: 'Report an error', paragraphs: [
        `Send the page URL, the sentence or result in question, and any source you have to ${siteConfig.contactEmail}. You do not need to send private inputs.`,
      ] },
    ],
  },
  ja: {
    title: '編集・訂正方針',
    seoTitle: '編集・訂正方針',
    seoDescription: `${brandName('ja')}の計算式、基準日、暮らしの情報、出典表示と訂正の方針です。`,
    lead: '計算や暮らしのガイドの根拠を確認しやすくするための方針です。過去の全ページがすでに同じ水準で検証済みだと主張するものではありません。',
    updatedAt: '2026-10-02',
    sections: [
      { heading: '記事の作り方', paragraphs: [
        '各ページで答える質問と適用範囲を先に決めます。計算ツールは入力値・計算式・前提・結果の見方を、暮らしのガイドは最初の対応・状況による違い・避けるべき行動を説明します。',
        '数値や安全に関する説明には、確認できる資料があればリンクします。資料を確認できない一般的な助言を公式な根拠がある事実として表示しません。',
      ] },
      { heading: '優先する資料', paragraphs: [
        '制度や法定料率は所管する官公庁・公的機関の原文を、家電の使用や掃除はメーカーの取扱説明書を優先し、国・年度・型番を確認します。',
        'ブログや掲示板の体験談を公式基準として扱いません。リンクのない「表示を確認してください」という文は出典ではなく確認案内として分けます。',
      ] },
      { heading: '基準日と製品ごとの差', paragraphs: [
        '税率・料金・賃金などは変わることがあります。各ページの基準日を確認してください。資料の公開日とページの更新日は同じとは限りません。',
        '洗濯温度、洗剤の濃度、運転時間、素材への影響は製品ごとに異なります。実際の表示と説明書を優先し、根拠のない細かな数値を断定しないよう見直します。',
      ] },
      { heading: '計算式の確認', paragraphs: [
        '計算関数には通常値・境界値・不正な入力の自動テストを設けています。表示例と計算結果が同じ基準値を使うことも確認します。',
        '制度に関わる計算では基準日と適用範囲を確認します。実際の請求額、契約内容、申告結果とは異なる場合があります。',
      ] },
      { heading: '更新と訂正', paragraphs: [
        '新しい一次資料や誤りの連絡を受けたら、該当する説明と適用範囲を確認して修正します。ページの更新日は実際に内容を変更したときに更新します。',
        '既存ページの出典と製品ごとの条件は順次確認します。確認できない資格や実使用・試験の経験を主張しません。',
      ] },
      { heading: '誤りの連絡', paragraphs: [
        `ページのURL、疑問のある文や計算結果、確認できる資料を ${siteConfig.contactEmail} までお知らせください。個人情報や入力した機密の値は不要です。`,
      ] },
    ],
  },
};
