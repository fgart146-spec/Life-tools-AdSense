/**
 * English dictionary. Not a machine translation of the Korean copy:
 * wording is written for an English-speaking audience.
 */
import type { Dictionary } from '@/lib/i18n/types';

export const en: Dictionary = {
  common: {
    calculate: 'Calculate',
    reset: 'Reset',
    result: 'Result',
    resultDetail: 'What this means',
    copy: 'Copy result',
    copied: 'Copied',
    viewAll: 'View all',
    home: 'Home',
    updatedAt: 'Last reviewed',
    sources: 'Basis & sources',
    loading: 'Loading',
    required: 'Required',
    optional: 'Optional',
    skipToContent: 'Skip to content',
  },
  nav: {
    tools: 'All tools',
    guides: 'Guides',
    about: 'About',
    categories: 'Categories',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    changeLanguage: 'Change language',
  },
  home: {
    metaTitle: 'Everyday money tools — check the numbers before you spend',
    metaDescription:
      'Free unit price, discount, margin and everyday budget calculators. No sign-up, instant results, worked examples included.',
    heading: 'What are we working out today?',
    subheading:
      'Compare unit prices, check what a discount is really worth, and price your products — all in your browser, no account needed.',
    quickActionsTitle: 'Popular calculations',
    popularTitle: 'Most used tools',
    seasonalTitle: 'Picked for this month',
    seasonalNote: 'We surface the calculations people look for at this time of year.',
    categoriesTitle: 'Browse by category',
    guidesTitle: 'Latest guides',
    allToolsCta: 'See all tools',
    trustTitle: 'Why people use this site',
    trustPoints: [
      {
        title: 'No install, no account',
        body: 'Type a number and the answer appears. Your inputs stay in the browser — nothing is sent to a server.',
      },
      {
        title: 'Numbers with an explanation',
        body: 'Every tool tells you what the result means, how it was calculated and what changes if your inputs change.',
      },
      {
        title: 'Stated basis and sources',
        body: 'Where rules or rates matter, the page shows the date the figures were checked and what they are based on.',
      },
    ],
    quickActions: [
      { toolId: 'compare-price', emoji: '🛒', label: 'Which one is cheaper?' },
      { toolId: 'discount-price', emoji: '💸', label: 'What is the real discount?' },
      { toolId: 'unit-price-100g', emoji: '⚖️', label: 'Price per 100 g' },
      { toolId: 'margin', emoji: '📦', label: 'What margin do I keep?' },
      { toolId: 'break-even', emoji: '📈', label: 'When do I break even?' },
      { toolId: 'area-converter', emoji: '📐', label: 'Convert floor area' },
    ],
  },
  toolsIndex: {
    metaTitle: 'All calculators',
    metaDescription:
      'Every calculator on the site: shopping and unit price, household bills, pay, selling and pricing, home and moving.',
    heading: 'All tools',
    lead: 'Pick a category below. Everything runs instantly in your browser.',
    countLabel: 'tools',
  },
  tool: {
    sectionHowItWorks: 'How this is calculated',
    sectionFormula: 'Formula',
    sectionExample: 'Worked example',
    sectionNotes: 'Things to watch for',
    sectionFaq: 'Frequently asked questions',
    sectionRelatedTools: 'Useful next',
    sectionRelatedGuides: 'Related guides',
    inputTitle: 'Your numbers',
    resultPlaceholder: 'Enter your numbers and the result appears here.',
    inputIssues: 'Please check these inputs',
    breakdownTitle: 'Step by step',
    savingsTitle: 'What you save',
    disclaimer:
      'Results are for guidance only. Actual bills, taxes and pay depend on your contract and the official rules that apply to you.',
  },
  category: {
    metaTitleSuffix: 'calculators',
    toolsInCategory: 'Tools in this category',
    otherCategories: 'Other categories',
  },
  guide: {
    indexMetaTitle: 'Guides',
    indexMetaDescription:
      'Plain-language explanations of unit pricing, discounts, margins and everyday household costs.',
    indexHeading: 'Guides',
    indexLead: 'The background a calculator alone cannot give you.',
    readingTime: 'About %{minutes} min read',
    relatedTools: 'Tools that go with this guide',
    backToGuides: 'Back to guides',
    tableOfContents: 'Contents',
    publishedAt: 'Published',
    updatedAt: 'Updated',
  },
  footer: {
    tagline: 'Check the numbers before you spend.',
    sections: {
      tools: 'Tools',
      content: 'Content',
      site: 'Site',
    },
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy policy',
    terms: 'Terms of use',
    disclaimer: 'Disclaimer',
    disclaimerShort:
      'All results are for guidance only. Real amounts can differ depending on official rules and your own contract.',
    copyright: '© %{year} %{brand}. All rights reserved.',
  },
  notFound: {
    title: 'Page not found',
    description:
      'The page may have moved or been removed. Try one of the calculators below instead.',
    cta: 'See all tools',
    homeCta: 'Go home',
  },
  error: {
    title: 'Something went wrong',
    description: 'Please try again in a moment. If it keeps happening, let us know.',
    retry: 'Try again',
  },
  breadcrumb: {
    label: 'Breadcrumb',
  },
};
