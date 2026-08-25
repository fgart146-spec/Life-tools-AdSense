import type { LifeArticleModule } from '@/lib/life/types';
import { article as towelSmell } from '@/life/towel-smell';
import { article as kimchiStain } from '@/life/kimchi-stain';
import { article as whiteClothesYellowing } from '@/life/white-clothes-yellowing';
import { article as oilStainClothes } from '@/life/oil-stain-clothes';
import { article as washingMachineSmell } from '@/life/washing-machine-smell';
import { article as drumWasherCleaning } from '@/life/drum-washer-cleaning';
import { article as drainSmell } from '@/life/drain-smell';
import { article as bathroomMold } from '@/life/bathroom-mold';
import { article as burntPot } from '@/life/burnt-pot';
import { article as airfryerCleaning } from '@/life/airfryer-cleaning';
import { article as sneakerWashing } from '@/life/sneaker-washing';
import { article as seasonalClothesStorage } from '@/life/seasonal-clothes-storage';
import { article as gochujangStain } from '@/life/gochujang-stain';
import { article as coffeeStain } from '@/life/coffee-stain';
import { article as ballpenStain } from '@/life/ballpen-stain';
import { article as makeupStain } from '@/life/makeup-stain';
import { article as chocolateStain } from '@/life/chocolate-stain';
import { article as sweatStain } from '@/life/sweat-stain';
import { article as foodStainBasics } from '@/life/food-stain-basics';
import { article as laundrySmell } from '@/life/laundry-smell';
import { article as paddingWashing } from '@/life/padding-washing';
import { article as beddingWashing } from '@/life/bedding-washing';
import { article as knitWashing } from '@/life/knit-washing';
import { article as jeansWashing } from '@/life/jeans-washing';
import { article as blackClothesFading } from '@/life/black-clothes-fading';
import { article as whiteClothesCare } from '@/life/white-clothes-care';
import { article as indoorDrying } from '@/life/indoor-drying';
import { article as lintRemoval } from '@/life/lint-removal';
import { article as topLoaderCleaning } from '@/life/top-loader-cleaning';
import { article as fridgeCleaning } from '@/life/fridge-cleaning';
import { article as microwaveCleaning } from '@/life/microwave-cleaning';
import { article as gasStoveCleaning } from '@/life/gas-stove-cleaning';
import { article as rangeHoodCleaning } from '@/life/range-hood-cleaning';
import { article as windowFrameCleaning } from '@/life/window-frame-cleaning';
import { article as bathroomCleaning } from '@/life/bathroom-cleaning';
import { article as sinkCleaning } from '@/life/sink-cleaning';
import { article as humidifierCleaning } from '@/life/humidifier-cleaning';
import { article as fridgeSmell } from '@/life/fridge-smell';
import { article as shoeSmell } from '@/life/shoe-smell';
import { article as roomFoodSmell } from '@/life/room-food-smell';
import { article as panGrease } from '@/life/pan-grease';
import { article as stainlessStain } from '@/life/stainless-stain';
import { article as cuttingBoardSmell } from '@/life/cutting-board-smell';
import { article as kettleLimescale } from '@/life/kettle-limescale';
import { article as spongeCare } from '@/life/sponge-care';
import { article as windowFrameMold } from '@/life/window-frame-mold';
import { article as condensation } from '@/life/condensation';
import { article as humidityControl } from '@/life/humidity-control';
import { article as balconyMold } from '@/life/balcony-mold';
import { article as beddingStorage } from '@/life/bedding-storage';

/** 본문까지 포함한 생활백과 모듈 목록 (서버 전용). */
export const lifeArticleModules: readonly LifeArticleModule[] = [
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
];
