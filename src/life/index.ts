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
];
