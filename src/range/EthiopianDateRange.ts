import { EthiopianDate } from '../date/EthiopianDate.js';
import { EthiopianDateError } from '../errors/index.js';

export class EthiopianDateRange implements Iterable<EthiopianDate> {
  private readonly _start: EthiopianDate;
  private readonly _end: EthiopianDate;

  constructor(start: EthiopianDate, end: EthiopianDate) {
    if (start.isAfter(end)) {
      throw new EthiopianDateError('Start date cannot be after end date in EthiopianDateRange.');
    }
    this._start = start;
    this._end = end;
    Object.freeze(this);
  }

  get start(): EthiopianDate {
    return this._start;
  }

  get end(): EthiopianDate {
    return this._end;
  }

  get length(): number {
    return this._end.jdn - this._start.jdn + 1;
  }

  contains(date: EthiopianDate): boolean {
    return date.jdn >= this._start.jdn && date.jdn <= this._end.jdn;
  }

  /**
   * Generator-based iterator for memory efficiency over long ranges.
   */
  *[Symbol.iterator](): Iterator<EthiopianDate> {
    let current = this._start;
    while (current.jdn <= this._end.jdn) {
      yield current;
      current = current.addDays(1);
    }
  }

  toArray(): EthiopianDate[] {
    return Array.from(this);
  }
}

export function ethiopianRange(start: EthiopianDate, end: EthiopianDate): EthiopianDateRange {
  return new EthiopianDateRange(start, end);
}