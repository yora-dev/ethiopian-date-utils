import { EthiopianDate } from '../date/EthiopianDate.js';
import { getLocale } from '../localization/localeManager.js';
import { SupportedLocale } from '../core/types.js';
import { InvalidDateInputError } from '../errors/index.js';

export interface ParseOptions {
  locale?: SupportedLocale;
  strict?: boolean;
}

/**
 * Parses a string into an EthiopianDate object.
 * Supported formats:
 * - YYYY-MM-DD
 * - DD/MM/YYYY or D/M/YYYY
 * - DD MMMM YYYY (e.g. "15 Meskerem 2018" or "15 ጥቅምት 2018")
 */
export function parseEthiopianDate(input: string, options: ParseOptions = {}): EthiopianDate {
  if (typeof input !== 'string' || !input.trim()) {
    throw new InvalidDateInputError(input);
  }

  const clean = input.trim();

  // Pattern 1: ISO style YYYY-MM-DD
  const isoMatch = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(clean);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = parseInt(isoMatch[2], 10);
    const day = parseInt(isoMatch[3], 10);
    return new EthiopianDate(year, month, day);
  }

  // Pattern 2: DD/MM/YYYY or D/M/YYYY
  const slashMatch = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(clean);
  if (slashMatch) {
    const day = parseInt(slashMatch[1], 10);
    const month = parseInt(slashMatch[2], 10);
    const year = parseInt(slashMatch[3], 10);
    return new EthiopianDate(year, month, day);
  }

  // Pattern 3: Textual month e.g. "15 Meskerem 2018" or "15 ጥቅምት 2018"
  const textMatch = /^(\d{1,2})\s+([^\s\d]+)\s+(\d{4})$/.exec(clean);
  if (textMatch) {
    const day = parseInt(textMatch[1], 10);
    const monthStr = textMatch[2].toLowerCase();
    const year = parseInt(textMatch[3], 10);

    const locale = getLocale(options.locale);
    let monthIndex = -1;

    // Search in current locale
    monthIndex = locale.months.findIndex((m) => m.toLowerCase() === monthStr);
    if (monthIndex === -1) {
      monthIndex = locale.monthsShort.findIndex((m) => m.toLowerCase() === monthStr);
    }

    if (monthIndex !== -1) {
      return new EthiopianDate(year, monthIndex + 1, day);
    }
  }

  throw new InvalidDateInputError(input);
}