/** UI 사전 구조. 모든 로케일 사전은 이 타입을 만족해야 한다. */
export interface QuickAction {
  /** 레지스트리의 도구 id. 해당 로케일에 없는 도구는 화면에서 자동 제외된다. */
  toolId: string;
  emoji: string;
  label: string;
}

export interface TrustPoint {
  title: string;
  body: string;
}

export interface Dictionary {
  common: {
    calculate: string;
    reset: string;
    result: string;
    resultDetail: string;
    copy: string;
    copied: string;
    viewAll: string;
    home: string;
    updatedAt: string;
    sources: string;
    loading: string;
    required: string;
    optional: string;
    skipToContent: string;
  };
  nav: {
    tools: string;
    guides: string;
    life: string;
    about: string;
    categories: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    changeLanguage: string;
  };
  home: {
    metaTitle: string;
    metaDescription: string;
    heading: string;
    subheading: string;
    quickActionsTitle: string;
    popularTitle: string;
    seasonalTitle: string;
    seasonalNote: string;
    categoriesTitle: string;
    guidesTitle: string;
    allToolsCta: string;
    trustTitle: string;
    trustPoints: TrustPoint[];
    quickActions: QuickAction[];
  };
  toolsIndex: {
    metaTitle: string;
    metaDescription: string;
    heading: string;
    lead: string;
    countLabel: string;
  };
  tool: {
    sectionHowItWorks: string;
    sectionFormula: string;
    sectionExample: string;
    sectionNotes: string;
    sectionFaq: string;
    sectionRelatedTools: string;
    sectionRelatedGuides: string;
    inputTitle: string;
    resultPlaceholder: string;
    inputIssues: string;
    breakdownTitle: string;
    savingsTitle: string;
    disclaimer: string;
  };
  category: {
    metaTitleSuffix: string;
    toolsInCategory: string;
    otherCategories: string;
  };
  guide: {
    indexMetaTitle: string;
    indexMetaDescription: string;
    indexHeading: string;
    indexLead: string;
    readingTime: string;
    relatedTools: string;
    backToGuides: string;
    tableOfContents: string;
    publishedAt: string;
    updatedAt: string;
  };
  life: {
    /** 허브 */
    indexMetaTitle: string;
    indexMetaDescription: string;
    indexHeading: string;
    indexLead: string;
    /** 탐색 UI */
    searchHeading: string;
    searchPlaceholder: string;
    searchLabel: string;
    searchNoResult: string;
    searchResultCount: string;
    searchClear: string;
    pickerHeading: string;
    pickerPlace: string;
    pickerProblem: string;
    pickerAll: string;
    pickerReset: string;
    /** 목록 */
    popularHeading: string;
    categoriesHeading: string;
    seasonalHeading: string;
    seasonalNote: string;
    allArticles: string;
    articleCount: string;
    /** 카테고리 허브 */
    categoryMetaTitleSuffix: string;
    articlesInCategory: string;
    otherCategories: string;
    /** 문서 */
    quickAnswer: string;
    supplies: string;
    steps: string;
    cautions: string;
    situationTips: string;
    cause: string;
    prevention: string;
    faq: string;
    relatedArticles: string;
    relatedTools: string;
    backToLife: string;
    safetyNote: string;
    /** 홈 연결 */
    homeSectionTitle: string;
    homeSectionNote: string;
    homeCta: string;
  };
  footer: {
    tagline: string;
    sections: {
      tools: string;
      content: string;
      site: string;
    };
    about: string;
    contact: string;
    privacy: string;
    terms: string;
    disclaimer: string;
    disclaimerShort: string;
    copyright: string;
  };
  notFound: {
    title: string;
    description: string;
    cta: string;
    homeCta: string;
  };
  error: {
    title: string;
    description: string;
    retry: string;
  };
  breadcrumb: {
    label: string;
  };
}
