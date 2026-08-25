import type { WallpaperType } from './calc';

/** 벽지·장판 필요량 계산기 UI 문자열 */
export interface WallpaperCopy {
  widthLabel: string;
  lengthLabel: string;
  sizeUnit: string;
  sizeHint: string;

  heightLabel: string;
  heightHint: string;

  doorsLabel: string;
  doorsUnit: string;
  doorsHint: string;
  windowsLabel: string;
  windowsHint: string;

  typeLabel: string;
  typeOptions: Record<WallpaperType, string>;
  typeHint: string;

  ceilingLabel: string;
  ceilingHint: string;

  priceRollLabel: string;
  priceRollHint: string;
  priceFlooringLabel: string;
  priceFlooringHint: string;

  rollsLabel: string;
  wallAreaLabel: string;
  ceilingAreaLabel: string;
  totalAreaLabel: string;
  floorAreaLabel: string;
  flooringLengthLabel: string;
  wallpaperCostLabel: string;
  flooringCostLabel: string;

  /** %{rolls} */
  noteRolls: string;
  /** %{area} */
  noteArea: string;
  /** %{length}, %{pyeong} */
  noteFlooring: string;
  /** %{cost} */
  noteCost: string;
  noteLoss: string;
  noteBasis: string;

  issueSize: string;
  issueHeight: string;
  issueOpenings: string;
  issuePrice: string;
}
