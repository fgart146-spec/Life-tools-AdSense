import type { ToolContent } from '@/lib/tools/types';
import type { TargetPriceCopy } from './copy';

export const contentEn: ToolContent<TargetPriceCopy> = {
  title: 'Target selling price calculator',
  seoTitle: 'Target price calculator — what to charge for a 30% margin',
  seoDescription:
    'Enter your cost and the margin you want, and get the selling price that delivers it once marketplace fees and shipping are included.',
  lead: 'Enter your cost and the margin you want to keep. You get the price that actually delivers it — fees included.',
  summary: 'The selling price that delivers your target margin.',
  keywords: {
    primaryKeyword: 'target price calculator',
    secondaryKeywords: [
      'how to price a product',
      'selling price for 30 percent margin',
      'markup vs margin price',
      'pricing calculator with fees',
      'cost plus pricing',
    ],
    searchIntent:
      'Find the selling price that produces a specific profit margin after fees and shipping.',
  },
  howItWorks: [
    'Margin is measured against revenue, so the cost is divided rather than marked up.',
    'Price = (cost + shipping + other) / (1 - target margin - fee rate).',
    'Adding a fee rate raises the price, because fees are charged on the selling price itself.',
    'If margin plus fees reach 100%, no price can deliver that margin and the calculation stops.',
    'The tax-inclusive figure adds 10% as a common VAT example — adjust for your own rate.',
  ],
  formula: [
    {
      label: 'Target price',
      expression: 'price = (cost + shipping + other) / (1 - margin - fee rate)',
      note: 'Adding a percentage to cost gives markup, not margin.',
    },
    { label: 'Fee', expression: 'fee = price x fee rate' },
    { label: 'Tax-inclusive price', expression: 'price x 1.1' },
  ],
  example: {
    scenario: 'Cost 10.00, target margin 30%, marketplace fee 10%.',
    steps: [
      'Denominator: 1 - 0.3 - 0.1 = 0.6',
      'Price: 10.00 / 0.6 = 16.67',
      'Check: 16.67 revenue - 1.67 fee - 10.00 cost = 5.00 profit, exactly 30%',
    ],
    conclusion:
      'You need to charge 16.67 to keep a 30% margin. Simply adding 30% to cost (13.00) leaves a real margin of about 15%.',
  },
  notes: [
    'Do not confuse this with markup pricing. A 30% margin and a 30% markup produce different prices.',
    'Check the market too. If the calculated price sits above competitors, the cost or the margin target has to move.',
    'Planning discounts? Make sure the discounted price still clears the break-even price from the margin calculator.',
    'The tax-inclusive figure uses 10%. Substitute your own VAT or sales-tax rate where it differs.',
  ],
  faq: [
    {
      question: 'Why not just add the margin to the cost?',
      answer:
        'Because margin is a share of revenue. Adding 30% to a cost of 10 gives 13, and the profit of 3 is only 23% of revenue. To reach a true 30% margin you divide by 0.7.',
    },
    {
      question: 'Why does a fee raise the price so much?',
      answer:
        'Fees are charged on the selling price, so raising the price raises the fee as well. The formula accounts for that by subtracting the fee rate in the denominator.',
    },
    {
      question: 'The price is above what competitors charge.',
      answer:
        'Lower the cost, accept a smaller margin, or change the shipping policy. The margin calculator lets you test several prices and see the profit each one leaves.',
    },
    {
      question: 'How should I round the price?',
      answer:
        'Most sellers round to a psychological price point. Round first, then re-check the real margin with the margin calculator.',
    },
  ],
  relatedGuides: ['pricing-guide', 'margin-basics'],
  ui: {
    costLabel: 'Unit cost',
    costUnit: '',
    costHint: 'Per unit.',
    costPlaceholder: 'e.g. 10.00',
    marginLabel: 'Target margin',
    marginHint: 'Profit as a share of revenue.',
    feeLabel: 'Fee rate',
    feeHint: 'Marketplace and payment fees.',
    shippingLabel: 'Shipping you cover',
    shippingHint: 'Per order.',
    otherLabel: 'Other costs',
    otherHint: 'Packaging, ads, inserts.',
    priceLabel: 'Target price',
    priceWithVatLabel: 'With 10% tax',
    profitLabel: 'Profit',
    feeAmountLabel: 'Fees',
    totalCostLabel: 'Total cost',
    notePrice: 'Charge %{price} to keep a %{margin} margin.',
    noteProfit: 'That leaves about %{profit} per sale.',
    noteVat: 'With 10% tax added the displayed price is about %{vat}.',
    noteFee: 'Fees scale with the price, which is why the price rises more than the fee rate.',
    noteRound: 'Round to a sensible price point, then re-check the margin.',
    issueCost: 'Cost cannot be negative.',
    issueMargin: 'Enter a margin between 0 and 100.',
    issueFee: 'Enter a fee rate between 0 and 100.',
    issueAmount: 'Amounts cannot be negative.',
    issueImpossible: 'Margin plus fees reach 100%, so no price can deliver that margin.',
  },
};
