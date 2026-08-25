import type { LifeContent } from '@/lib/life/types';

export const content: LifeContent = {
  title: 'Clothes Still Smell After Washing? Find Out Which of Three Things Is Wrong',
  seoTitle: 'Clothes Smell After Washing: Machine, Detergent, or Drying?',
  seoDescription:
    'Laundry that comes out smelling is almost always one of three problems: a dirty washer, too much detergent, or clothes drying too slowly. Here is how to tell which one you have and fix it.',
  primaryKeyword: 'clothes smell after washing',
  secondaryKeywords: [
    'washing machine smells bad',
    'laundry smells musty',
    'why does my laundry smell sour',
    'how to clean a washing machine',
  ],
  searchIntent:
    'Laundry comes out of the machine smelling stale or sour instead of clean, and the person wants to know what is actually causing it before buying another product.',
  summary:
    'There are only three realistic causes: the machine itself is contaminated, you are using more detergent than can rinse out, or the clothes are taking too long to dry. Run one diagnostic sniff test to identify which, then treat that one. Adding stronger-scented detergent fixes none of them.',
  quickAnswer: [
    'Open the empty washer and smell the drum and the rubber door gasket. If the smell is there with no laundry in it, the machine is the problem.',
    'If the machine is clean but clothes smell as soon as they get damp, you are overdosing detergent. Cut the dose by a third and add an extra rinse.',
    'If clothes smell fine straight out of the dryer but stale after hanging, drying is too slow. Get them dry within about 5 to 6 hours.',
    'Machine fix: run an empty hot cycle with oxygen bleach (sodium percarbonate), then wipe the gasket and leave the door open.',
    'Take the load out the moment the cycle ends. Wet laundry sitting in a warm drum starts smelling in under an hour.',
  ],
  supplies: [
    'Oxygen bleach (sodium percarbonate) or a dedicated washing machine cleaner',
    'An old toothbrush or a rag for the door gasket',
    'A measuring cap or kitchen scale for detergent',
    'A fan, if you dry indoors',
  ],
  steps: [
    {
      title: '1. Run the sniff test on an empty machine',
      description:
        'Open the door on a machine that has been sitting empty for a few hours and put your nose near the drum, then peel back the rubber door seal and smell underneath. If either smells sour or moldy, stop diagnosing — you have found it. Every load will pick up that smell no matter what detergent you use.',
    },
    {
      title: '2. Clean the gasket and drawer by hand',
      description:
        'Front-loaders trap water and lint in the fold of the door seal, and that pocket is where the growth lives. Wipe it out with a damp rag, working around the whole circumference, and use a toothbrush on the fold. Pull the detergent drawer all the way out and rinse off the slime that collects behind it.',
    },
    {
      title: '3. Run a hot empty cycle with oxygen bleach',
      description:
        'Add oxygen bleach directly to the drum and run the hottest, longest cycle with no laundry inside. Sodium percarbonate needs heat to do anything useful — a cold cycle mostly just rinses. Do this monthly if your machine sits in a humid room.',
    },
    {
      title: '4. Cut your detergent dose and measure it',
      description:
        'Most people pour by eye and overshoot badly, especially with concentrated liquids. Detergent that cannot rinse away stays in the fibers and feeds odor-causing bacteria, so more soap literally makes clothes smell worse. Measure the dose for your load size and water hardness, then reduce it by about a third and see if the smell stops.',
    },
    {
      title: '5. Add an extra rinse for a few loads',
      description:
        'If residue has already built up, one wash will not clear it. Run an extra rinse on the next several loads to pull accumulated detergent and softener out of the fabric. You may notice towels and workout shirts feeling different — that is the film coming off.',
    },
    {
      title: '6. Unload immediately and dry fast',
      description:
        'Damp laundry left in the drum for a couple of hours will smell even if everything else is right. Move it to the dryer or the line straight away, spread items out so air moves between them, and aim to have everything bone dry within 5 to 6 hours. If you dry indoors, a fan pointed at the rack shortens that dramatically.',
    },
    {
      title: '7. Re-test one load before changing anything else',
      description:
        'Change one variable at a time. Wash a normal load after the machine clean with a measured detergent dose and fast drying, then judge the result. If you change detergent, dose and drying all at once, you will never know which one mattered.',
    },
  ],
  cautions: [
    'Never mix chlorine bleach with any acidic cleaner such as white vinegar, citric acid, or a limescale descaler. That combination releases toxic chlorine gas.',
    'Do not use chlorine bleach and oxygen bleach in the same cycle. Pick one; combining them gains nothing.',
    'Do not run a hot cleaning cycle with clothes inside. Wash-and-clean-at-once ruins garments and does a worse job on the machine.',
    'Check your washing machine manual before using any cleaning product. Some manufacturers restrict bleach in the drum or specify a particular cleaning cycle.',
    'Do not disassemble the machine to reach the pump or drum. Cleaning the filter behind the access panel is fine if the manual describes it; anything further is a service job.',
    'Skip fabric softener while you are troubleshooting. It leaves a film that holds moisture and makes the smell harder to trace.',
  ],
  situationTips: [
    {
      title: 'Only workout clothes and synthetics smell',
      description:
        'Polyester and nylon hold body oils far more stubbornly than cotton, and normal washing does not always reach them. Soak those items alone in warm water with oxygen bleach for an hour before washing, and stop using softener on them entirely — the coating traps the oils in.',
    },
    {
      title: 'The smell only appears in humid months',
      description:
        'Then drying speed is your bottleneck, not detergent. Space garments a hand-width apart on the rack, run a fan, and if you have a dehumidifier put it in the same room with the door closed. Enclosed and dehumidified beats a big open room with still air.',
    },
    {
      title: 'A top-loader that smells',
      description:
        'Top-loaders have less trapped water than front-loaders but often hide residue under the agitator and around the rim of the tub. Wipe the rim and the underside of the lid, and leave the lid open between loads so the drum dries.',
    },
    {
      title: 'You cleaned the machine and it came back in two weeks',
      description:
        'The drum is not drying out between loads. Leave the door and the detergent drawer open all the time, and if the machine lives in a closet, leave that door open too. A machine sealed shut in a warm cupboard will re-grow within days.',
    },
  ],
  cause: [
    'The smell is produced by bacteria and mold living on residue inside the machine, the fabric, or both. Scent in detergent covers it for a day and does nothing to the organisms.',
    'Detergent and softener that do not rinse away become a food supply. This is why overdosing produces exactly the opposite of the intended result.',
    'Cold-water washing is gentle on clothes but never gets hot enough to reduce the bacterial population, so it slowly builds over months.',
    'Slow drying gives the surviving bacteria the long damp window they need to multiply, which is why the same clothes can be fine in summer and stale in a wet week.',
  ],
  prevention: [
    'Measure detergent instead of pouring by eye, and dose for the actual load size rather than the maximum.',
    'Leave the washer door and detergent drawer open between loads so the drum dries completely.',
    'Wipe the door gasket dry after the last load of the day — it takes fifteen seconds and prevents most recurrences.',
    'Run one hot cycle a month, either an empty maintenance wash or a hot load of towels and bedding.',
    'Do not leave damp laundry in the hamper. Hang wet workout clothes to dry before they go in.',
    'Skip fabric softener on towels, activewear, and anything that already smells. It makes the problem harder to solve.',
  ],
  faq: [
    {
      question: 'Will switching to a stronger-scented detergent help?',
      answer:
        'No. Fragrance masks the smell while the clothes are dry and disappears the moment they get damp or warm, because the bacteria producing the odor are still there. If anything, a heavier dose adds residue and makes the underlying problem worse.',
    },
    {
      question: 'Does white vinegar in the rinse work?',
      answer:
        'It helps modestly. Vinegar neutralizes alkaline detergent residue and softens fabric slightly, so it is a reasonable softener replacement. It is not a disinfectant at laundry concentrations and will not fix a contaminated machine. Never combine it with chlorine bleach.',
    },
    {
      question: 'How hot does the water need to be?',
      answer:
        'For a maintenance cycle on the machine, use the hottest setting available — oxygen bleach does most of its work around 140°F / 60°C. For clothes, follow the care label. You do not need every load hot; one hot load a month is enough to keep the population down.',
    },
    {
      question: 'My clothes smell fine but the machine still smells. Is that a problem?',
      answer:
        'It will become one. A smelling drum eventually transfers to laundry, usually first to towels and thick cotton. Treat it now with a hot empty cycle and a gasket wipe rather than waiting for clothes to be affected.',
    },
    {
      question: 'Can a dryer alone fix the smell?',
      answer:
        'A dryer prevents recurrence very effectively because it removes the damp window, but it does not remove odor already embedded in fibers or hiding in the machine. Fix the source first, then use the dryer to keep things fresh.',
    },
  ],
  sources: [
    {
      label:
        'Check your washing machine manual for the recommended cleaning cycle and any restrictions on bleach, and follow the dosing instructions on your detergent label.',
    },
  ],
  searchTerms: [
    'laundry smells bad after wash',
    'washer smells like mildew',
    'clean washing machine smell',
    'too much detergent smell',
    'clothes smell sour when damp',
  ],
};
