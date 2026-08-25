/**
 * 日本語辞書。韓国語の機械翻訳ではなく、日本語として自然な表現で記述する。
 */
import type { Dictionary } from '@/lib/i18n/types';

export const ja: Dictionary = {
  common: {
    calculate: '計算する',
    reset: 'リセット',
    result: '計算結果',
    resultDetail: '結果の見方',
    copy: '結果をコピー',
    copied: 'コピーしました',
    viewAll: 'すべて見る',
    home: 'ホーム',
    updatedAt: '基準日',
    sources: '算出基準・出典',
    loading: '読み込み中',
    required: '必須',
    optional: '任意',
    skipToContent: '本文へスキップ',
  },
  nav: {
    tools: 'すべてのツール',
    guides: 'ガイド',
    about: 'サイトについて',
    categories: 'カテゴリ',
    openMenu: 'メニューを開く',
    closeMenu: 'メニューを閉じる',
    language: '言語',
    changeLanguage: '言語を変更',
  },
  home: {
    metaTitle: 'くらしの計算ツール — 買う前に、ひと計算',
    metaDescription:
      '単価比較、割引率、利益率、暮らしの費用まで。登録不要ですぐ使える無料の計算ツール集です。',
    heading: '今日は何を計算しますか？',
    subheading:
      '買う前にひと計算。単価の比較から割引の実質、販売の利益率まで、ブラウザだけで完結します。',
    quickActionsTitle: 'よく使う計算',
    popularTitle: 'よく使われているツール',
    seasonalTitle: '今月のおすすめ',
    seasonalNote: '季節ごとに需要の多い計算を先に表示します。',
    categoriesTitle: 'カテゴリから探す',
    guidesTitle: '新着ガイド',
    allToolsCta: 'すべてのツールを見る',
    trustTitle: 'このサイトの特徴',
    trustPoints: [
      {
        title: 'インストールも登録も不要',
        body: '入力するとすぐ結果が出ます。入力した数値はサーバーに送信されず、ブラウザ内だけで計算します。',
      },
      {
        title: '数字だけで終わらせません',
        body: '結果の意味、計算の前提、条件が変わったときの目安まで合わせて説明します。',
      },
      {
        title: '基準と出典を明示',
        body: '料金や税など制度が変わるものは、適用基準日と根拠をページに記載します。',
      },
    ],
    quickActions: [
      { toolId: 'compare-price', emoji: '🛒', label: 'どっちが安い？' },
      { toolId: 'discount-price', emoji: '💸', label: '割引後はいくら？' },
      { toolId: 'unit-price-100g', emoji: '⚖️', label: '100gあたりの価格' },
      { toolId: 'margin', emoji: '📦', label: '利益はいくら残る？' },
      { toolId: 'break-even', emoji: '📈', label: '損益分岐点は？' },
      { toolId: 'area-converter', emoji: '📐', label: '面積の換算' },
    ],
  },
  toolsIndex: {
    metaTitle: 'ツール一覧',
    metaDescription:
      '買い物の単価比較、暮らしの費用、給与、販売・価格設定、住まいまで。すべての計算ツールを一覧で。',
    heading: 'すべてのツール',
    lead: 'カテゴリから選んでください。計算はすべてブラウザ内で即時に行われます。',
    countLabel: '件',
  },
  tool: {
    sectionHowItWorks: '計算の前提',
    sectionFormula: '計算式',
    sectionExample: '具体例',
    sectionNotes: '注意点',
    sectionFaq: 'よくある質問',
    sectionRelatedTools: '一緒に使えるツール',
    sectionRelatedGuides: '関連ガイド',
    inputTitle: '数値を入力',
    resultPlaceholder: '数値を入力すると、ここに結果が表示されます。',
    inputIssues: '入力内容をご確認ください',
    breakdownTitle: '計算の内訳',
    savingsTitle: '節約できる金額',
    disclaimer:
      '計算結果は目安です。実際の料金・税金・給与は契約内容や公式の基準によって異なる場合があります。',
  },
  category: {
    metaTitleSuffix: '計算ツール',
    toolsInCategory: 'このカテゴリのツール',
    otherCategories: 'ほかのカテゴリ',
  },
  guide: {
    indexMetaTitle: 'ガイド',
    indexMetaDescription:
      '単価比較、割引、利益率、暮らしの費用の考え方をわかりやすく整理しました。',
    indexHeading: 'ガイド',
    indexLead: '計算ツールだけでは足りない背景知識をまとめました。',
    readingTime: '約%{minutes}分で読めます',
    relatedTools: 'この記事と一緒に使えるツール',
    backToGuides: 'ガイド一覧へ',
    tableOfContents: '目次',
    publishedAt: '公開日',
    updatedAt: '更新日',
  },
  footer: {
    tagline: '買う前に、ひと計算。',
    sections: {
      tools: 'ツール',
      content: 'コンテンツ',
      site: 'サイト',
    },
    about: 'サイトについて',
    contact: 'お問い合わせ',
    privacy: 'プライバシーポリシー',
    terms: '利用規約',
    disclaimer: '免責事項',
    disclaimerShort:
      '計算結果はすべて目安です。実際の金額は公式基準や契約内容により異なる場合があります。',
    copyright: '© %{year} %{brand}. All rights reserved.',
  },
  notFound: {
    title: 'ページが見つかりません',
    description:
      'URLが変更されたか、削除された可能性があります。下から必要なツールを探してください。',
    cta: 'すべてのツールを見る',
    homeCta: 'ホームへ',
  },
  error: {
    title: '問題が発生しました',
    description: '時間をおいて再度お試しください。改善しない場合はご連絡ください。',
    retry: 'もう一度試す',
  },
  breadcrumb: {
    label: 'パンくずリスト',
  },
};
