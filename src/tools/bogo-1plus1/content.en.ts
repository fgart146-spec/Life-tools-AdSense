import type { ToolContent } from '@/lib/tools/types';
import type { BogoToolCopy } from '@/lib/tools/shared/bogo-copy';

export const contentEn: ToolContent<BogoToolCopy> = {
  title: 'Buy one get one free calculator',
  seoTitle: 'BOGOF calculator — what percentage discount is buy one get one free?',
  seoDescription:
    'Buy one get one free is a 50% discount per item. Work out the real price per item and check whether a straight percentage offer beats it.',
  lead: 'See what a buy-one-get-one offer is really worth per item, and compare it against a plain percentage discount on the same product.',
  summary: 'The real discount rate and per-item price of a BOGOF offer.',
  keywords: {
    primaryKeyword: 'buy one get one free calculator',
    secondaryKeywords: [
      'bogof percentage',
      'what percent is buy one get one free',
      'bogo discount calculator',
      'price per item multibuy',
      'bogof vs percentage off',
    ],
    searchIntent:
      'Find out the real percentage discount behind a buy-one-get-one offer and whether it beats a straight discount.',
  },
  howItWorks: [
    'You pay for one item and take home two, so the real discount is free items divided by total items.',
    'Buy one get one free is 1 / 2 = 50%; buy two get one free is 1 / 3 = about 33.3%.',
    'The effective price per item is what you pay divided by the number of items you receive.',
    'Enter a comparison discount and the calculator shows which offer gives the lower price per item.',
    'Everything is calculated in your browser.',
  ],
  formula: [
    { label: 'Real discount', expression: 'discount = free items / (paid items + free items) x 100' },
    {
      label: 'Effective price per item',
      expression: 'price per item = (price x paid items) / (paid items + free items)',
    },
    {
      label: 'Straight discount comparison',
      expression: 'discounted price = price x (1 - discount / 100)',
    },
  ],
  example: {
    scenario: 'Milk at 4.00 is on buy one get one free. The same milk is 40% off in another aisle.',
    steps: [
      'BOGOF: 4.00 for two, so 2.00 each — a real 50% discount',
      '40% off: 4.00 x 0.6 = 2.40 each',
      'Gap: 2.00 against 2.40, so BOGOF is about 16.7% cheaper',
    ],
    conclusion:
      'The BOGOF offer wins by 0.40 per item — but only if you will use both before they spoil.',
  },
  notes: [
    'Two items you cannot use is not a saving. Watch expiry dates on fresh items in particular.',
    'Prices are sometimes raised before a multibuy promotion. Check the usual price where you can.',
    'The free item is occasionally a smaller size. If the sizes differ, compare per 100 g or per 100 ml instead.',
    'If you only need one, a multibuy increases what you spend even though the unit price falls.',
  ],
  faq: [
    {
      question: 'Why is buy one get one free a 50% discount?',
      answer:
        'You pay for one item and receive two, so the price per item is halved. The unit price behaves like a 50% discount, but your total spend does not fall — you are buying twice the quantity.',
    },
    {
      question: 'Is BOGOF the same as 50% off?',
      answer:
        'The price per item is the same, but the situation is not. At 50% off you can buy a single item at half price; with BOGOF you must take two. For anything you use slowly, the straight discount is better.',
    },
    {
      question: 'Can I model buy two get one free?',
      answer:
        'Yes — change the paid and free quantities. Buy two get one free is about 33.3%; buy three get one free is 25%.',
    },
    {
      question: 'What if the free item is a different size?',
      answer:
        'This calculator assumes identical items. When sizes differ, work in total weight or volume using the price per 100 g or per 100 ml calculator.',
    },
  ],
  relatedGuides: ['bogo-real-discount', 'unit-price-basics'],
  ui: {
    priceLabel: 'Price per item',
    priceUnit: '',
    priceHint: 'The normal price before the offer.',
    pricePlaceholder: 'e.g. 4.00',
    buyLabel: 'Items paid for',
    buyUnit: 'items',
    buyHint: 'How many you pay for.',
    freeLabel: 'Free items',
    freeUnit: 'items',
    freeHint: 'How many you get free.',
    compareLabel: 'Compare with a discount (optional)',
    compareHint: 'Enter a percentage offer on the same product.',
    discountRateLabel: 'Real discount',
    effectiveUnitLabel: 'Effective price per item',
    totalItemsLabel: 'Items received',
    paidLabel: 'Amount paid',
    comparePriceLabel: 'Price per item at that discount',
    noteRate: 'This offer works out as a %{rate} discount.',
    noteUnit: 'You receive %{items} items, so each one costs %{unitPrice}.',
    noteCompare: 'The %{better} is about %{diff} cheaper.',
    noteCompareTie: 'Both come to the same price per item. Choose by how many you actually need.',
    betterBogo: 'multibuy offer',
    betterDiscount: 'straight discount',
    noteCaution: 'The saving is only real if you use everything you take home.',
    issuePrice: 'Price cannot be negative.',
    issueBuy: 'You must pay for at least one item.',
    issueFree: 'Free items cannot be negative.',
    issueCompare: 'Enter a discount between 0 and 100.',
  },
};
