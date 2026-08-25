import type { LifeContent } from '@/lib/life/types';

export const content: LifeContent = {
  title: 'Sweat Stains: Yellow Marks on White, White Marks on Black',
  seoTitle: 'How to Remove Sweat Stains — Yellow Armpit and White Residue',
  seoDescription:
    'Yellow underarm stains and white crusty marks have opposite causes and need opposite treatments. Here is how to tell them apart and fix each one.',
  primaryKeyword: 'how to remove sweat stains',
  secondaryKeywords: [
    'yellow armpit stains',
    'deodorant stains on shirts',
    'white marks on black clothes',
    'underarm stain removal',
  ],
  searchIntent:
    'Wants to remove sweat and deodorant discoloration from clothing and stop it happening again.',
  summary:
    'Yellow stains on white are oxidized body oils. White crusty marks on dark clothing are mineral and antiperspirant residue. One needs alkaline treatment, the other acidic — using the wrong one does nothing.',
  quickAnswer: [
    'White garments: work dish soap into the stain, then soak in hot water with oxygen bleach for one to two hours.',
    'Dark garments: soak in warm water with citric acid or white vinegar for 30 minutes to dissolve the buildup.',
    'Do not use both treatments at once — they neutralize each other. Pick the one that matches the garment.',
    'Either way, rinse thoroughly and dry completely.',
  ],
  supplies: [
    'Dish soap',
    'Oxygen bleach (for whites)',
    'Citric acid or white vinegar (for darks)',
    'A soft toothbrush',
  ],
  steps: [
    {
      title: '1. Identify which problem you have',
      description:
        'Yellow discoloration means oxidized sebum. Stiff white patches mean salt and aluminum residue from antiperspirant. They are chemically opposite, so the same treatment cannot fix both.',
    },
    {
      title: '2. Whites — break down the oil first',
      description:
        'Sebum forms a greasy layer that bleach cannot penetrate. This is why bleach alone so often fails. Apply dish soap directly, wait ten minutes, then work it in gently with a soft toothbrush following the weave.',
    },
    {
      title: '3. Whites — soak in oxygen bleach',
      description:
        'Dissolve oxygen bleach in water around 140°F / 60°C — roughly one tablespoon per gallon — and submerge the whole garment for one to two hours. Cold water barely activates it. Then run a hot wash.',
    },
    {
      title: '4. Darks — dissolve the residue with acid',
      description:
        'The white marks are alkaline mineral deposits, so an acid dissolves them. Add a tablespoon of citric acid or half a cup of white vinegar to warm water and soak for 30 minutes. Using oxygen bleach here would only strip the color.',
    },
    {
      title: '5. Rinse well and dry fully',
      description:
        'Leftover detergent or acid will cause fresh discoloration later. Add an extra rinse and dry the garment completely in the shade.',
    },
  ],
  cautions: [
    'Never use oxygen bleach and vinegar or citric acid at the same time — they cancel each other out. If you use both in sequence, rinse thoroughly in between.',
    'Never mix chlorine bleach with acidic cleaners. The reaction releases toxic chlorine gas.',
    'Do not use oxygen bleach on wool or silk. It damages protein fibers.',
    'Long oxygen bleach soaks will fade colored fabrics. Start at 30 minutes and check.',
    'Check the care label for the maximum wash temperature.',
  ],
  situationTips: [
    {
      title: 'Underarms that feel stiff and crusty',
      description:
        'Aluminum compounds from antiperspirant have bonded with sweat. Even on a white shirt, treat with citric acid first to dissolve that layer, rinse completely, then move to the oxygen bleach step. Doing it in that order works far better than jumping straight to bleach.',
    },
    {
      title: 'Salt rings on summer t-shirts',
      description:
        'That is simply dried perspiration salt. Soaking in warm water for 30 minutes usually removes it with no scrubbing at all.',
    },
    {
      title: 'The garment also smells',
      description:
        'Odor is bacterial and separate from the staining. One hot wash at 140°F generally clears it. Masking it with fragrance makes the combination worse.',
    },
    {
      title: 'Athletic and performance fabrics',
      description:
        'Polyester holds body oils tightly and cannot take high heat. Stay below 105°F, extend the soak time instead, and skip fabric softener — it blocks the fabric structure and makes odor worse.',
    },
  ],
  cause: [
    'Sweat itself is mostly water and salt and is nearly colorless. The staining comes from sebum released alongside it.',
    'Sebum oxidizes on contact with air and turns yellow over time. That is why a shirt looks fine when you take it off and yellow a week later.',
    'The white marks on dark clothing are salt from perspiration combined with aluminum salts from antiperspirant, left behind as the moisture evaporates.',
    'Excess detergent that does not rinse out accelerates yellowing.',
  ],
  prevention: [
    'Wash sweaty clothing the same day. Before the oils oxidize, they come out easily.',
    'Let antiperspirant dry completely before dressing.',
    'Use the recommended detergent dose and add an extra rinse.',
    'Separate whites from darks in summer.',
    'Always wash garments before storing them. Residual sweat becomes next season stains.',
  ],
  faq: [
    {
      question: 'Can I use vinegar on white shirts?',
      answer:
        'Yes, if the underarms are stiff with antiperspirant buildup. It is weak against yellow oxidation though. Use acid for the crusty layer and oxygen bleach for the discoloration, in that order.',
    },
    {
      question: 'What happens if I bleach a dark garment?',
      answer:
        'It fades unevenly and cannot be reversed. Dark clothing with white marks does not need bleach at all — the goal is dissolving minerals, which calls for acid.',
    },
    {
      question: 'Will old yellow stains ever come out?',
      answer:
        'Recent ones usually do. Discoloration that is years old will not lift in a single treatment, but two or three rounds spaced a day apart makes a visible difference.',
    },
    {
      question: 'Does chlorine bleach work better on whites?',
      answer:
        'It looks brighter briefly but weakens fibers, and on polyester blends it can actually turn fabric yellow. Oxygen bleach is safer and gives better results.',
    },
  ],
  sources: [
    { label: 'Check the garment care label for fiber content and maximum wash temperature.' },
  ],
  searchTerms: [
    'sweat stains',
    'yellow armpit',
    'deodorant buildup',
    'pit stains',
    'white residue black shirt',
  ],
};
