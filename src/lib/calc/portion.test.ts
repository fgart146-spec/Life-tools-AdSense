import { describe, expect, it } from 'vitest';
import { adjustedPersons, findPeopleIssues, personEquivalent, toKilograms } from './portion';

describe('personEquivalent', () => {
  it('어린이는 0.5명분으로 환산한다', () => {
    expect(personEquivalent({ adults: 2, children: 2, appetite: 'normal' })).toBe(3);
  });

  it('비어 있는 값은 0으로 본다', () => {
    expect(personEquivalent({ adults: null, children: 3, appetite: 'normal' })).toBe(1.5);
  });

  it('음수는 0으로 본다', () => {
    expect(personEquivalent({ adults: -2, children: 2, appetite: 'normal' })).toBe(1);
  });
});

describe('adjustedPersons', () => {
  it('식사량 계수를 반영한다', () => {
    expect(adjustedPersons({ adults: 4, children: 0, appetite: 'normal' })).toBe(4);
    expect(adjustedPersons({ adults: 4, children: 0, appetite: 'heavy' })).toBe(5);
    expect(adjustedPersons({ adults: 4, children: 0, appetite: 'light' })).toBeCloseTo(3.2);
  });
});

describe('findPeopleIssues', () => {
  it('음수 인원과 과도한 인원을 잡아낸다', () => {
    expect(findPeopleIssues({ adults: -1, children: 0, appetite: 'normal' })).toContain('people');
    expect(findPeopleIssues({ adults: 200, children: 0, appetite: 'normal' })).toContain('people');
    expect(findPeopleIssues({ adults: 4, children: 2, appetite: 'normal' })).toEqual([]);
  });
});

describe('toKilograms', () => {
  it('g을 kg으로 바꾼다', () => {
    expect(toKilograms(1500)).toBe(1.5);
  });
});
