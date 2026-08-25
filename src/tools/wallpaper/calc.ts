import { PYEONG_TO_SQM } from '@/lib/calc/area';

/**
 * 벽지·장판 필요량 계산.
 *
 * 기준 (국내 유통 규격 기준, 업체마다 차이가 있을 수 있다)
 * - 광폭합지·실크벽지 1롤: 폭 1.06m × 길이 15.6m ≈ 16.5㎡
 * - 소폭합지 1롤: 폭 0.53m × 길이 12.5m ≈ 6.6㎡
 * - 장판 폭: 1.8m
 * - 재단 손실(로스): 10%
 */
export type WallpaperType = 'wide' | 'narrow';

export const ROLL_COVERAGE: Record<WallpaperType, number> = {
  wide: 1.06 * 15.6,
  narrow: 0.53 * 12.5,
};

export const LOSS_RATIO = 0.1;
export const FLOORING_WIDTH_M = 1.8;
/** 문 1개 면적 (m²) */
export const DOOR_AREA = 1.8;
/** 창문 1개 면적 (m²) */
export const WINDOW_AREA = 1.5;

export interface WallpaperInput {
  /** 방 가로 (m) */
  widthM: number | null;
  /** 방 세로 (m) */
  lengthM: number | null;
  /** 천장 높이 (m) */
  heightM: number | null;
  doors: number | null;
  windows: number | null;
  type: WallpaperType;
  /** 천장도 도배 */
  includeCeiling: boolean;
  /** 벽지 1롤 가격 (선택) */
  pricePerRoll: number | null;
  /** 장판 1m당 가격 (선택) */
  flooringPricePerM: number | null;
}

export interface WallpaperResult {
  /** 순수 벽 면적 (개구부 제외) */
  wallArea: number;
  /** 천장 면적 (선택 시) */
  ceilingArea: number;
  /** 도배 총 면적 */
  totalArea: number;
  /** 로스 포함 소요 면적 */
  areaWithLoss: number;
  /** 필요한 롤 수 (올림) */
  rolls: number;
  /** 바닥 면적 */
  floorArea: number;
  /** 바닥 면적 (평) */
  floorPyeong: number;
  /** 장판 필요 길이 (m, 로스 포함) */
  flooringLength: number;
  /** 벽지 예상 비용 */
  wallpaperCost: number | null;
  /** 장판 예상 비용 */
  flooringCost: number | null;
}

export type WallpaperIssue = 'size' | 'height' | 'openings' | 'price';

export function findIssues(input: WallpaperInput): WallpaperIssue[] {
  const issues: WallpaperIssue[] = [];
  if (
    (input.widthM !== null && (input.widthM <= 0 || input.widthM > 50)) ||
    (input.lengthM !== null && (input.lengthM <= 0 || input.lengthM > 50))
  ) {
    issues.push('size');
  }
  if (input.heightM !== null && (input.heightM <= 0 || input.heightM > 10)) issues.push('height');
  if (
    (input.doors !== null && (input.doors < 0 || input.doors > 20)) ||
    (input.windows !== null && (input.windows < 0 || input.windows > 20))
  ) {
    issues.push('openings');
  }
  if (
    (input.pricePerRoll !== null && input.pricePerRoll < 0) ||
    (input.flooringPricePerM !== null && input.flooringPricePerM < 0)
  ) {
    issues.push('price');
  }
  return issues;
}

export function calcWallpaper(input: WallpaperInput): WallpaperResult | null {
  if (input.widthM === null || input.lengthM === null) return null;
  if (input.widthM <= 0 || input.lengthM <= 0) return null;

  const height = input.heightM !== null && input.heightM > 0 ? input.heightM : 2.3;
  const doors = input.doors !== null && input.doors > 0 ? input.doors : 0;
  const windows = input.windows !== null && input.windows > 0 ? input.windows : 0;

  const perimeter = 2 * (input.widthM + input.lengthM);
  const grossWall = perimeter * height;
  const openings = doors * DOOR_AREA + windows * WINDOW_AREA;
  const wallArea = Math.max(0, grossWall - openings);

  const floorArea = input.widthM * input.lengthM;
  const ceilingArea = input.includeCeiling ? floorArea : 0;
  const totalArea = wallArea + ceilingArea;
  const areaWithLoss = totalArea * (1 + LOSS_RATIO);
  const rolls = Math.ceil(areaWithLoss / ROLL_COVERAGE[input.type]);

  const flooringLength = (floorArea / FLOORING_WIDTH_M) * (1 + LOSS_RATIO);

  return {
    wallArea,
    ceilingArea,
    totalArea,
    areaWithLoss,
    rolls,
    floorArea,
    floorPyeong: floorArea / PYEONG_TO_SQM,
    flooringLength,
    wallpaperCost:
      input.pricePerRoll !== null && input.pricePerRoll > 0 ? rolls * input.pricePerRoll : null,
    flooringCost:
      input.flooringPricePerM !== null && input.flooringPricePerM > 0
        ? flooringLength * input.flooringPricePerM
        : null,
  };
}
