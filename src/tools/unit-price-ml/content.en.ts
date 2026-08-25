import type { ToolContent } from '@/lib/tools/types';
import type { UnitPriceToolCopy } from '@/lib/tools/shared/unit-price-copy';

export const contentEn: ToolContent<UnitPriceToolCopy> = {
  title: 'Price per 100 ml calculator',
  seoTitle: 'Price per 100 ml calculator — compare bottles and refills',
  seoDescription:
    'Work out the price per 100 ml and per litre for drinks, detergent, shampoo and any other liquid sold in different bottle sizes.',
  lead: 'Enter a price and a volume to see the price per 100 ml and per litre — the quickest way to check whether the bigger bottle really is better value.',
  summary: 'Turn any price and bottle size into a price per 100 ml and per litre.',
  keywords: {
    primaryKeyword: 'price per 100ml calculator',
    secondaryKeywords: [
      'cost per ml',
      'price per litre calculator',
      'compare bottle sizes',
      'detergent unit price',
      'refill vs bottle price',
    ],
    searchIntent:
      'Compare liquids sold in different bottle sizes by converting each to a price per 100 ml or per litre.',
  },
  howItWorks: [
    'The price is divided by the total volume to get a price per millilitre, then multiplied by 100.',
    'Choosing litres converts the volume at 1 L = 1,000 ml first.',
    'A quantity above one uses the total volume (volume per bottle x quantity), so multipacks work as they are.',
    'Refills and standard bottles become directly comparable once both are expressed per 100 ml.',
    'All calculation happens in your browser; nothing is sent to a server.',
  ],
  formula: [
    {
      label: 'Total volume',
      expression: 'total volume (ml) = volume per bottle x quantity (x 1,000 if entered in litres)',
    },
    {
      label: 'Price per 100 ml',
      expression: 'price per 100 ml = price / total volume (ml) x 100',
    },
    {
      label: 'Price per litre',
      expression: 'price per litre = price per 100 ml x 10',
    },
  ],
  example: {
    scenario: 'A 1.5 L bottle of laundry detergent costs 9.60; a 3 L refill pouch costs 16.80.',
    steps: [
      'Bottle: 9.60 / 1,500 ml = 0.0064 per ml, so 0.64 per 100 ml',
      'Refill: 16.80 / 3,000 ml = 0.0056 per ml, so 0.56 per 100 ml',
      'Difference: 0.08 per 100 ml, about 12.5% cheaper',
    ],
    conclusion: 'The refill is about 12.5% cheaper per 100 ml — 5.60 per litre against 6.40.',
  },
  notes: [
    'Concentrated products go further per 100 ml. Check the recommended dose per wash and compare cost per use, not just cost per volume.',
    'Cordials and syrups are diluted before use, so a straight volume comparison understates their value.',
    'Check whether the label states millilitres or grams. If it is grams, use the price per 100 g calculator instead.',
    'A cheaper unit price only helps if the product is used before it expires or takes over your storage space.',
  ],
  faq: [
    {
      question: 'Is a refill pouch always cheaper than the bottle?',
      answer:
        'Usually, but not always. When the bottle is on promotion it can drop below the refill on a per-100 ml basis, which is exactly why it is worth checking rather than assuming.',
    },
    {
      question: 'How do I compare concentrated and regular detergent?',
      answer:
        'Price per 100 ml alone is not enough, because a concentrate often uses half the dose. Divide the volume by the recommended dose to get the number of washes, then divide the price by that number to compare cost per wash.',
    },
    {
      question: 'How do I enter a six-pack of drinks?',
      answer:
        'Use the total pack price, the volume of a single bottle and a quantity of six. The result is based on the total volume.',
    },
    {
      question: 'Should delivery be included?',
      answer:
        'Yes, for online orders add delivery to the price. Otherwise a heavy liquid that looks cheap per 100 ml can end up costing more once shipping is counted.',
    },
  ],
  relatedGuides: ['unit-price-basics', 'bulk-not-always-cheaper'],
  ui: {
    priceLabel: 'Price',
    priceUnit: '',
    priceHint: 'Use the amount you actually pay, including delivery if any.',
    pricePlaceholder: 'e.g. 9.60',
    amountLabel: 'Volume per bottle',
    amountHint: 'Copy the volume printed on the label.',
    amountPlaceholder: 'e.g. 1.5',
    unitLabel: 'Volume unit',
    unitSmall: 'Millilitres (ml)',
    unitLarge: 'Litres (L)',
    quantityLabel: 'Quantity',
    quantityUnit: 'bottles',
    quantityHint: 'For multipacks, enter how many bottles you get.',
    primaryLabel: 'Price per 100 ml',
    secondaryLabel: 'Price per litre',
    perItemLabel: 'Price per bottle',
    totalLabel: 'Total volume',
    noteMain: 'This works out at %{primary} per 100 ml.',
    noteSecondary: 'That is %{secondary} per litre.',
    noteQuantity: 'With %{quantity} bottles, each bottle costs %{perItem}.',
    noteCompare: 'To compare products, line up the price per 100 ml figures.',
    issuePrice: 'Price cannot be negative.',
    issueAmount: 'Volume must be greater than zero.',
    issueQuantity: 'Quantity must be at least one.',
  },
};
