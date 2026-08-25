import type { GuideContent } from '@/lib/guides/types';

export const contentEn: GuideContent = {
  title: 'What the break-even point really tells you',
  seoTitle: 'Break-even explained — fixed costs and contribution margin',
  seoDescription:
    'The break-even point is fixed costs divided by contribution margin. Here is how to split your costs correctly and how to bring the number down.',
  lead: '"How many do I need to sell to cover my costs?" That single question is the break-even point, and it is worth answering before you start and again every quarter.',
  takeaways: [
    'Contribution margin = price - variable cost, the amount each sale puts towards fixed costs.',
    'Break-even units = fixed costs / contribution margin.',
    'Past break-even, each additional contribution becomes profit.',
    'Lower fixed costs or a larger contribution margin both pull the break-even point down.',
  ],
  sections: [
    {
      heading: 'Splitting fixed from variable',
      paragraphs: [
        'Fixed costs appear even when you sell nothing: rent, salaried staff, insurance, depreciation, base subscriptions.',
        'Variable costs rise with each sale: goods, packaging, payment fees, shipping.',
        'Some costs sit in between — hourly staff, utilities. Pick a side, document the choice and stay consistent so the numbers stay comparable over time.',
      ],
    },
    {
      heading: 'Contribution margin is the engine',
      paragraphs: [
        'Contribution margin is what remains from a sale after the variable costs of making it. It is the money that pays down your fixed costs.',
        'At a price of 15 and a variable cost of 9, each sale contributes 6. With fixed costs of 3,000 you need 500 sales to break even.',
        'The contribution ratio — contribution divided by price — shows how much of every 100 in revenue goes towards fixed costs. Here it is 40%.',
      ],
    },
    {
      heading: 'What happens above break-even',
      paragraphs: [
        'Everything you earn up to the break-even point goes to fixed costs. After it, each additional sale adds its full contribution to profit.',
        'That is why a business hovering near break-even flips into loss with a small dip in sales. Aim for a margin of safety, not just a break-even.',
      ],
    },
    {
      heading: 'Three ways to lower it',
      paragraphs: [
        'Reduce fixed costs — renegotiate rent, cut unused subscriptions, revisit staffing.',
        'Raise the price — a larger contribution means fewer units are needed, though demand may soften.',
        'Reduce variable costs — negotiate supply, simplify packaging, move to a lower-fee channel.',
      ],
      bullets: ['Lower fixed costs', 'Raise the price', 'Lower variable costs'],
    },
    {
      heading: 'Selling more than one product',
      paragraphs: [
        'With different contribution margins per product there is no single unit break-even. Use a weighted average contribution ratio based on your sales mix.',
        'Alternatively, calculate break-even in revenue terms: fixed costs divided by the contribution ratio.',
      ],
    },
  ],
  faq: [
    {
      question: 'Where does tax fit in?',
      answer:
        'It is left out of the basic calculation. Sales tax behaves like a pass-through, and income or corporate tax only applies once you are profitable — that is, above break-even.',
    },
    {
      question: 'How do I estimate this before launching?',
      answer:
        'Fixed costs are usually easy to pin down. Estimate variable costs from supplier quotes and the price from competitors, then ask whether the resulting volume is realistic.',
    },
    {
      question: 'My break-even looks impossibly high.',
      answer:
        'That usually means fixed costs are too heavy or the contribution margin is too thin. It is a signal to revisit the business model rather than to sell harder.',
    },
  ],
};
