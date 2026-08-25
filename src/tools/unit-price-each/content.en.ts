import type { ToolContent } from '@/lib/tools/types';
import type { UnitPriceEachCopy } from './copy';

export const contentEn: ToolContent<UnitPriceEachCopy> = {
  title: 'Price per item calculator',
  seoTitle: 'Price per item calculator — cost per unit in a multipack',
  seoDescription:
    'Enter a pack price and how many items it contains to get the price per item, plus the price per sheet, roll metre or any smaller unit you choose.',
  lead: 'Enter the pack price and the number of items to see what each one costs. Add a smaller unit — metres per roll, sheets per pack — and you get that price too.',
  summary: 'Divide a pack price by its contents to get the price per item or per sheet.',
  keywords: {
    primaryKeyword: 'price per item calculator',
    secondaryKeywords: [
      'cost per unit calculator',
      'price per roll',
      'price per sheet',
      'multipack unit price',
      'cost per piece',
    ],
    searchIntent:
      'Find the price of a single item inside a multipack so packs with different counts can be compared.',
  },
  howItWorks: [
    'The amount you pay is divided by the number of items to give the price per item.',
    'The optional smaller unit — metres per roll, sheets per pack, tablets per box — produces a second, finer unit price.',
    'The unit name you type is used for display only; it does not change the calculation.',
    'Enter the price you actually pay after any discount for an accurate figure.',
    'Everything runs in your browser.',
  ],
  formula: [
    { label: 'Price per item', expression: 'price per item = total price / number of items' },
    {
      label: 'Total smaller units',
      expression: 'total = smaller units per item x number of items',
      note: 'e.g. 30 rolls x 25 m = 750 m',
    },
    {
      label: 'Price per smaller unit',
      expression: 'price per unit = total price / total smaller units',
    },
  ],
  example: {
    scenario:
      'Pack A: 30 rolls for 24.00 with 25 m per roll. Pack B: 24 rolls for 21.60 with 30 m per roll.',
    steps: [
      'A: 24.00 / 30 = 0.80 per roll, 750 m in total, so 0.032 per metre',
      'B: 21.60 / 24 = 0.90 per roll, 720 m in total, so 0.030 per metre',
      'A wins on price per roll, B wins on price per metre',
    ],
    conclusion:
      'Counting rolls makes A look better, but per metre of paper B is about 6% cheaper. Where the item size varies, always compare the smaller unit.',
  },
  notes: [
    'A roll or a pack is not a standard size. Comparing counts alone hides big differences in what you actually receive.',
    'Thickness matters too: two-ply and three-ply paper of the same length do not last the same time.',
    'Add delivery to the price for online orders, otherwise bulky multipacks look cheaper than they are.',
    'Storage space has a cost of its own if a large pack has nowhere to go.',
  ],
  faq: [
    {
      question: 'Should I compare per roll or per metre?',
      answer:
        'Per metre, whenever roll lengths differ. A pack with more rolls can still contain less paper, and the per-metre figure is the one that reflects how long it lasts.',
    },
    {
      question: 'Do I have to fill in the smaller unit?',
      answer:
        'No. Leave it empty and you simply get the price per item. Use it when the item itself has a size — metres, sheets, tablets, grams.',
    },
    {
      question: 'How do I handle a buy-one-get-one deal?',
      answer:
        'Enter the price you pay and the total number of items you take home, including the free ones.',
    },
    {
      question: 'What if the product is sold by weight or volume?',
      answer:
        'Use the price per 100 g calculator for weight, or the price per 100 ml calculator for liquids. Those are the standard comparison bases for those products.',
    },
  ],
  relatedGuides: ['unit-price-basics'],
  ui: {
    priceLabel: 'Total price',
    priceUnit: '',
    priceHint: 'The amount you actually pay.',
    pricePlaceholder: 'e.g. 24.00',
    countLabel: 'Number of items',
    countUnit: 'items',
    countHint: 'How many are in the pack.',
    countPlaceholder: 'e.g. 30',
    subAmountLabel: 'Smaller unit per item (optional)',
    subAmountHint: 'e.g. 25 metres per roll, 30 sheets per pack',
    subAmountPlaceholder: 'e.g. 25',
    subUnitLabel: 'Unit name (optional)',
    subUnitPlaceholder: 'm',
    perItemLabel: 'Price per item',
    perSubLabel: 'Price per unit',
    totalSubLabel: 'Total units',
    noteMain: 'Each item costs %{perItem}.',
    noteSub: 'That is %{perSub} per %{unit}.',
    noteCompare: 'Compare products on the same basis — per item, or per smaller unit.',
    issuePrice: 'Price cannot be negative.',
    issueCount: 'Enter at least one item.',
    issueSubAmount: 'The smaller unit must be greater than zero.',
  },
};
