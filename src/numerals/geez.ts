const GEEZ_ONES = ['', '፩', '፪', '፫', '፬', '፭', '፮', '፯', '፰', '፱'];
const GEEZ_TENS = ['', '፲', '፳', '፴', '፵', '፶', '፷', '፸', '፹', '፺'];

const GEEZ_MAP: Record<string, number> = {
  '፩': 1, '፪': 2, '፫': 3, '፬': 4, '፭': 5, '፮': 6, '፯': 7, '፰': 8, '፱': 9,
  '፲': 10, '፳': 20, '፴': 30, '፵': 40, '፶': 50, '፷': 60, '፸': 70, '፹': 80, '፺': 90,
  '፻': 100, '፼': 10000
};

/**
 * Converts a positive integer to Ge'ez numeral notation.
 */
export function toGeezNumeral(num: number): string {
  if (!Number.isInteger(num) || num <= 0) {
    return String(num);
  }

  if (num < 10) {
    return GEEZ_ONES[num];
  }

  if (num < 100) {
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    return GEEZ_TENS[tens] + GEEZ_ONES[ones];
  }

  if (num < 10000) {
    const hundreds = Math.floor(num / 100);
    const remainder = num % 100;
    const prefix = hundreds === 1 ? '' : toGeezNumeral(hundreds);
    const suffix = remainder > 0 ? toGeezNumeral(remainder) : '';
    return prefix + '፻' + suffix;
  }

  const myriads = Math.floor(num / 10000);
  const remainder = num % 10000;
  const prefix = myriads === 1 ? '' : toGeezNumeral(myriads);
  const suffix = remainder > 0 ? toGeezNumeral(remainder) : '';
  return prefix + '፼' + suffix;
}

/**
 * Parses Ge'ez numeral string back into an integer.
 */
export function fromGeezNumeral(geezStr: string): number {
  if (!geezStr || typeof geezStr !== 'string') return NaN;

  let total = 0;
  let temp = 0;

  for (let i = 0; i < geezStr.length; i++) {
    const char = geezStr[i];
    const val = GEEZ_MAP[char];

    if (val === undefined) {
      return NaN;
    }

    if (val === 100) {
      temp = temp === 0 ? 1 : temp;
      total += temp * 100;
      temp = 0;
    } else if (val === 10000) {
      temp = temp === 0 ? 1 : temp;
      total += temp * 10000;
      temp = 0;
    } else {
      temp += val;
    }
  }

  return total + temp;
}