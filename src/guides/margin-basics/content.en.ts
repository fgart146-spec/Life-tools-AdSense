import type { GuideContent } from '@/lib/guides/types';

export const contentEn: GuideContent = {
  title: 'Margin, cost ratio and markup explained',
  seoTitle: 'Margin vs markup vs cost ratio — the three numbers people confuse',
  seoDescription:
    'Margin is measured against revenue, markup against cost. Here is why the same deal produces different numbers and how to price without confusing them.',
  lead: '"Leave me a 30% margin" can mean two different prices. Whether the 30% is measured against revenue or against cost changes the answer significantly.',
  takeaways: [
    'Margin = profit / revenue. Markup = profit / cost.',
    'Cost ratio = cost / revenue, the mirror image of gross margin.',
    'Buying at 10 and selling at 20 is a 50% margin but a 100% markup.',
    'A margin that ignores fees and shipping is not the margin you keep.',
  ],
  sections: [
    {
      heading: 'The three definitions',
      paragraphs: [
        'Gross margin is the share of revenue left after the cost of goods: profit divided by revenue.',
        'Cost ratio is the mirror image: cost divided by revenue.',
        'Markup describes how much was added on top of cost: profit divided by cost.',
      ],
      bullets: [
        'Cost 10, price 20',
        'Margin = 10 / 20 = 50%',
        'Cost ratio = 10 / 20 = 50%',
        'Markup = 10 / 10 = 100%',
      ],
    },
    {
      heading: 'Why they get mixed up',
      paragraphs: [
        'The denominator differs. Margin divides by revenue, markup divides by cost, so the same transaction produces 50% and 100%.',
        'If you and a supplier each assume a different basis, the agreed price will be wrong. Settle the basis before quoting a number.',
      ],
    },
    {
      heading: 'Working backwards from a target margin',
      paragraphs: [
        'To keep a 30% margin, divide the cost by 0.7 rather than adding 30% to it. A cost of 10 becomes 14.29.',
        'Adding 30% gives 13, and the profit of 3 is only 23% of revenue — not the margin you intended.',
        'When a marketplace fee applies, subtract it in the denominator too: cost / (1 - margin - fee rate).',
      ],
    },
    {
      heading: 'Judge on net profit, not gross margin',
      paragraphs: [
        'Gross margin ignores marketplace fees, payment processing, shipping, packaging, advertising and returns.',
        'Calculating the margin after all of those keeps you from the classic trap of rising revenue with nothing left at the end of the month.',
      ],
    },
    {
      heading: 'Keep tax consistent',
      paragraphs: [
        'Mixing a tax-inclusive price with a tax-exclusive cost inflates the margin.',
        'If you are registered for VAT or sales tax, run every figure on a tax-exclusive basis.',
      ],
    },
  ],
  faq: [
    {
      question: 'What margin should I aim for?',
      answer:
        'It depends on the category. Fast-moving food runs on thin margins; fashion and homeware carry more because of stock risk. What matters is whether the margin covers your fixed costs.',
    },
    {
      question: 'My margin looks healthy but there is no cash left.',
      answer:
        'You are probably looking at gross margin. Advertising, returns and storage come out afterwards. Run the break-even calculator with your fixed costs included.',
    },
    {
      question: 'How much does a discount cost me?',
      answer:
        'More than the discount percentage. Cutting the price of a 30% margin product by 10% leaves roughly a 22% margin, because the discount comes entirely out of profit.',
    },
  ],
};
