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
];
