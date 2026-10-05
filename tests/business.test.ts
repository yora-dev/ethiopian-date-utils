import { describe, it, expect } from 'vitest';
import { ethiopian } from '../src/date/EthiopianDate.js';
import { createBusinessCalendar } from '../src/business/businessCalendar.js';

describe('Business Days Engine', () => {
  it('skips weekends correctly when adding business days', () => {
    const cal = createBusinessCalendar({ workingDays: [1, 2, 3, 4, 5] });
    // 15 Meskerem 2018 = Thursday (weekday = 4)
    const date = ethiopian(2018, 1, 15);
    const nextBiz = cal.addBusinessDays(date, 2);

    // Thursday + 1 biz = Friday, + 2 biz = Monday (19 Meskerem 2018)
    expect(nextBiz.day).toBe(19);
  });
});