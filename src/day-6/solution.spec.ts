import { findPacketStart } from './solution-1';
import { findMessageStart } from './solution-2';
import { containsDuplicateChars } from './utils';

describe('detecting packet start markers', () => {
  it('should return true when the string contains duplicate chars', () => {
    expect(containsDuplicateChars('abbc')).toBe(true);
  });

  it('should return false when the string contains no duplicate chars', () => {
    expect(containsDuplicateChars('abcd')).toBe(false);
  });

  it('should return 7 for an input of "mjqjpqmgbljsphdztnvjfqwrcgsmlb"', () => {
    const input = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';
    expect(findPacketStart(input)).toBe(7);
  });
});

describe('detecting start of message markers', () => {
  it('should detect the start of message by the marker for each string', () => {
    expect(findMessageStart('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(19);
    expect(findMessageStart('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(23);
    expect(findMessageStart('nppdvjthqldpwncqszvftbrmjlhg')).toBe(23);
    expect(findMessageStart('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(29);
    expect(findMessageStart('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(26);
  });
});
