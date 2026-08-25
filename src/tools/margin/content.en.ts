import type { ToolContent } from '@/lib/tools/types';
import type { MarginCopy } from './copy';

export const contentEn: ToolContent<MarginCopy> = {
  title: 'Profit margin calculator',
  seoTitle: 'Profit margin calculator — what is left after fees and shipping',
  seoDescription:
    'Enter your price, cost, platform fee and shipping to see the profit you actually keep, your margin, cost ratio and break-even price.',
  lead: 'Price and cost are enough to start. Add marketplace fees and shipping and you see what really lands in your account.',
  summary: 'Profit and margin after fees, shipping and packaging.',
  keywords: {
    primaryKeyword: 'profit margin calculator',
    secondaryKeywords: [
      'margin calculator with fees',
      'net profit calculator',
      'selling price margin',
      'marketplace fee calculator',
      'cost ratio calculator',
    ],
    searchIntent:
      'Work out the real profit and margin on a sale once fees, shipping and other costs are deducted.',
  },
  howItWorks: [
    'Revenue is price multiplied by quantity.',
    'The fee percentage is applied to revenue, matching how marketplace and payment fees are usually charged.',
    'Total cost is (cost + shipping + other) x quantity, plus the fee.',
    'Profit is revenue minus total cost; margin is profit divided by revenue.',
    'Markup (profit over cost) is shown separately because it is easy to confuse with margin.',
    'The break-even price is the price at which profit reaches zero: (cost + shipping + other) / (1 - fee rate).',
  ],
  formula: [
    { label: 'Revenue', expression: 'revenue = price x quantity' },
    { label: 'Fee', expression: 'fee = revenue x fee rate' },
    { label: 'Profit', expression: 'profit = revenue - (cost + shipping + other) x quantity - fee' },
    { label: 'Margin', expression: 'margin (%) = profit / revenue x 100' },
    { label: 'Break-even price', expression: '(cost + shipping + other) / (1 - fee rate)' },
  ],
  example: {
    scenario: 'Price 20.00, cost 10.00, marketplace fee 10%, shipping 3.00, packaging 0.50.',
    steps: [
      'Revenue 20.00, fee 2.00',
      'Costs: 10.00 + 3.00 + 0.50 = 13.50, plus the 2.00 fee = 15.50',
      'Profit: 20.00 - 15.50 = 4.50',
    ],
    conclusion:
      'Each sale keeps 4.50, a margin of 22.5%. The break-even price is 15.00 — below that, every sale loses money.',
  },
  notes: [
    'Sales tax or VAT is not included. If your prices include tax, enter tax-exclusive figures for a true margin.',
    'Returns, refunded shipping, advertising and coupon costs are extra. Add an average per-order allowance under other costs.',
    'Marketplace fees vary by category, and payment processing is sometimes charged on top.',
    'Margin (on revenue) and markup (on cost) are different numbers — agree which one you mean before quoting it.',
  ],
  faq: [
    {
      question: 'What is the difference between margin and markup?',
      answer:
        'Margin is profit divided by revenue; markup is profit divided by cost. Buying at 10 and selling at 20 is a 50% margin but a 100% markup — the same deal, two very different numbers.',
    },
    {
      question: 'Should I enter prices with or without tax?',
      answer:
        'Use tax-exclusive figures for both price and cost if you are registered for VAT or sales tax. Mixing the two overstates your margin.',
    },
    {
      question: 'Can I include advertising?',
      answer:
        'Yes — put your average advertising cost per order under other costs. To judge the advertising itself, use the ROAS calculator.',
    },
    {
      question: 'What is the break-even price for?',
      answer:
        'It is the lowest price at which a sale still covers its own costs. Use it as the floor when planning discounts.',
    },
  ],
  relatedGuides: ['margin-basics', 'pricing-guide'],
  ui: {
    priceLabel: 'Selling price',
    priceUnit: '',
    priceHint: 'What the customer pays.',
    pricePlaceholder: 'e.g. 20.00',
    costLabel: 'Unit cost',
    costHint: 'What you pay for one unit.',
    costPlaceholder: 'e.g. 10.00',
    feeLabel: 'Fee rate',
    feeHint: 'Marketplace and payment fees.',
    shippingLabel: 'Shipping you cover',
    shippingHint: 'Per order.',
    otherLabel: 'Other costs',
    otherHint: 'Packaging, inserts, ads.',
    quantityLabel: 'Quantity',
    quantityUnit: 'units',
    profitLabel: 'Profit',
    marginRateLabel: 'Margin',
    costRateLabel: 'Cost ratio',
    markupRateLabel: 'Markup (on cost)',
    revenueLabel: 'Revenue',
    feeAmountLabel: 'Fees',
    totalCostLabel: 'Total cost',
    profitPerUnitLabel: 'Profit per unit',
    breakEvenPriceLabel: 'Break-even price',
    noteProfit: 'You keep %{profit}, a margin of %{rate}.',
    notePerUnit: 'That is %{perUnit} per unit.',
    noteBreakEven: 'Below %{breakEven} the sale loses money.',
    noteLoss: 'These numbers produce a loss. Check the price and the cost again.',
    noteVat: 'Tax and returns are not included, so the real margin may be lower.',
    issuePrice: 'Price cannot be negative.',
    issueCost: 'Cost cannot be negative.',
    issueFee: 'Enter a fee rate between 0 and 100.',
    issueQuantity: 'Quantity must be at least one.',
    issueAmount: 'Amounts cannot be negative.',
  },
};
