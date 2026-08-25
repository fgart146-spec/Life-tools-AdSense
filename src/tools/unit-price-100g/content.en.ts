import type { ToolContent } from '@/lib/tools/types';
import type { UnitPriceToolCopy } from '@/lib/tools/shared/unit-price-copy';

export const contentEn: ToolContent<UnitPriceToolCopy> = {
  title: 'Price per 100 g calculator',
  seoTitle: 'Price per 100 g calculator — compare packs of any size',
  seoDescription:
    'Enter a price and a weight to get the price per 100 g and per kilogram, so packs of different sizes can be compared on the same basis.',
  lead: 'Enter the price and the weight, and you get the price per 100 g and per kilogram — the fastest way to compare packs that come in different sizes.',
  summary: 'Turn any price and pack weight into a price per 100 g and per kg.',
  keywords: {
    primaryKeyword: 'price per 100g calculator',
    secondaryKeywords: [
      'cost per 100 grams',
      'price per gram',
      'unit price calculator',
      'compare pack sizes',
      'price per kilo',
    ],
    searchIntent:
      'Work out the price per 100 g so packs with different weights and prices can be compared directly.',
  },
  howItWorks: [
    'The price is divided by the total weight to get a price per gram, then multiplied by 100.',
    'Choosing kilograms converts the weight at 1 kg = 1,000 g before the calculation.',
    'Setting a quantity above one uses the total weight (weight per pack x quantity), so multi-packs work too.',
    'For an accurate figure, enter what you actually pay after any discount rather than the shelf price.',
    'Everything is calculated in your browser; nothing is sent to a server or stored.',
  ],
  formula: [
    {
      label: 'Total weight',
      expression: 'total weight (g) = weight per pack x quantity (x 1,000 if entered in kg)',
    },
    {
      label: 'Price per 100 g',
      expression: 'price per 100 g = price / total weight (g) x 100',
      note: 'Use the amount you actually pay, including any discount.',
    },
    {
      label: 'Price per kilogram',
      expression: 'price per kg = price per 100 g x 10',
    },
  ],
  example: {
    scenario: 'A 400 g jar of coffee costs $18.00; a 1 kg bag of the same coffee costs $39.00.',
    steps: [
      '400 g jar: 18.00 / 400 = $0.045 per gram, so $4.50 per 100 g',
      '1 kg bag: 39.00 / 1,000 = $0.039 per gram, so $3.90 per 100 g',
      'Difference: $0.60 per 100 g, about 13% cheaper for the bag',
    ],
    conclusion:
      'The 1 kg bag is about 13% cheaper per 100 g. That only holds if the coffee stays fresh long enough for you to finish it.',
  },
  notes: [
    'Packaging weight and drained weight are not the same thing. Tinned goods often list both a total weight and a drained weight — compare like with like.',
    'Dried and frozen products change weight when prepared, so price per 100 g alone will not tell you which is better value for a meal.',
    'A lower unit price is only a saving if the product gets used before it spoils.',
    'For online orders, add delivery to the price before calculating, otherwise the unit price is understated.',
  ],
  faq: [
    {
      question: 'Why compare per 100 g rather than per pack?',
      answer:
        'Pack sizes differ, so shelf prices are not comparable on their own. Converting to a common 100 g basis puts a 300 g pack and a 1.2 kg pack on the same scale — the same logic supermarket unit-price labels use.',
    },
    {
      question: 'Which price should I enter if I have a discount code?',
      answer:
        'Enter the amount you actually pay after the code and any card discount. Using the shelf price makes the unit price look higher than it really is.',
    },
    {
      question: 'How do I handle a buy-one-get-one offer?',
      answer:
        'Enter the price you pay and the number of packs you receive. For buy one get one free, that is the price of one pack with a quantity of two.',
    },
    {
      question: 'Is the cheapest price per 100 g always the best buy?',
      answer:
        'No. Storage space, shelf life and how quickly you use the product matter. Throwing half of a large pack away costs more than paying a little extra for a smaller one.',
    },
  ],
  relatedGuides: ['unit-price-basics', 'bulk-not-always-cheaper'],
  ui: {
    priceLabel: 'Price',
    priceUnit: '',
    priceHint: 'Use the amount you actually pay, after discounts.',
    pricePlaceholder: 'e.g. 18.00',
    amountLabel: 'Weight per pack',
    amountHint: 'Copy the weight printed on the packaging.',
    amountPlaceholder: 'e.g. 400',
    unitLabel: 'Weight unit',
    unitSmall: 'Grams (g)',
    unitLarge: 'Kilograms (kg)',
    quantityLabel: 'Quantity',
    quantityUnit: 'packs',
    quantityHint: 'For multi-packs, enter how many packs you get.',
    primaryLabel: 'Price per 100 g',
    secondaryLabel: 'Price per kilogram',
    perItemLabel: 'Price per pack',
    totalLabel: 'Total weight',
    noteMain: 'This works out at %{primary} per 100 g.',
    noteSecondary: 'That is %{secondary} per kilogram.',
    noteQuantity: 'With %{quantity} packs, each pack costs %{perItem}.',
    noteCompare: 'To compare products, line up the price per 100 g figures.',
    issuePrice: 'Price cannot be negative.',
    issueAmount: 'Weight must be greater than zero.',
    issueQuantity: 'Quantity must be at least one.',
  },
};
