import { describe, it, expect } from 'vitest';
import { ethiopian } from '../src/date/EthiopianDate.js';

describe('EthiopianDate Immutable Arithmetic', () => {
  it('supports chainable day addition without mutating original instance', () => {
    const d1 = ethiopian(2018, 1, 15);
    const d2 = d1.addDays(20);

    expect(d1.day).toBe(15);
    expect(d2.month).toBe(2);
    expect(d2.day).toBe(5);
  });

  it('handles month overflow and startOf/endOf operations', () => {
    const date = ethiopian(2018, 1, 15);
    const start = date.startOf('month');
    const end = date.endOf('month');

    expect(start.day).toBe(1);
    expect(end.day).toBe(30);
  });

  it('clamps days when adding months into Pagume', () => {
    const date = ethiopian(2018, 12, 30);
    const nextMonth = date.addMonths(1); // Pagume 2018 (non-leap = 5 days)

    expect(nextMonth.month).toBe(13);
    expect(nextMonth.day).toBe(5);
  });
});