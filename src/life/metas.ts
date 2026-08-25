import type { LifeArticleMeta } from '@/lib/life/types';
import { meta as towelSmell } from '@/life/towel-smell/meta';
import { meta as kimchiStain } from '@/life/kimchi-stain/meta';
import { meta as whiteClothesYellowing } from '@/life/white-clothes-yellowing/meta';
import { meta as oilStainClothes } from '@/life/oil-stain-clothes/meta';
import { meta as washingMachineSmell } from '@/life/washing-machine-smell/meta';
import { meta as drumWasherCleaning } from '@/life/drum-washer-cleaning/meta';
import { meta as drainSmell } from '@/life/drain-smell/meta';
import { meta as bathroomMold } from '@/life/bathroom-mold/meta';
import { meta as burntPot } from '@/life/burnt-pot/meta';
import { meta as airfryerCleaning } from '@/life/airfryer-cleaning/meta';
import { meta as sneakerWashing } from '@/life/sneaker-washing/meta';
import { meta as seasonalClothesStorage } from '@/life/seasonal-clothes-storage/meta';
import { meta as gochujangStain } from '@/life/gochujang-stain/meta';
import { meta as coffeeStain } from '@/life/coffee-stain/meta';
import { meta as ballpenStain } from '@/life/ballpen-stain/meta';
import { meta as makeupStain } from '@/life/makeup-stain/meta';
import { meta as chocolateStain } from '@/life/chocolate-stain/meta';
import { meta as sweatStain } from '@/life/sweat-stain/meta';
import { meta as foodStainBasics } from '@/life/food-stain-basics/meta';
import { meta as laundrySmell } from '@/life/laundry-smell/meta';
import { meta as paddingWashing } from '@/life/padding-washing/meta';
import { meta as beddingWashing } from '@/life/bedding-washing/meta';
import { meta as knitWashing } from '@/life/knit-washing/meta';
import { meta as jeansWashing } from '@/life/jeans-washing/meta';
import { meta as blackClothesFading } from '@/life/black-clothes-fading/meta';
import { meta as whiteClothesCare } from '@/life/white-clothes-care/meta';
import { meta as indoorDrying } from '@/life/indoor-drying/meta';
import { meta as lintRemoval } from '@/life/lint-removal/meta';
import { meta as topLoaderCleaning } from '@/life/top-loader-cleaning/meta';
import { meta as fridgeCleaning } from '@/life/fridge-cleaning/meta';
import { meta as microwaveCleaning } from '@/life/microwave-cleaning/meta';
import { meta as gasStoveCleaning } from '@/life/gas-stove-cleaning/meta';
import { meta as rangeHoodCleaning } from '@/life/range-hood-cleaning/meta';
import { meta as windowFrameCleaning } from '@/life/window-frame-cleaning/meta';
import { meta as bathroomCleaning } from '@/life/bathroom-cleaning/meta';
import { meta as sinkCleaning } from '@/life/sink-cleaning/meta';
import { meta as humidifierCleaning } from '@/life/humidifier-cleaning/meta';
import { meta as fridgeSmell } from '@/life/fridge-smell/meta';
import { meta as shoeSmell } from '@/life/shoe-smell/meta';
import { meta as roomFoodSmell } from '@/life/room-food-smell/meta';
import { meta as panGrease } from '@/life/pan-grease/meta';
import { meta as stainlessStain } from '@/life/stainless-stain/meta';
import { meta as cuttingBoardSmell } from '@/life/cutting-board-smell/meta';
import { meta as kettleLimescale } from '@/life/kettle-limescale/meta';
import { meta as spongeCare } from '@/life/sponge-care/meta';
import { meta as windowFrameMold } from '@/life/window-frame-mold/meta';
import { meta as condensation } from '@/life/condensation/meta';
import { meta as humidityControl } from '@/life/humidity-control/meta';
import { meta as balconyMold } from '@/life/balcony-mold/meta';
import { meta as beddingStorage } from '@/life/bedding-storage/meta';
import { meta as wineStain } from '@/life/wine-stain/meta';
import { meta as dishwasherCleaning } from '@/life/dishwasher-cleaning/meta';
import { meta as tatamiMold } from '@/life/tatami-mold/meta';
import { meta as airconCleaning } from '@/life/aircon-cleaning/meta';

/**
 * 생활백과 문서 메타데이터 목록 (가벼움 · 클라이언트 안전).
 * 본문 모듈은 index.ts 쪽에서만 로드한다.
 * 새 문서를 추가하면 이 파일과 index.ts 두 곳에 등록한다.
 */
export const lifeArticleMetas: readonly LifeArticleMeta[] = [
  towelSmell,
  kimchiStain,
  whiteClothesYellowing,
  oilStainClothes,
  washingMachineSmell,
  drumWasherCleaning,
  drainSmell,
  bathroomMold,
  burntPot,
  airfryerCleaning,
  sneakerWashing,
  seasonalClothesStorage,
  gochujangStain,
  coffeeStain,
  ballpenStain,
  makeupStain,
  chocolateStain,
  sweatStain,
  foodStainBasics,
  laundrySmell,
  paddingWashing,
  beddingWashing,
  knitWashing,
  jeansWashing,
  blackClothesFading,
  whiteClothesCare,
  indoorDrying,
  lintRemoval,
  topLoaderCleaning,
  fridgeCleaning,
  microwaveCleaning,
  gasStoveCleaning,
  rangeHoodCleaning,
  windowFrameCleaning,
  bathroomCleaning,
  sinkCleaning,
  humidifierCleaning,
  fridgeSmell,
  shoeSmell,
  roomFoodSmell,
  panGrease,
  stainlessStain,
  cuttingBoardSmell,
  kettleLimescale,
  spongeCare,
  windowFrameMold,
  condensation,
  humidityControl,
  balconyMold,
  beddingStorage,
  wineStain,
  dishwasherCleaning,
  tatamiMold,
  airconCleaning,
];
