import { EthiopianDate } from '../date/EthiopianDate.js';
import { getHolidays } from '../holidays/holidayEngine.js';

export interface BusinessCalendarConfig {
  workingDays?: number[]; // Array of weekday numbers (1 = Monday, ..., 5 = Friday). Default: [1,2,3,4,5]
  holidays?: Array<{ month: number; day: number }>;
}

export class BusinessCalendar {
  private readonly workingDays: Set<number>;
  private readonly customHolidays: Set<string>;

  constructor(config: BusinessCalendarConfig = {}) {
    this.workingDays = new Set(config.workingDays ?? [1, 2, 3, 4, 5]);
    this.customHolidays = new Set(
      (config.holidays ?? []).map((h) => `${h.month}-${h.day}`)
    );
  }

  isHoliday(date: EthiopianDate): boolean {
    const key = `${date.month}-${date.day}`;
    if (this.customHolidays.has(key)) return true;

    // Check national/religious holidays for that year
    const yearHolidays = getHolidays(date.year);
    return yearHolidays.some((h) => h.month === date.month && h.day === date.day);
  }

  isBusinessDay(date: EthiopianDate): boolean {
    // Check working weekday
    if (!this.workingDays.has(date.weekday)) {
      return false;
    }
    // Check holiday
    return !this.isHoliday(date);
  }

  addBusinessDays(date: EthiopianDate, days: number): EthiopianDate {
    let current = date;
    let added = 0;
    const direction = days >= 0 ? 1 : -1;
    const target = Math.abs(days);

    while (added < target) {
      current = current.addDays(direction);
      if (this.isBusinessDay(current)) {
        added++;
      }
    }
    return current;
  }

  subtractBusinessDays(date: EthiopianDate, days: number): EthiopianDate {
    return this.addBusinessDays(date, -days);
  }

  businessDaysBetween(start: EthiopianDate, end: EthiopianDate): number {
    if (start.isSame(end)) return 0;
    let count = 0;
    let current = start.addDays(1);
    while (current.isSameOrBefore(end)) {
      if (this.isBusinessDay(current)) {
        count++;
      }
      current = current.addDays(1);
    }
    return count;
  }
}

export function createBusinessCalendar(config?: BusinessCalendarConfig): BusinessCalendar {
  return new BusinessCalendar(config);
}

const defaultBusinessCalendar = new BusinessCalendar();

export function isBusinessDay(date: EthiopianDate): boolean {
  return defaultBusinessCalendar.isBusinessDay(date);
}

export function addBusinessDays(date: EthiopianDate, days: number): EthiopianDate {
  return defaultBusinessCalendar.addBusinessDays(date, days);
}

export function subtractBusinessDays(date: EthiopianDate, days: number): EthiopianDate {
  return defaultBusinessCalendar.subtractBusinessDays(date, days);
}

export function businessDaysBetween(start: EthiopianDate, end: EthiopianDate): number {
  return defaultBusinessCalendar.businessDaysBetween(start, end);
}