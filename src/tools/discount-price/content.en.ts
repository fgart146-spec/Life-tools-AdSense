import type { ToolContent } from '@/lib/tools/types';
import type { DiscountPriceCopy } from './copy';

export const contentEn: ToolContent<DiscountPriceCopy> = {
  title: 'Discount and coupon price calculator',
  seoTitle: 'Discount calculator — final price after a percentage off and a coupon',
  seoDescription:
    'Work out what you actually pay after a percentage discount and a fixed-amount coupon, plus the real discount rate and the price per item.',
  lead: 'Enter the full price, the discount and any coupon. You get the amount you actually pay and the real discount rate once everything is combined.',
  summary: 'Final price after a percentage discount and a coupon.',
  keywords: {
    primaryKeyword: 'discount calculator',
    secondaryKeywords: [
      'percent off calculator',
      'sale price calculator',
      'coupon price calculator',
      'how much is 30 percent off',
      'final price after discount',
    ],
    searchIntent:
      'Find the final price after a percentage discount and a coupon, and what the combined discount really is.',
  },
  howItWorks: [
    'The full price is multiplied by the quantity to get the pre-discount total.',
    'The percentage discount is applied first, then the fixed coupon is subtracted — the order most retailers use.',
    'If the coupon is larger than what remains, the total stops at zero rather than going negative.',
    'The real discount rate is the amount taken off divided by the pre-discount total, so a percentage and a coupon can be compared as one number.',
    'Everything is calculated in your browser.',
  ],
  formula: [
    { label: 'Pre-discount total', expression: 'total = price x quantity' },
    {
      label: 'Final price',
      expression: 'final = max(0, total x (1 - discount / 100) - coupon)',
    },
    {
      label: 'Real discount rate',
      expression: 'rate = (total - final) / total x 100',
    },
  ],
  example: {
    scenario: 'A 59.00 shirt is 30% off and you also have a 5.00 coupon.',
    steps: [
      '30% off: 59.00 x 0.7 = 41.30',
      'Coupon: 41.30 - 5.00 = 36.30',
      'Real rate: (59.00 - 36.30) / 59.00 = about 38.5%',
    ],
    conclusion:
      'You pay 36.30, which is about 38.5% off the original price rather than the advertised 30%.',
  },
  notes: [
    'Some retailers subtract the coupon before applying the percentage. The order changes the final figure, so check against the payment screen.',
    'Delivery is not included here. Use the comparison calculator when shipping affects which option is cheaper.',
    'Headline offers such as "up to 30% off" often apply to selected lines only.',
    'A large discount off an inflated list price is not a bargain. Compare the final price with other sellers.',
  ],
  faq: [
    {
      question: 'Which is applied first, the percentage or the coupon?',
      answer:
        'This calculator applies the percentage first and then subtracts the coupon, which is the common order. If your retailer does it the other way round the final amount will differ slightly.',
    },
    {
      question: 'What does the real discount rate mean?',
      answer:
        'It is the total amount taken off as a share of the original price. A 30% discount plus a coupon gives a real rate above 30%, which makes different offers directly comparable.',
    },
    {
      question: 'How does the price per item work?',
      answer:
        'Set a quantity above one and the result includes the price per item. A coupon applied to the whole order spreads across the items, so the per-item price depends on the quantity.',
    },
    {
      question: 'Can I include a card discount?',
      answer:
        'Card offers are usually capped, so they deserve their own calculation. The card and coupon calculator handles caps as well as delivery and points.',
    },
  ],
  relatedGuides: ['coupon-and-card-discount', 'unit-price-basics'],
  ui: {
    priceLabel: 'Full price',
    priceUnit: '',
    priceHint: 'The price before any discount.',
    pricePlaceholder: 'e.g. 59.00',
    quantityLabel: 'Quantity',
    quantityUnit: 'items',
    discountLabel: 'Discount',
    discountHint: 'The advertised percentage.',
    couponLabel: 'Coupon (fixed)',
    couponHint: 'Taken off after the percentage.',
    finalLabel: 'Final price',
    listTotalLabel: 'Pre-discount total',
    discountAmountLabel: 'Amount saved',
    effectiveRateLabel: 'Real discount rate',
    perItemLabel: 'Price per item',
    noteFinal: 'You pay %{final}.',
    noteDiscount: 'That is %{amount} off, about %{rate} of the original price.',
    notePerItem: 'Each item works out at %{perItem}.',
    noteOrder: 'The percentage is applied first, then the fixed coupon is subtracted.',
    issuePrice: 'Price cannot be negative.',
    issueQuantity: 'Quantity must be at least one.',
    issueDiscount: 'Enter a discount between 0 and 100.',
    issueCoupon: 'Coupon amount cannot be negative.',
  },
};
