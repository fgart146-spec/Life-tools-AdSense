import type { GuideContent } from '@/lib/guides/types';

export const contentEn: GuideContent = {
  title: 'The easiest way to compare unit prices',
  seoTitle: 'How to compare unit prices — put every pack on the same scale',
  seoDescription:
    'Pack sizes differ, so shelf prices cannot be compared directly. Here is how to convert any price to a price per 100 g, 100 ml or item.',
  lead: 'Is the 20-pack cheaper than the 5-pack? Is the refill better value than the bottle? The answer is always the same: convert both to a unit price and the comparison becomes obvious.',
  takeaways: [
    'Compare price per 100 g, per 100 ml or per item — never the shelf price alone.',
    'Supermarket shelf labels usually show a unit price in small print.',
    'Use the amount you actually pay, after discounts and including delivery.',
    'A cheaper unit price is only a saving if the product gets used.',
  ],
  sections: [
    {
      heading: 'What a unit price is',
      paragraphs: [
        'A unit price answers one question: what does a fixed amount cost? Price per 100 g, per 100 ml and per item are all unit prices.',
        'Because pack sizes vary, shelf prices are not comparable on their own. A 600 g pack at 16.80 and a 1.2 kg pack at 30.00 look unrelated until you convert them to 2.80 and 2.50 per 100 g.',
      ],
    },
    {
      heading: 'Choose the right basis first',
      paragraphs: [
        'Use weight for meat, fruit and nuts; volume for drinks, detergent and shampoo; and item count for tissue, wipes and packaged goods.',
        'Watch out when the item itself varies in size. Comparing a 30-roll pack with a 24-roll pack tells you nothing if the rolls are different lengths — switch to price per metre instead.',
      ],
      bullets: [
        'Sold by weight — price per 100 g',
        'Sold by volume — price per 100 ml',
        'Sold by count — price per item, or per metre/sheet when sizes differ',
      ],
    },
    {
      heading: 'Reading the shelf label',
      paragraphs: [
        'Most large retailers print a unit price under the headline price. It exists precisely so shoppers can compare different pack sizes.',
        'The basis can differ between product groups, though — one label may use 100 g and another 1 kg. If two labels use different bases, convert before comparing.',
      ],
    },
    {
      heading: 'Discounts change the answer',
      paragraphs: [
        'Always calculate from the amount you actually pay. A 20% discount changes the unit price, and a coupon can flip which product is cheaper.',
        'For online orders, add delivery. A heavy product that looks cheap per 100 ml can lose its advantage once shipping is counted.',
      ],
    },
    {
      heading: 'Unit price is the start, not the end',
      paragraphs: [
        'Storage space, shelf life and how fast you use something all matter. Throwing away a third of a large pack wipes out the saving.',
        'This is most obvious with fresh food and products that degrade after opening, such as cooking oil or nuts. Adjusting the unit price for the share you actually use makes the decision clear.',
      ],
    },
  ],
  faq: [
    {
      question: 'Do I really have to calculate this every time?',
      answer:
        'No. Remember a benchmark for the few items you buy often — "milk under 2.00 per litre is a good price" — and you can judge instantly in the aisle.',
    },
    {
      question: 'Is the biggest pack always cheapest?',
      answer:
        'No. When the smaller pack is on promotion the unit prices often swap places, which is exactly why the habit of checking matters.',
    },
    {
      question: 'Can I compare weight against volume?',
      answer:
        'Not directly. Grams and millilitres measure different things and the relationship depends on density. Compare like with like.',
    },
  ],
};
