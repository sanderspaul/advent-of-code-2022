import {
  findCommonCompartmentItem,
  getAllCommonItemTypes,
  getItemTypePriority,
  getRucksackCompartments,
  sumPriorityTypes
} from './solution-1';

describe('Comparing compartments', () => {
  it('should separate compartments contents into equal-length strings', () => {
    const ruckackStringMock = 'vJrwpWtwJgWrhcsFMMfFFhFp';
    const half1 = 'vJrwpWtwJgWr';
    const half2 = 'hcsFMMfFFhFp';
    const [compartment1, compartment2] =
      getRucksackCompartments(ruckackStringMock);
    expect(compartment1.length).toEqual(compartment2.length);
    expect(half1).toEqual(compartment1);
    expect(half2).toEqual(compartment2);
  });

  it('should return undefined when compartments share no common item', () => {
    expect(findCommonCompartmentItem('aaa', 'bbb')).toBe(undefined);
  });

  it('should return "c" when compartments share that common character', () => {
    expect(findCommonCompartmentItem('aca', 'bcb')).toBe('c');
  });
});

describe('Comparing item type priority', () => {
  it('should return priorities: 16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s)', () => {
    expect(getItemTypePriority('p')).toBe(16);
    expect(getItemTypePriority('L')).toBe(38);
    expect(getItemTypePriority('P')).toBe(42);
    expect(getItemTypePriority('v')).toBe(22);
    expect(getItemTypePriority('t')).toBe(20);
    expect(getItemTypePriority('s')).toBe(19);
  });

  it('should return ', () => {
    const rucksacksMock: string[] = [
      'vJrwpWtwJgWrhcsFMMfFFhFp',
      'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
      'PmmdzqPrVvPwwTWBwg',
      'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
      'ttgJtRGJQctTZtZT',
      'CrZsJsPPZsGzwwsLwLmpwMDw'
    ];
    expect(getAllCommonItemTypes(rucksacksMock)).toStrictEqual([
      'p',
      'L',
      'P',
      'v',
      't',
      's'
    ]);
  });

  it('should sum the priority types from a collection', () => {
    expect(sumPriorityTypes(['p', 'L', 'P', 'v', 't', 's'])).toBe(157);
  });
});
