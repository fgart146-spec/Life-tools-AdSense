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
