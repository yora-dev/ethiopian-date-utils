import { describe, it, expect } from 'vitest';
import { getHolidays } from '../src/holidays/holidayEngine.js';

describe('Bahire Hasab Holiday Calculation', () => {
  it('calculates fixed national and movable religious holidays for Ethiopian year 2018', () => {
    const holidays = getHolidays(2018);

    const enkutatash = holidays.find((h) => h.month === 1 && h.day === 1);
    expect(enkutatash).toBeDefined();

    const tinsaye = holidays.find((h) => h.isMovable && (h.name as Record<string, string>).en.includes('Easter'));
    expect(tinsaye).toBeDefined();
  });
});