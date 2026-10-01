import type { Locale } from '@/lib/i18n/config';

/**
 * 생활백과 카테고리.
 * URL: /[locale]/life/[slug]
 *
 * 도구 카테고리(@/lib/tools/categories)와는 별개 축이다.
 * 도구는 '얼마지?', 생활백과는 '어떻게 하지?'를 담당한다.
 */
export const lifeCategoryIds = [
  'stains',
  'laundry',
  'cleaning',
  'odor',
  'kitchen',
  'storage',
  'home-care',
] as const;

export type LifeCategoryId = (typeof lifeCategoryIds)[number];

export interface LifeCategoryDefinition {
  id: LifeCategoryId;
  /** URL 세그먼트 */
  slug: string;
  emoji: string;
  order: number;
  label: Record<Locale, string>;
  /** 카테고리 허브 리드 문장 (검색 스니펫으로도 쓰인다) */
  description: Record<Locale, string>;
  /**
   * 허브 본문 도입 문단. 목록만 있는 허브는 검색엔진이 얇은 페이지로 본다.
   * 이 분류에서 무엇을 먼저 봐야 하는지·흔한 실수·판단 기준을 적는다.
   * 실제로 존재하는 문서만 언급한다.
   */
  intro: Record<Locale, readonly string[]>;
}

export const lifeCategories: Record<LifeCategoryId, LifeCategoryDefinition> = {
  stains: {
    id: 'stains',
    slug: 'stains',
    emoji: '🧺',
    order: 1,
    label: { ko: '얼룩 제거', en: 'Stain removal', ja: 'シミ抜き' },
    description: {
      ko: '김치국물, 기름, 커피, 볼펜처럼 옷에 묻은 얼룩을 종류별로 지우는 방법입니다. 묻은 직후와 이미 마른 뒤의 대처가 다릅니다.',
      en: 'How to remove common clothing stains by type, both when fresh and after they have dried.',
      ja: '衣類についたシミを種類別に落とす方法です。付いた直後と乾いた後で対処が変わります。',
    },
    intro: {
      ko: [
        '얼룩은 종류부터 판단해야 합니다. 크게 기름(식용유·화장품), 색소(김치국물·커피·와인), 단백질(피·우유·계란), 잉크 네 갈래이고 지우는 방법이 서로 정반대입니다. 단백질 얼룩에 뜨거운 물을 쓰면 굳어서 영구 고착되고, 기름 얼룩에 찬물만 쓰면 번지기만 합니다.',
        '가장 흔한 실수는 문지르는 것입니다. 문지르면 얼룩이 섬유 사이로 밀려 들어가고 표면이 일어나 색이 빠진 뒤에도 자국이 남습니다. 원칙은 바깥에서 안쪽으로, 두드려서 흡수시키는 것입니다.',
        '이미 말랐다면 되살리는 단계가 먼저입니다. 젖은 천을 20~30분 덮어 굳은 얼룩을 불린 뒤 처리하면 대부분 빠집니다. 그리고 얼룩이 남은 옷은 절대 건조기에 넣지 마세요. 열이 얼룩을 고착시켜 되돌릴 수 없게 만듭니다.',
      ],
      en: [
        'Identify the stain type first. Oil, pigment, protein and ink each need the opposite treatment — hot water sets protein stains permanently, while cold water alone spreads oil.',
        'Do not rub. Rubbing pushes the stain deeper and roughens the surface, leaving a visible mark even after the colour is gone. Blot from the outside inward instead.',
        'Never put a stained garment in the dryer. Heat sets whatever is left and makes it permanent.',
      ],
      ja: [
        'まずシミの種類を見分けます。油・色素・タンパク質・インクで対処法が正反対です。タンパク質汚れに熱いお湯を使うと固着して落ちなくなります。',
        'こすらないでください。こするとシミが繊維の奥に入り、表面が毛羽立って色が落ちた後も跡が残ります。外側から内側へ叩いて吸わせます。',
        'シミが残った衣類を乾燥機に入れないでください。熱で固着して元に戻せなくなります。',
      ],
    },
  },
  laundry: {
    id: 'laundry',
    slug: 'laundry',
    emoji: '👕',
    order: 2,
    label: { ko: '세탁', en: 'Laundry', ja: '洗濯' },
    description: {
      ko: '수건 쉰내, 운동화, 패딩처럼 소재와 상황에 따라 달라지는 세탁 방법을 정리했습니다.',
      en: 'Washing methods that change with fabric and situation — towels, sneakers, padded jackets.',
      ja: '素材や状況で変わる洗濯方法をまとめました。',
    },
    intro: {
      ko: [
        '세탁 문제의 원인은 대부분 세제나 코스가 아니라 세 가지입니다. 세탁기 자체가 더럽거나, 세제를 너무 많이 넣었거나, 건조가 느린 것입니다. 수건에서 쉰내가 나고 옷이 눅눅하다면 이 셋 중 하나를 먼저 의심하세요.',
        '세제는 많이 넣을수록 잘 빨리지 않습니다. 남은 세제가 섬유에 쌓여 냄새와 뻣뻣함의 원인이 되고, 오히려 헹굼이 덜 됩니다. 물이 연수인 지역에서는 표시량의 절반으로도 충분한 경우가 많습니다.',
        '소재에 따라 판단이 갈립니다. 니트와 패딩은 탈수·건조가 핵심이고, 흰옷은 분리와 세탁 주기가 핵심입니다. 드럼과 통돌이도 세제량과 코스 선택이 다릅니다. 상황에 맞는 글을 골라 보세요.',
      ],
      en: [
        'Most laundry problems come from one of three things: a dirty machine, too much detergent, or clothes drying too slowly — not from the wrong product.',
        'More detergent does not mean cleaner clothes. Residue builds up in the fibres and causes both smell and stiffness.',
        'Fabric decides the method. Knits and padded jackets hinge on spin and drying; whites hinge on sorting and wash frequency.',
      ],
      ja: [
        '洗濯の問題は洗剤やコースではなく、洗濯機の汚れ・洗剤の入れすぎ・乾燥の遅さのいずれかが原因であることがほとんどです。',
        '洗剤は多いほどきれいになるわけではありません。残った洗剤が繊維に蓄積し、ニオイとごわつきの原因になります。',
        '素材によって判断が変わります。ニットやダウンは脱水と乾燥、白物は分別と洗濯頻度が鍵です。',
      ],
    },
  },
  cleaning: {
    id: 'cleaning',
    slug: 'cleaning',
    emoji: '🧽',
    order: 3,
    label: { ko: '청소', en: 'Cleaning', ja: '掃除' },
    description: {
      ko: '세탁기, 에어프라이어, 가스레인지처럼 주기적으로 관리해야 하는 곳을 안전하게 청소하는 방법입니다.',
      en: 'Safe cleaning routines for appliances and spots that need regular care.',
      ja: '定期的な手入れが必要な場所を安全に掃除する方法です。',
    },
    intro: {
      ko: [
        '가전 청소는 순서가 정해져 있습니다. 대부분 전원을 끄고 분리 → 불리기 → 닦기 → 완전 건조입니다. 불리는 단계를 건너뛰고 힘으로 문지르면 코팅과 표면이 상합니다.',
        '가장 중요한 주의사항 하나만 기억하세요. 염소계 표백제(락스)와 산성 세정제(식초·구연산·물때 제거제)를 절대 같이 쓰면 안 됩니다. 섞이면 염소 가스가 발생해 위험합니다. 하나를 쓴 뒤 충분히 헹구고 시간을 두고 다른 하나를 쓰세요.',
        '물때·석회 자국은 산성(구연산·식초), 기름때는 알칼리성(베이킹소다·과탄산)으로 갈라집니다. 세제를 바꿔도 안 지워진다면 성질을 잘못 고른 경우가 많습니다.',
      ],
      en: [
        'Appliance cleaning follows a fixed order: unplug and disassemble, soak, wipe, then dry completely. Skipping the soak and scrubbing harder damages coatings.',
        'Never mix chlorine bleach with an acidic cleaner such as vinegar or citric acid — the combination releases toxic chlorine gas.',
        'Limescale needs an acid; grease needs an alkali. If a cleaner is not working, the chemistry is usually the reason.',
      ],
      ja: [
        '家電の掃除は順番が決まっています。電源を切って分解し、つけ置きしてから拭き、完全に乾かします。',
        '塩素系漂白剤と酸性洗剤（酢・クエン酸）を混ぜないでください。有毒な塩素ガスが発生します。',
        '水垢は酸性、油汚れはアルカリ性で落とします。落ちないときは洗剤の性質選びを間違えていることが多いです。',
      ],
    },
  },
  odor: {
    id: 'odor',
    slug: 'odor',
    emoji: '💨',
    order: 4,
    label: { ko: '냄새 제거', en: 'Odor removal', ja: 'ニオイ対策' },
    description: {
      ko: '냄새는 덮는 것이 아니라 원인을 없애야 사라집니다. 하수구, 세탁기, 신발 냄새의 실제 원인과 해결법입니다.',
      en: 'Odors go away when the source is removed, not masked. Causes and fixes for common household smells.',
      ja: 'ニオイは隠すのではなく原因を断つと消えます。原因別の対処法です。',
    },
    intro: {
      ko: [
        '냄새는 향으로 덮으면 잠깐 가려질 뿐 하루면 돌아옵니다. 생활 냄새의 원인은 거의 전부 세균이 번식할 수 있는 물기와 유기물입니다. 그 둘 중 하나를 없애야 사라집니다.',
        '냄새가 나는 자리를 먼저 찾으세요. 세탁기는 고무패킹과 세제함, 하수구는 트랩, 냉장고는 채소칸과 고무패킹, 신발은 깔창이 대부분의 원인입니다. 눈에 보이는 곳만 닦으면 며칠 뒤 다시 납니다.',
        '없앤 뒤에는 마르게 두는 것이 유일한 예방책입니다. 세탁기 문을 열어두고, 신발을 하루 쉬게 하고, 젖은 수건을 개어두지 않는 것만으로 재발이 크게 줄어듭니다.',
      ],
      en: [
        'Masking an odour with fragrance hides it for a few hours at most. Household smells come from moisture plus organic matter, and removing one of the two is what actually works.',
        'Find the source first — the washer gasket and detergent drawer, the drain trap, the fridge crisper, the shoe insole. Wiping only what is visible brings the smell back within days.',
        'After cleaning, drying is the only real prevention: leave the washer door open, rest shoes a day, do not fold damp towels.',
      ],
      ja: [
        '香りで隠しても数時間で戻ります。生活のニオイは水気と有機物が原因で、どちらかを断つと消えます。',
        'まず発生源を探します。洗濯機のゴムパッキンと洗剤投入口、排水トラップ、冷蔵庫の野菜室、靴の中敷きが大半です。',
        '取り除いた後は乾かすことが唯一の予防です。洗濯機の扉を開け、靴を一日休ませるだけで再発が減ります。',
      ],
    },
  },
  kitchen: {
    id: 'kitchen',
    slug: 'kitchen',
    emoji: '🍳',
    order: 5,
    label: { ko: '주방 관리', en: 'Kitchen care', ja: 'キッチンの手入れ' },
    description: {
      ko: '탄 냄비, 프라이팬 기름때, 스테인리스 얼룩처럼 주방에서 자주 생기는 문제를 소재를 상하지 않게 해결합니다.',
      en: 'Fixing burnt pots, greasy pans and stainless marks without damaging the surface.',
      ja: '焦げた鍋や油汚れを、素材を傷めずに落とす方法です。',
    },
    intro: {
      ko: [
        '주방 문제는 소재를 먼저 확인해야 합니다. 코팅 프라이팬, 스테인리스, 무쇠는 쓰면 안 되는 도구가 서로 다릅니다. 코팅팬에 쇠수세미를 쓰면 코팅이 벗겨져 팬 수명이 끝나고, 무쇠에 세제를 쓰면 길들인 기름막이 사라집니다.',
        '탄 자국과 기름때는 힘이 아니라 시간으로 지웁니다. 물이나 베이킹소다 용액을 넣고 끓이거나 불려두면 대부분 저절로 떨어집니다. 처음부터 긁으면 표면에 흠집이 생기고 다음부터 더 잘 눌어붙습니다.',
        '스테인리스의 무지개 얼룩과 흰 자국은 때가 아니라 열에 의한 산화막과 물속 미네랄입니다. 세제로는 안 지워지고 산성(식초·구연산)으로 지웁니다.',
      ],
      en: [
        'Check the material first. Coated pans, stainless steel and cast iron each rule out different tools — steel wool ends a non-stick pan, and detergent strips a cast iron seasoning.',
        'Burnt-on residue comes off with time, not force. Simmer water or a baking-soda solution and most of it lifts by itself.',
        'Rainbow tint and white spots on stainless are oxide film and water minerals, not dirt. An acid removes them; detergent will not.',
      ],
      ja: [
        'まず素材を確認します。コーティングのフライパン・ステンレス・鉄はそれぞれ使ってはいけない道具が違います。',
        '焦げは力ではなく時間で落とします。水や重曹液を入れて煮ると大半は自然に剥がれます。',
        'ステンレスの虹色や白い跡は汚れではなく酸化膜と水のミネラルです。酸性で落とします。',
      ],
    },
  },
  storage: {
    id: 'storage',
    slug: 'storage',
    emoji: '📦',
    order: 6,
    label: { ko: '보관', en: 'Storage', ja: '収納・保管' },
    description: {
      ko: '계절옷과 이불을 다음 시즌에 냄새·곰팡이 없이 꺼내 쓰기 위한 보관 방법입니다.',
      en: 'Storing seasonal clothes and bedding so they come out fresh next season.',
      ja: '季節物を次のシーズンに気持ちよく使うための保管方法です。',
    },
    intro: {
      ko: [
        '보관에서 실패하는 이유는 거의 하나입니다. 완전히 마르지 않은 상태로 넣는 것입니다. 세탁 직후 만졌을 때 살짝 서늘하면 아직 수분이 남아 있는 것이고, 그대로 밀봉하면 몇 달 뒤 냄새와 곰팡이로 돌아옵니다.',
        '눈에 안 보이는 얼룩도 반드시 빼고 넣어야 합니다. 땀과 음식물은 보관 중에 산화되면서 누렇게 변해, 넣을 때 깨끗해 보였던 옷이 다음 시즌에 노랗게 나옵니다.',
        '압축팩은 부피를 줄이지만 소재를 가립니다. 패딩과 울처럼 부피로 보온하는 소재는 압축하면 복원이 안 될 수 있습니다. 방충제는 옷에 직접 닿지 않게 위쪽에 두세요.',
        '계절옷은 세탁과 얼룩 확인·소재별 접기부터 살펴보고, 이불은 충전재가 완전히 마른 상태인지와 보관 공간의 통풍을 먼저 확인하세요. 아래 두 글을 보관할 물건에 맞춰 선택할 수 있습니다.',
      ],
      en: [
        'Almost every storage failure starts the same way: putting something away before it is fully dry. If it feels slightly cool to the touch, moisture is still there.',
        'Remove invisible stains too. Sweat and food oxidise in storage and turn yellow, so a garment that looked clean comes out marked next season.',
        'Vacuum bags save space but not every fabric. Down and wool insulate by loft and may not recover after compression.',
        'For seasonal clothes, start with stains and the fabric care label. For bedding, check that the filling is dry and the storage space stays ventilated. Choose the guide below for the item you are putting away.',
      ],
      ja: [
        '保管の失敗はほぼ「完全に乾く前にしまうこと」から始まります。触ってひんやりするならまだ水分が残っています。',
        '見えないシミも落としてからしまいます。汗や食品は保管中に酸化して黄ばみます。',
        '圧縮袋は素材を選びます。ダウンやウールは圧縮すると元に戻らないことがあります。',
        '季節の衣類はシミと素材表示を、寝具は中まで乾いているかと保管場所の通気を先に確認します。下の二つの記事から、しまう物に合う手順を選んでください。',
      ],
    },
  },
  'home-care': {
    id: 'home-care',
    slug: 'home-care',
    emoji: '🏠',
    order: 7,
    label: { ko: '집 관리', en: 'Home care', ja: '住まいの管理' },
    description: {
      ko: '욕실 곰팡이, 결로, 습기처럼 집 자체를 관리하는 방법입니다. 생기기 전에 막는 쪽이 훨씬 쉽습니다.',
      en: 'Dealing with mold, condensation and damp — prevention is far easier than removal.',
      ja: 'カビや結露など住まい自体の管理方法です。',
    },
    intro: {
      ko: [
        '집 문제는 거의 전부 습도 하나로 설명됩니다. 곰팡이는 실내 습도가 60%를 넘고 표면이 차가울 때 생기고, 결로는 따뜻하고 습한 공기가 차가운 면에 닿을 때 생깁니다. 곰팡이를 지우는 것보다 습도를 40~50%로 유지하는 쪽이 훨씬 쉽습니다.',
        '해결 방향은 두 가지뿐입니다. 표면을 차갑지 않게 하거나(단열), 공기를 습하지 않게 하거나(환기·제습)입니다. 한쪽만 해서는 효과가 제한적이고, 여름과 겨울에 해야 할 일이 서로 반대입니다.',
        '이미 생긴 곰팡이는 표면만 닦으면 뿌리가 남아 다시 올라옵니다. 그리고 곰팡이 제거제(염소계)와 산성 세정제를 같이 쓰면 안 됩니다. 실리콘 틈새처럼 뿌리가 박힌 곳은 교체가 답일 때가 많습니다.',
      ],
      en: [
        'Nearly every home problem here comes down to humidity. Mould needs indoor humidity above 60% and a cold surface; condensation needs warm damp air meeting cold glass or wall.',
        'There are only two levers: stop the surface being cold (insulation), or stop the air being damp (ventilation and dehumidifying). What you do in summer is the opposite of winter.',
        'Wiping mould off the surface leaves the roots behind. Where it has grown into silicone sealant, replacement is usually the real fix.',
      ],
      ja: [
        '住まいの問題はほぼ湿度で説明できます。カビは湿度60%超と冷たい面、結露は暖かく湿った空気が冷たい面に触れると生じます。',
        '対策は「面を冷たくしない（断熱）」か「空気を湿らせない（換気・除湿）」の二つだけです。夏と冬でやることが正反対です。',
        '表面を拭くだけでは根が残って再発します。シリコン目地に根を張った場合は交換が確実です。',
      ],
    },
  },
};

export const orderedLifeCategories: LifeCategoryDefinition[] = Object.values(lifeCategories).sort(
  (a, b) => a.order - b.order,
);

export function getLifeCategory(id: LifeCategoryId): LifeCategoryDefinition {
  return lifeCategories[id];
}

export function findLifeCategoryBySlug(slug: string): LifeCategoryDefinition | undefined {
  return orderedLifeCategories.find((category) => category.slug === slug);
}

/** 생활백과 루트 경로 (로케일 접두사 제외) */
export const LIFE_BASE_PATH = '/life';

export function lifeCategoryPath(category: LifeCategoryDefinition): string {
  return `${LIFE_BASE_PATH}/${category.slug}`;
}

export function lifeArticlePath(categorySlug: string, articleSlug: string): string {
  return `${LIFE_BASE_PATH}/${categorySlug}/${articleSlug}`;
}
