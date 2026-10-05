import { ETHIOPIAN_EPOCH_JDN } from './constants.js';
import { EthiopianDateTuple, GregorianDateTuple } from './types.js';
import { InvalidDayError, InvalidMonthError } from '../errors/index.js';

/**
 * Checks if an Ethiopian year is a leap year.
 * Ethiopian leap years occur when year % 4 === 3 (e.g., 2015, 2019, 2023).
 */
export function isEthiopianLeapYear(year: number): boolean {
  return Math.abs(year) % 4 === 3;
}

/**
 * Gets the total number of days in a given Ethiopian month.
 */
export function getDaysInEthiopianMonth(year: number, month: number): number {
  if (month < 1 || month > 13) {
    throw new InvalidMonthError(month);
  }
  if (month === 13) {
    return isEthiopianLeapYear(year) ? 6 : 5;
  }
  return 30;
}

/**
 * Validates Ethiopian date parameters.
 */
export function validateEthiopianDate(year: number, month: number, day: number): void {
  if (month < 1 || month > 13) {
    throw new InvalidMonthError(month);
  }
  const maxDays = getDaysInEthiopianMonth(year, month);
  if (day < 1 || day > maxDays) {
    throw new InvalidDayError(day, month, maxDays);
  }
}

/**
 * Converts an Ethiopian date tuple to Julian Day Number (JDN).
 */
export function ethiopianToJDN(year: number, month: number, day: number): number {
  validateEthiopianDate(year, month, day);
  return (
    ETHIOPIAN_EPOCH_JDN +
    365 * (year - 1) +
    Math.floor(year / 4) +
    30 * (month - 1) +
    day -
    1
  );
}

/**
 * Converts a Julian Day Number (JDN) to an Ethiopian date tuple.
 */
export function jdnToEthiopian(jdn: number): EthiopianDateTuple {
  const daysSinceEpoch = jdn - ETHIOPIAN_EPOCH_JDN;
  const cycle = Math.floor(daysSinceEpoch / 1461);
  let dayInCycle = daysSinceEpoch % 1461;
  if (dayInCycle < 0) {
    dayInCycle += 1461;
  }

  let yearInCycle = Math.floor(dayInCycle / 365);
  if (yearInCycle === 4) {
    yearInCycle = 3; // Handles the 366th day of leap year
  }

  const year = cycle * 4 + yearInCycle + 1;
  const dayInYear = dayInCycle - (yearInCycle === 3 ? 1095 : yearInCycle * 365);

  const month = Math.min(Math.floor(dayInYear / 30) + 1, 13);
  const day = dayInYear - (month - 1) * 30 + 1;

  return { year, month, day };
}

/**
 * Converts a Gregorian date tuple to Julian Day Number (JDN).
 */
export function gregorianToJDN(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

/**
 * Converts a Julian Day Number (JDN) to a Gregorian date tuple.
 */
export function jdnToGregorian(jdn: number): GregorianDateTuple {
  const l = jdn + 68569;
  const n = Math.floor((4 * l) / 146097);
  const l1 = l - Math.floor((146097 * n + 3) / 4);
  const i = Math.floor((4000 * (l1 + 1)) / 1461001);
  const l2 = l1 - Math.floor((1461 * i) / 4) + 31;
  const j = Math.floor((80 * l2) / 2447);
  const day = l2 - Math.floor((2447 * j) / 80);
  const l3 = Math.floor(j / 11);
  const month = j + 2 - 12 * l3;
  const year = 100 * (n - 49) + i + l3;

  return { year, month, day };
}

/**
 * Direct conversion: Ethiopian -> Gregorian.
 */
export function ethiopianToGregorian(year: number, month: number, day: number): GregorianDateTuple {
  const jdn = ethiopianToJDN(year, month, day);
  return jdnToGregorian(jdn);
}

/**
 * Direct conversion: Gregorian -> Ethiopian.
 */
export function gregorianToEthiopian(year: number, month: number, day: number): EthiopianDateTuple {
  const jdn = gregorianToJDN(year, month, day);
  return jdnToEthiopian(jdn);
}

/**
 * Calculates day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday) for a given JDN.
 */
export function getDayOfWeekFromJDN(jdn: number): number {
  return (jdn + 1) % 7;
}