import type { ToolContent } from '@/lib/tools/types';
import type { ComparePriceCopy } from './copy';

export const contentEn: ToolContent<ComparePriceCopy> = {
  title: 'Which one is cheaper?',
  seoTitle: 'Which one is cheaper — compare two products including coupons and delivery',
  seoDescription:
    'Compare two products of different sizes on the same basis. Coupons, card discounts, delivery and loyalty points are all included in the unit price.',
  lead: 'Enter the price, size and any discounts for two products. You get the real cost of each, the unit price, and how much you save by picking the cheaper one.',
  summary: 'Compare two products including coupons, delivery and points.',
  keywords: {
    primaryKeyword: 'which is cheaper calculator',
    secondaryKeywords: [
      'compare two prices',
      'unit price comparison',
      'price comparison with delivery',
      'compare pack sizes',
      'real cost comparison',
    ],
    searchIntent:
      'Decide which of two products is genuinely cheaper once size, discounts and delivery are taken into account.',
  },
  howItWorks: [
    'Each product is priced first: item total, then a percentage coupon, then a fixed coupon, then a card discount, then delivery is added and points are deducted.',
    'Points are calculated on the item total excluding delivery, and subtracted to give the effective cost.',
    'The effective cost is divided by the total amount (size per pack x quantity) to give a unit price. Kilograms and litres are converted to grams and millilitres.',
    'The two unit prices are compared to show which is cheaper and by what percentage.',
    'Savings are shown for buying the same amount as product A, and repeated monthly and yearly if you set a purchase frequency.',
    'Weight and volume cannot be compared with each other, so a warning appears if the units do not match.',
  ],
  formula: [
    {
      label: 'Effective cost',
      expression:
        'cost = ((item total x (1 - coupon %)) - fixed coupon) x (1 - card %) + delivery - points',
    },
    { label: 'Unit price', expression: 'unit price = effective cost / (size per pack x quantity)' },
    {
      label: 'Percentage difference',
      expression: 'difference = (higher unit price - lower unit price) / higher unit price x 100',
    },
    {
      label: 'Savings',
      expression:
        'saving = unit price difference x reference amount; yearly = saving x purchases per month x 12',
    },
  ],
  example: {
    scenario:
      'A: 1.2 L of detergent at 12.90 with a 10% coupon and 3.00 delivery. B: 2 L at 19.90 with free delivery and 5% points back.',
    steps: [
      'A: 12.90 x 0.9 = 11.61 plus 3.00 delivery = 14.61 for 1,200 ml, so 1.22 per 100 ml',
      'B: 19.90 - 1.00 points = 18.90 for 2,000 ml, so 0.95 per 100 ml',
      'Difference: 0.27 per 100 ml, about 22% cheaper',
    ],
    conclusion:
      'B is about 22% cheaper per 100 ml. Buying the same 1,200 ml as pack A, the gap is around 3.28 per shop, or roughly 39 a year if you buy monthly.',
  },
  notes: [
    'Adding items you do not need to reach free delivery increases what you spend. Only enter what you would genuinely buy.',
    'Loyalty points are usually only redeemable on a future order. Leave the points field empty for a more conservative comparison.',
    'Weight and volume are not interchangeable. Convert both products to the same kind of unit before comparing.',
    'A large pack that exceeds your storage space or use-by date is not a saving.',
    'Card discounts are often capped. Entering the headline percentage on a large order can overstate the discount.',
  ],
  faq: [
    {
      question: 'In what order are coupons and card discounts applied?',
      answer:
        'Percentage coupon first, then any fixed-amount coupon, then the card discount on what remains. Most retailers work this way, but it is worth checking the total at the payment screen.',
    },
    {
      question: 'Should loyalty points count as a discount?',
      answer:
        'That is your call. If you reliably spend them, treating them as a discount is reasonable. If they often expire unused, leave the field blank.',
    },
    {
      question: 'Why is delivery excluded from the discounts?',
      answer:
        'Most coupons and card offers apply to the goods only, not to shipping, so delivery is added after the discounts have been applied.',
    },
    {
      question: 'Can I compare products sold by the item?',
      answer:
        'Yes — set the unit to items and the comparison runs on price per item. If the items themselves differ in size, the price per item calculator with its smaller-unit field is more precise.',
    },
    {
      question: 'What is the reference amount used for savings?',
      answer:
        'The total amount of product A. If you actually need a different quantity, enter that quantity for A and the saving updates accordingly.',
    },
  ],
  relatedGuides: ['unit-price-basics', 'coupon-and-card-discount', 'bulk-not-always-cheaper'],
  ui: {
    productA: 'Product A',
    productB: 'Product B',
    priceLabel: 'Price',
    priceUnit: '',
    pricePlaceholder: 'e.g. 12.90',
    amountLabel: 'Size per pack',
    amountPlaceholder: 'e.g. 1.2',
    unitLabel: 'Unit',
    quantityLabel: 'Quantity',
    quantityUnit: 'packs',
    unitOptionG: 'Grams (g)',
    unitOptionKg: 'Kilograms (kg)',
    unitOptionMl: 'Millilitres (ml)',
    unitOptionL: 'Litres (L)',
    unitOptionEa: 'Items',
    advancedToggle: 'Coupons, card discount and delivery',
    couponPercentLabel: 'Coupon (%)',
    couponAmountLabel: 'Coupon (fixed)',
    cardPercentLabel: 'Card discount (%)',
    shippingLabel: 'Delivery',
    pointPercentLabel: 'Points back (%)',
    repeatLabel: 'Purchases per month',
    repeatUnit: 'times',
    repeatHint: 'How often you buy this in a typical month.',
    verdictLabel: 'Verdict',
    winnerA: 'Product A is cheaper',
    winnerB: 'Product B is cheaper',
    tie: 'Both cost the same',
    perUnitLabel: 'unit price',
    finalPriceLabel: 'effective cost',
    perItemLabel: 'per item',
    totalAmountLabel: 'Total amount',
    differenceLabel: 'Unit price gap',
    savingTitle: 'What you save',
    savingPerPurchase: 'Per shop',
    savingMonthly: 'Per month',
    savingYearly: 'Per year',
    noteWinner: '%{winner} — about %{percent} on unit price.',
    noteSaving: 'Buying %{amount}, the gap is about %{saving}.',
    noteRepeat:
      'Repeating that purchase, the gap is around %{monthly} a month and %{yearly} a year.',
    noteTie: 'The unit prices match. Choose on delivery time, storage or preference.',
    noteEffective: 'The effective cost includes coupons, card discount, delivery and points.',
    issueAPrice: 'Product A price cannot be negative.',
    issueAAmount: 'Product A size must be greater than zero.',
    issueAQuantity: 'Product A quantity must be at least one.',
    issueBPrice: 'Product B price cannot be negative.',
    issueBAmount: 'Product B size must be greater than zero.',
    issueBQuantity: 'Product B quantity must be at least one.',
    issueUnitMismatch:
      'Weight and volume cannot be compared. Use the same kind of unit for both products.',
  },
};
