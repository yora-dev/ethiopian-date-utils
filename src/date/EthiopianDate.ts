import {
  ethiopianToGregorian,
  ethiopianToJDN,
  getDayOfWeekFromJDN,
  getDaysInEthiopianMonth,
  gregorianToEthiopian,
  isEthiopianLeapYear,
  jdnToEthiopian,
  validateEthiopianDate
} from '../core/algorithms.js';
import { EthiopianDateTuple, GregorianDateTuple } from '../core/types.js';
import { InvalidDateInputError } from '../errors/index.js';

export class EthiopianDate {
  private readonly _year: number;
  private readonly _month: number;
  private readonly _day: number;
  private readonly _jdn: number;

  constructor(year: number, month: number, day: number) {
    validateEthiopianDate(year, month, day);
    this._year = year;
    this._month = month;
    this._day = day;
    this._jdn = ethiopianToJDN(year, month, day);
    Object.freeze(this);
  }

  get year(): number {
    return this._year;
  }

  get month(): number {
    return this._month;
  }

  get day(): number {
    return this._day;
  }

  get jdn(): number {
    return this._jdn;
  }

  /**
   * Day of week: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
   */
  get weekday(): number {
    return getDayOfWeekFromJDN(this._jdn);
  }

  get isLeapYear(): boolean {
    return isEthiopianLeapYear(this._year);
  }

  /**
   * Returns a new EthiopianDate instance with added days.
   */
  addDays(days: number): EthiopianDate {
    if (days === 0) return this;
    const newJdn = this._jdn + days;
    const { year, month, day } = jdnToEthiopian(newJdn);
    return new EthiopianDate(year, month, day);
  }

  subtractDays(days: number): EthiopianDate {
    return this.addDays(-days);
  }

  /**
   * Returns a new EthiopianDate instance with added months.
   * Handles clamping if target day exceeds the days in target month (e.g. Pagume).
   */
  addMonths(months: number): EthiopianDate {
    if (months === 0) return this;
    let totalMonths = (this._year - 1) * 13 + (this._month - 1) + months;
    let targetYear = Math.floor(totalMonths / 13) + 1;
    let targetMonth = (totalMonths % 13) + 1;

    if (targetMonth <= 0) {
      targetMonth += 13;
      targetYear -= 1;
    }

    const maxDays = getDaysInEthiopianMonth(targetYear, targetMonth);
    const targetDay = Math.min(this._day, maxDays);

    return new EthiopianDate(targetYear, targetMonth, targetDay);
  }

  subtractMonths(months: number): EthiopianDate {
    return this.addMonths(-months);
  }

  addYears(years: number): EthiopianDate {
    if (years === 0) return this;
    const targetYear = this._year + years;
    const maxDays = getDaysInEthiopianMonth(targetYear, this._month);
    const targetDay = Math.min(this._day, maxDays);
    return new EthiopianDate(targetYear, this._month, targetDay);
  }

  subtractYears(years: number): EthiopianDate {
    return this.addYears(-years);
  }

  startOf(unit: 'month' | 'year'): EthiopianDate {
    if (unit === 'month') {
      return new EthiopianDate(this._year, this._month, 1);
    }
    return new EthiopianDate(this._year, 1, 1);
  }

  endOf(unit: 'month' | 'year'): EthiopianDate {
    if (unit === 'month') {
      const lastDay = getDaysInEthiopianMonth(this._year, this._month);
      return new EthiopianDate(this._year, this._month, lastDay);
    }
    const lastDayPagume = getDaysInEthiopianMonth(this._year, 13);
    return new EthiopianDate(this._year, 13, lastDayPagume);
  }

  isBefore(other: EthiopianDate): boolean {
    return this._jdn < other._jdn;
  }

  isAfter(other: EthiopianDate): boolean {
    return this._jdn > other._jdn;
  }

  isSame(other: EthiopianDate): boolean {
    return this._jdn === other._jdn;
  }

  isSameOrBefore(other: EthiopianDate): boolean {
    return this._jdn <= other._jdn;
  }

  isSameOrAfter(other: EthiopianDate): boolean {
    return this._jdn >= other._jdn;
  }

  toGregorian(): GregorianDateTuple {
    return ethiopianToGregorian(this._year, this._month, this._day);
  }

  /**
   * Converts to standard JavaScript native Date (UTC midnight).
   */
  toDate(): Date {
    const { year, month, day } = this.toGregorian();
    return new Date(Date.UTC(year, month - 1, day));
  }

  toTuple(): EthiopianDateTuple {
    return { year: this._year, month: this._month, day: this._day };
  }

  toString(): string {
    const m = String(this._month).padStart(2, '0');
    const d = String(this._day).padStart(2, '0');
    return `${this._year}-${m}-${d}`;
  }
}

/**
 * Factory function to create an EthiopianDate object.
 */
export function ethiopian(year: number, month: number, day: number): EthiopianDate {
  return new EthiopianDate(year, month, day);
}

/**
 * Converts a Gregorian Date or tuple to an EthiopianDate instance safely.
 */
export function fromGregorian(yearOrDate: number | Date, month?: number, day?: number): EthiopianDate {
  if (yearOrDate instanceof Date) {
    if (isNaN(yearOrDate.getTime())) {
      throw new InvalidDateInputError(yearOrDate);
    }
    const gYear = yearOrDate.getUTCFullYear();
    const gMonth = yearOrDate.getUTCMonth() + 1;
    const gDay = yearOrDate.getUTCDate();
    const { year, month: m, day: d } = gregorianToEthiopian(gYear, gMonth, gDay);
    return new EthiopianDate(year, m, d);
  }

  if (typeof yearOrDate === 'number' && month !== undefined && day !== undefined) {
    const { year, month: m, day: d } = gregorianToEthiopian(yearOrDate, month, day);
    return new EthiopianDate(year, m, d);
  }

  throw new InvalidDateInputError(yearOrDate);
}

export function now(): EthiopianDate {
  return fromGregorian(new Date());
}