import type { ToolContent } from '@/lib/tools/types';
import type { AreaConverterCopy } from './copy';

export const contentEn: ToolContent<AreaConverterCopy> = {
  title: 'Floor area converter',
  seoTitle: 'Floor area converter — square metres, square feet and pyeong',
  seoDescription:
    'Convert between square metres, square feet and pyeong, the unit used in Korean and Japanese property listings.',
  lead: 'Convert a floor area between square metres, square feet and pyeong — useful when property listings use a unit you do not think in.',
  summary: 'Convert floor area between m², sq ft and pyeong.',
  keywords: {
    primaryKeyword: 'floor area converter',
    secondaryKeywords: [
      'square metres to square feet',
      'pyeong to square meters',
      'apartment size converter',
      'sqm to sqft calculator',
      'what is a pyeong',
    ],
    searchIntent:
      'Convert a property floor area between square metres, square feet and pyeong.',
  },
  howItWorks: [
    'One pyeong is exactly 400/121 m², about 3.305785 m².',
    'Square feet convert at 1 sq ft = 0.09290304 m².',
    'Entering a usable-area ratio applies it to the figure, mirroring how listings quote gross versus usable floor area.',
    'The side length of an equivalent square is shown as well, which makes an unfamiliar number easier to picture.',
  ],
  formula: [
    { label: 'Pyeong to m²', expression: 'm² = pyeong x 3.305785' },
    { label: 'm² to pyeong', expression: 'pyeong = m² / 3.305785' },
    { label: 'Usable area', expression: 'usable = gross area x usable ratio' },
  ],
  example: {
    scenario: 'A Korean listing advertises a 34 pyeong apartment with 84 m² of usable space.',
    steps: [
      '34 pyeong x 3.305785 = about 112 m² gross',
      '84 / 3.305785 = about 25.4 pyeong usable',
      'Usable ratio: 84 / 112 = 75%',
    ],
    conclusion:
      'The headline "34 pyeong" is the gross area; the space inside the front door is 84 m², or about 25.4 pyeong. Always check which figure a listing quotes.',
  },
  notes: [
    'Korean listings usually advertise gross area (usable plus shared corridors and stairs); contracts state the usable area.',
    'Japanese listings use tsubo, which is the same size as a pyeong.',
    'Pyeong is not an official metric unit — legal documents use square metres.',
    'Compare properties on usable area, not the headline figure.',
  ],
  faq: [
    {
      question: 'How big is one pyeong?',
      answer:
        'About 3.31 m², or roughly 35.6 sq ft. It comes from a square of six Korean feet on each side, and the exact value is 400/121 m².',
    },
    {
      question: 'Why do listings show two different sizes?',
      answer:
        'One is gross area including shared space such as corridors and stairwells; the other is the usable area inside your own front door. The ratio between them is typically 70-80% for apartments.',
    },
    {
      question: 'Is tsubo the same as pyeong?',
      answer:
        'Yes. Japan uses tsubo and Korea uses pyeong for the same unit, about 3.31 m².',
    },
    {
      question: 'How do I picture a size quickly?',
      answer:
        'Look at the equivalent square side length. 100 m² is a 10 m by 10 m square, which is easier to imagine than the number alone.',
    },
  ],
  relatedGuides: [],
  ui: {
    valueLabel: 'Area',
    valueHint: 'The figure you want to convert.',
    valuePlaceholder: 'e.g. 84',
    unitLabel: 'Input unit',
    unitPyeong: 'pyeong',
    unitSqm: 'm²',
    unitSqft: 'sq ft',
    ratioLabel: 'Usable ratio (optional)',
    ratioHint: 'Applies the ratio to give usable area.',
    sqmLabel: 'Square metres',
    pyeongLabel: 'Pyeong',
    sqftLabel: 'Square feet',
    squareSideLabel: 'Equivalent square side',
    exclusiveLabel: 'Usable area',
    noteMain: '%{sqm} m² is about %{pyeong} pyeong.',
    noteSqft: 'That is about %{sqft} sq ft.',
    noteSide: 'As a square, each side would be about %{side} m.',
    noteExclusive: 'With the ratio applied, the usable area is about %{exclusive} m².',
    noteBasis: 'Based on 1 pyeong = 400/121 m² ≈ 3.305785 m².',
    issueValue: 'Area cannot be negative.',
    issueRatio: 'Enter a ratio between 0 and 100.',
  },
};
