import type { GuideContent } from '@/lib/guides/types';

export const contentEn: GuideContent = {
  title: 'Why the big pack is not always cheaper',
  seoTitle: 'Why bulk is not always cheaper — use the effective unit price',
  seoDescription:
    'Bulk packs have a lower unit price, but only if you finish them. Here is how to adjust for waste and find the usage rate where bulk starts to pay.',
  lead: '"Buy bigger, pay less" is only half true. The bulk pack wins on one condition: you have to use all of it.',
  takeaways: [
    'The unit-price advantage of a bulk pack is usually 5-20%.',
    'Throwing away 20% wipes that advantage out completely.',
    'Ask how much of it you must use before bulk pays — that is the break-even usage rate.',
    'Non-perishables favour bulk; fresh food often favours the smaller pack.',
  ],
  sections: [
    {
      heading: 'The bulk discount is smaller than it feels',
      paragraphs: [
        'Compare real shelf prices and the bulk advantage usually lands between 5% and 20%. When the smaller pack is on promotion, it frequently disappears entirely.',
        'Meanwhile the cash outlay is much larger. A 10% better unit price can mean spending 60% more in one trip.',
      ],
    },
    {
      heading: 'Waste erases the advantage',
      paragraphs: [
        'If the bulk pack is 10% cheaper per unit and you throw away 10%, you have broken even. Throw away 20% and you paid more than you would have for the small pack.',
        'The effective unit price is price divided by (size x the share you actually use). At 80% usage, the effective price is 25% higher than the label suggests.',
      ],
      bullets: [
        '100% used — unit price as advertised',
        '90% used — effective price about 11% higher',
        '80% used — effective price 25% higher',
        '70% used — effective price about 43% higher',
      ],
    },
    {
      heading: 'Think in break-even usage',
      paragraphs: [
        'A more practical question is: what share of the bulk pack must I use before it beats the small one?',
        'If the bulk pack is nominally 10% cheaper, you need to use about 91% of it. If it is 30% cheaper, 77% is enough. The bigger the discount, the more slack you have.',
        'Recall how much of the last one you actually finished, and compare that with the break-even figure.',
      ],
    },
    {
      heading: 'Category matters',
      paragraphs: [
        'Toilet paper, detergent and bottled water do not spoil, so usage is effectively 100%. For those, buy on unit price alone.',
        'Fresh food, cooking oil, nuts and dairy lose quality once opened. For one- and two-person households, the smaller pack often wins on the effective price.',
      ],
    },
    {
      heading: 'Storage is a cost too',
      paragraphs: [
        'Bulk takes space. A large jar occupying a fridge shelf can push other food out of sight, and food you cannot see is food you throw away.',
        'It never appears on a receipt, but it is a real cost. When storage is tight, the small pack is usually the better call unless the discount is substantial.',
      ],
    },
  ],
  faq: [
    {
      question: 'How do I estimate my usage rate?',
      answer:
        'Think back to the last time you bought the same product. If you are unsure, run the numbers at 80% and at 100% — if bulk wins in both cases, buy it with confidence.',
    },
    {
      question: 'Should single-person households avoid bulk?',
      answer:
        'For food, usually yes. For non-perishables such as paper goods and cleaning products, bulk still wins as long as you have somewhere to put it.',
    },
    {
      question: 'Does freezing change the maths?',
      answer:
        'It helps, but only if you actually portion and freeze it. Be honest about whether you will, and remember some foods lose quality after freezing.',
    },
  ],
};
