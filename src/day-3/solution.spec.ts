import {
  createRucksack,
  findCommonItemType,
  getRucksackItemTypePriority,
  sumItemTypePriorities
} from './solution-1';

describe('Rucksacks and compartments', () => {
  it('should create a rucksack with two compartments of equal length', () => {
    const itemsMock = 'vJrwpWtwJgWrhcsFMMfFFhFp';
    const ruck = createRucksack(itemsMock);
    expect(ruck.compartments[0].length).toBe(itemsMock.length / 2);
    expect(ruck.compartments[0]).toBe('vJrwpWtwJgWr');
    expect(ruck.compartments[1].length).toBe(itemsMock.length / 2);
    expect(ruck.compartments[1]).toBe('hcsFMMfFFhFp');
    expect(ruck.items).toStrictEqual(itemsMock);
  });
  it('should compare two compartments and return the first common item type to both', () => {
    const itemsMock = 'vJrwpWtwJgWrhcsFMMfFFhFp';
    const ruck = createRucksack(itemsMock);
    expect(findCommonItemType(ruck.compartments)).toBe('p');
  });
});

describe('Priorities', () => {
  it('should return the priority of single item types', () => {
    expect(getRucksackItemTypePriority('p')).toBe(16);
    expect(getRucksackItemTypePriority('L')).toBe(38);
    expect(getRucksackItemTypePriority('P')).toBe(42);
    expect(getRucksackItemTypePriority('v')).toBe(22);
    expect(getRucksackItemTypePriority('t')).toBe(20);
    expect(getRucksackItemTypePriority('s')).toBe(19);
  });
  it('should sum the item types priority values', () => {
    expect(sumItemTypePriorities(['p', 'L', 'P', 'v', 't', 's'])).toBe(157);
  });
});
