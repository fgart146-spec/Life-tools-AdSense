import type { ToolContent } from '@/lib/tools/types';
import type { BreakEvenCopy } from './copy';

export const contentEn: ToolContent<BreakEvenCopy> = {
  title: 'Break-even point calculator',
  seoTitle: 'Break-even calculator — how many units to cover your costs',
  seoDescription:
    'Enter fixed costs, price and variable cost per unit to see the break-even quantity, the revenue it represents and the daily sales it implies.',
  lead: 'Enter your monthly fixed costs and the price and variable cost of one unit to see how many you need to sell before you make a profit.',
  summary: 'Break-even units and revenue from fixed costs and contribution margin.',
  keywords: {
    primaryKeyword: 'break even calculator',
    secondaryKeywords: [
      'break even point formula',
      'contribution margin calculator',
      'how many units to break even',
      'fixed and variable costs',
      'break even revenue',
    ],
    searchIntent:
      'Work out how many units must be sold, and what revenue is needed, to cover fixed costs.',
  },
  howItWorks: [
    'Contribution margin is price minus variable cost — what each sale contributes towards fixed costs.',
    'Break-even quantity is fixed costs divided by contribution margin.',
    'Break-even revenue is that quantity multiplied by the price.',
    'The contribution ratio shows how much of every 100 in revenue goes towards covering fixed costs.',
    'If the price is at or below the variable cost, no volume will reach break-even.',
  ],
  formula: [
    { label: 'Contribution margin', expression: 'contribution = price - variable cost' },
    { label: 'Break-even units', expression: 'units = fixed costs / contribution' },
    { label: 'Break-even revenue', expression: 'revenue = units x price' },
    { label: 'Contribution ratio', expression: 'ratio (%) = contribution / price x 100' },
  ],
  example: {
    scenario: 'Fixed costs 3,000 a month, price 15.00 per unit, variable cost 9.00 per unit.',
    steps: [
      'Contribution: 15.00 - 9.00 = 6.00',
      'Break-even units: 3,000 / 6.00 = 500',
      'Break-even revenue: 500 x 15.00 = 7,500',
    ],
    conclusion:
      'You need 500 sales a month — about 17 a day — before the business turns a profit. After that, every unit adds 6.00 of profit.',
  },
  notes: [
    'Fixed costs are the ones that do not move with sales: rent, salaried staff, insurance, depreciation.',
    'Variable costs move with each sale: goods, packaging, payment fees, shipping.',
    'Costs such as hourly staff sit between the two. Decide which side they belong on and stay consistent.',
    'Selling several products? Use a weighted average price and variable cost for an approximate figure.',
    'Taxes are not included in this calculation.',
  ],
  faq: [
    {
      question: 'How do I tell fixed from variable costs?',
      answer:
        'If the cost still appears when you sell nothing, it is fixed. If it grows with each sale, it is variable. Rent and salaries are fixed; goods, fees and packaging are variable.',
    },
    {
      question: 'Why does contribution margin matter so much?',
      answer:
        'Each sale contributes that amount towards fixed costs. Once the fixed costs are covered, the same contribution becomes pure profit, so it drives everything above break-even.',
    },
    {
      question: 'What if I sell many different products?',
      answer:
        'Use a weighted average, dominated by your best sellers. The result is an approximation but it is usually close enough to plan with.',
    },
    {
      question: 'How can I lower the break-even point?',
      answer:
        'Cut fixed costs or raise the contribution margin — a higher price or a lower variable cost. The target price and margin calculators help you test both.',
    },
  ],
  relatedGuides: ['break-even-guide', 'margin-basics'],
  ui: {
    fixedCostLabel: 'Monthly fixed costs',
    fixedCostUnit: '',
    fixedCostHint: 'Rent, salaries, insurance.',
    fixedCostPlaceholder: 'e.g. 3,000',
    priceLabel: 'Price per unit',
    priceHint: 'What the customer pays.',
    pricePlaceholder: 'e.g. 15.00',
    variableCostLabel: 'Variable cost per unit',
    variableCostHint: 'Goods, fees, packaging.',
    variableCostPlaceholder: 'e.g. 9.00',
    unitsLabel: 'Break-even quantity',
    unitsUnit: 'units',
    revenueLabel: 'Break-even revenue',
    contributionLabel: 'Contribution per unit',
    contributionRateLabel: 'Contribution ratio',
    perDayLabel: 'Units per day',
    noteMain: 'You break even at %{units} units, or %{revenue} in revenue.',
    noteContribution: 'Each sale contributes %{contribution} (%{rate} of the price) to fixed costs.',
    notePerDay: 'Over 30 days that is about %{perDay} units a day.',
    noteFixed: 'Past the break-even point, the contribution from each sale becomes profit.',
    noteBasis: 'Taxes are not included.',
    issueFixed: 'Fixed costs cannot be negative.',
    issuePrice: 'Price must be greater than zero.',
    issueVariable: 'Variable cost cannot be negative.',
    issueMargin: 'The price must exceed the variable cost to reach break-even.',
  },
};
