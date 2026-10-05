import { EthiopianDate } from '../date/EthiopianDate.js';
import { getLocale } from '../localization/localeManager.js';
import { SupportedLocale } from '../core/types.js';
import { toGeezNumeral } from '../numerals/geez.js';

export interface FormatOptions {
  locale?: SupportedLocale;
  numerals?: 'arabic' | 'geez';
}

const GREGORIAN_MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Formats an EthiopianDate using token string pattern.
 * Tokens:
 * YYYY - 4-digit year
 * YY   - 2-digit year
 * MMMM - Full month name
 * MMM  - Short month name
 * MM   - 2-digit month
 * M    - Month number
 * DD   - 2-digit day
 * D    - Day number
 * dddd - Full weekday name
 * ddd  - Short weekday name
 */
export function formatEthiopianDate(
  date: EthiopianDate,
  formatStr: string = 'DD MMMM YYYY',
  options: FormatOptions = {}
): string {
  const locale = getLocale(options.locale);
  const isGeez = options.numerals === 'geez';

  const formatNum = (num: number, pad: number = 0): string => {
    if (isGeez) {
      return toGeezNumeral(num);
    }
    return String(num).padStart(pad, '0');
  };

  const replacements: Record<string, string> = {
    YYYY: formatNum(date.year, 4),
    YY: formatNum(date.year % 100, 2),
    MMMM: locale.months[date.month - 1],
    MMM: locale.monthsShort[date.month - 1],
    MM: formatNum(date.month, 2),
    M: formatNum(date.month),
    DD: formatNum(date.day, 2),
    D: formatNum(date.day),
    dddd: locale.weekdays[date.weekday],
    ddd: locale.weekdaysShort[date.weekday]
  };

  // Replace tokens from longest to shortest
  const tokenRegex = /YYYY|YY|MMMM|MMM|MM|M|DD|D|dddd|ddd/g;
  return formatStr.replace(tokenRegex, (match) => replacements[match] || match);
}

/**
 * Returns dual display string: e.g. "15 Meskerem 2018 / 25 September 2025"
 */
export function formatDualDate(date: EthiopianDate, locale: SupportedLocale = 'en'): string {
  const ethFormatted = formatEthiopianDate(date, 'D MMMM YYYY', { locale });
  const greg = date.toGregorian();
  const gregMonthName = GREGORIAN_MONTHS_EN[greg.month - 1];
  const gregFormatted = `${greg.day} ${gregMonthName} ${greg.year}`;
  return `${ethFormatted} / ${gregFormatted}`;
}

export function getDualDate(date: EthiopianDate) {
  return {
    ethiopian: {
      year: date.year,
      month: date.month,
      day: date.day
    },
    gregorian: date.toGregorian()
  };
}