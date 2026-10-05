import { describe, it, expect } from 'vitest';
import { ethiopianToGregorian, gregorianToEthiopian, isEthiopianLeapYear } from '../src/core/algorithms.js';

describe('Ethiopian ↔ Gregorian Conversion Mechanics', () => {
  it('converts 1 Meskerem 2018 ETH to 11 September 2025 Gregorian', () => {
    const greg = ethiopianToGregorian(2018, 1, 1);
    expect(greg).toEqual({ year: 2025, month: 9, day: 11 });

    const eth = gregorianToEthiopian(2025, 9, 11);
    expect(eth).toEqual({ year: 2018, month: 1, day: 1 });
  });

  it('handles Ethiopian Leap Year (2015 Pagume 6 = Sept 11, 2023)', () => {
    expect(isEthiopianLeapYear(2015)).toBe(true);
    const greg = ethiopianToGregorian(2015, 13, 6);
    expect(greg).toEqual({ year: 2023, month: 9, day: 11 });

    const eth = gregorianToEthiopian(2023, 9, 11);
    expect(eth).toEqual({ year: 2015, month: 13, day: 6 });
  });

  it('converts 1 Meskerem 2016 ETH (following leap year) to 12 September 2023', () => {
    const greg = ethiopianToGregorian(2016, 1, 1);
    expect(greg).toEqual({ year: 2023, month: 9, day: 12 });
  });
});