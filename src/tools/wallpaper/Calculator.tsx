'use client';

import { useMemo, useState } from 'react';
import { formatMoney, formatNumber, parseNumber } from '@/lib/format/number';
import { interpolate } from '@/lib/i18n/dictionary';
import type { CalculatorProps } from '@/lib/tools/define-tool';
import { CalculatorShell } from '@/components/tool/CalculatorShell';
import { CheckboxField, FieldRow, NumberField, SegmentedField } from '@/components/tool/fields';
import {
  ResultHeadline,
  ResultIssues,
  ResultNotes,
  ResultPanel,
  ResultRows,
} from '@/components/tool/ResultPanel';
import { calcWallpaper, findIssues, type WallpaperType } from './calc';
import type { WallpaperCopy } from './copy';

const TYPES: WallpaperType[] = ['wide', 'narrow'];

export function Calculator({ locale, copy, common }: CalculatorProps<WallpaperCopy>) {
  const [width, setWidth] = useState('3.5');
  const [length, setLength] = useState('4');
  const [height, setHeight] = useState('2.3');
  const [doors, setDoors] = useState('1');
  const [windows, setWindows] = useState('1');
  const [type, setType] = useState<WallpaperType>('wide');
  const [includeCeiling, setIncludeCeiling] = useState(false);
  const [priceRoll, setPriceRoll] = useState('');
  const [priceFlooring, setPriceFlooring] = useState('');

  const input = useMemo(
    () => ({
      widthM: parseNumber(width),
      lengthM: parseNumber(length),
      heightM: parseNumber(height),
      doors: parseNumber(doors),
      windows: parseNumber(windows),
      type,
      includeCeiling,
      pricePerRoll: parseNumber(priceRoll),
      flooringPricePerM: parseNumber(priceFlooring),
    }),
    [width, length, height, doors, windows, type, includeCeiling, priceRoll, priceFlooring],
  );

  const result = useMemo(() => calcWallpaper(input), [input]);
  const issueMessages = findIssues(input).map((issue) => {
    if (issue === 'size') return copy.issueSize;
    if (issue === 'height') return copy.issueHeight;
    if (issue === 'openings') return copy.issueOpenings;
    return copy.issuePrice;
  });

  const money = (value: number) => formatMoney(value, locale);
  const num = (value: number, max = 1) => formatNumber(value, locale, { max });

  const rows = result
    ? [
        { label: copy.wallAreaLabel, value: `${num(result.wallArea)} m²` },
        ...(result.ceilingArea > 0
          ? [{ label: copy.ceilingAreaLabel, value: `${num(result.ceilingArea)} m²` }]
          : []),
        { label: copy.totalAreaLabel, value: `${num(result.totalArea)} m²` },
        { label: copy.floorAreaLabel, value: `${num(result.floorArea)} m² (${num(result.floorPyeong)} 평)` },
        {
          label: copy.flooringLengthLabel,
          value: `${num(result.flooringLength)} m`,
          emphasis: true,
        },
        ...(result.wallpaperCost !== null
          ? [{ label: copy.wallpaperCostLabel, value: money(result.wallpaperCost) }]
          : []),
        ...(result.flooringCost !== null
          ? [{ label: copy.flooringCostLabel, value: money(result.flooringCost) }]
          : []),
      ]
    : [];

  const notes = result
    ? [
        interpolate(copy.noteRolls, { rolls: formatNumber(result.rolls, locale) }),
        interpolate(copy.noteArea, { area: num(result.totalArea) }),
        interpolate(copy.noteFlooring, {
          length: num(result.flooringLength),
          pyeong: num(result.floorPyeong),
        }),
        ...(result.wallpaperCost !== null
          ? [interpolate(copy.noteCost, { cost: money(result.wallpaperCost) })]
          : []),
        copy.noteLoss,
        copy.noteBasis,
      ]
    : [];

  return (
    <CalculatorShell
      inputTitle={common.inputTitle}
      resetLabel={common.reset}
      onReset={() => {
        setWidth('3.5');
        setLength('4');
        setHeight('2.3');
        setDoors('1');
        setWindows('1');
        setType('wide');
        setIncludeCeiling(false);
        setPriceRoll('');
        setPriceFlooring('');
      }}
      inputs={
        <>
          <FieldRow>
            <NumberField
              label={copy.widthLabel}
              value={width}
              onChange={setWidth}
              unit={copy.sizeUnit}
              hint={copy.sizeHint}
              allowDecimal
            />
            <NumberField
              label={copy.lengthLabel}
              value={length}
              onChange={setLength}
              unit={copy.sizeUnit}
              allowDecimal
            />
          </FieldRow>
          <NumberField
            label={copy.heightLabel}
            value={height}
            onChange={setHeight}
            unit={copy.sizeUnit}
            hint={copy.heightHint}
            allowDecimal
          />
          <FieldRow>
            <NumberField
              label={copy.doorsLabel}
              value={doors}
              onChange={setDoors}
              unit={copy.doorsUnit}
              hint={copy.doorsHint}
            />
            <NumberField
              label={copy.windowsLabel}
              value={windows}
              onChange={setWindows}
              unit={copy.doorsUnit}
              hint={copy.windowsHint}
            />
          </FieldRow>
          <SegmentedField
            label={copy.typeLabel}
            value={type}
            onChange={(value) => setType(value as WallpaperType)}
            options={TYPES.map((item) => ({ value: item, label: copy.typeOptions[item] }))}
            hint={copy.typeHint}
          />
          <CheckboxField
            label={copy.ceilingLabel}
            checked={includeCeiling}
            onChange={setIncludeCeiling}
            hint={copy.ceilingHint}
          />
          <FieldRow>
            <NumberField
              label={copy.priceRollLabel}
              value={priceRoll}
              onChange={setPriceRoll}
              unit="원"
              hint={copy.priceRollHint}
              grouped
            />
            <NumberField
              label={copy.priceFlooringLabel}
              value={priceFlooring}
              onChange={setPriceFlooring}
              unit="원"
              hint={copy.priceFlooringHint}
              grouped
            />
          </FieldRow>
        </>
      }
      results={
        <div className="grid gap-4">
          <ResultIssues title={common.issuesTitle} items={issueMessages} />
          <ResultPanel
            title={common.resultTitle}
            isEmpty={!result}
            placeholder={common.placeholder}
          >
            {result && (
              <>
                <ResultHeadline
                  label={copy.rollsLabel}
                  value={`${formatNumber(result.rolls, locale)} 롤`}
                  sub={`${num(result.totalArea)} m²`}
                  tone="positive"
                />
                <ResultRows rows={rows} />
                <ResultNotes items={notes} />
              </>
            )}
          </ResultPanel>
        </div>
      }
    />
  );
}
