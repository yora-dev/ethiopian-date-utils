import { describe, it, expect } from 'vitest';
import { ethiopian } from '../src/date/EthiopianDate.js';
import { formatEthiopianDate, formatDualDate } from '../src/formatting/formatter.js';
import { parseEthiopianDate } from '../src/parsing/parser.js';

describe('Formatting and Parsing Engine', () => {
  it('formats dates in Amharic locale with tokens', () => {
    const d = ethiopian(2018, 1, 15);
    const result = formatEthiopianDate(d, 'DD MMMM YYYY', { locale: 'am' });
    expect(result).toBe('15 መስከረም 2018');
  });

  it('formats dates using Ge\'ez numerals', () => {
    const d = ethiopian(2018, 1, 15);
    const result = formatEthiopianDate(d, 'DD MMMM YYYY', { locale: 'am', numerals: 'geez' });
    expect(result).toBe('፲፭ መስከረም ፳፻፲፰');
  });

  it('formats dual calendar dates', () => {
    const d = ethiopian(2018, 1, 15);
    const dual = formatDualDate(d, 'en');
    expect(dual).toBe('15 Meskerem 2018 / 25 September 2025');
  });

  it('parses Ethiopian date strings strictly', () => {
    const parsed1 = parseEthiopianDate('2018-01-15');
    expect(parsed1.year).toBe(2018);
    expect(parsed1.month).toBe(1);
    expect(parsed1.day).toBe(15);

    const parsed2 = parseEthiopianDate('15 Meskerem 2018', { locale: 'en' });
    expect(parsed2.year).toBe(2018);
  });
});