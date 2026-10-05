import { describe, it, expect } from 'vitest';
import { toGeezNumeral, fromGeezNumeral } from '../src/numerals/geez.js';

describe('Ge\'ez Numerals Converter', () => {
  it('converts integers to Ge\'ez numerals correctly', () => {
    expect(toGeezNumeral(1)).toBe('፩');
    expect(toGeezNumeral(15)).toBe('፲፭');
    expect(toGeezNumeral(2018)).toBe('፳፻፲፰');
  });

  it('parses Ge\'ez numerals back to integers', () => {
    expect(fromGeezNumeral('፩')).toBe(1);
    expect(fromGeezNumeral('፲፭')).toBe(15);
    expect(fromGeezNumeral('፳፻፲፰')).toBe(2018);
  });
});