import { EthiopianDate } from '../date/EthiopianDate.js';

export interface RecurrenceConfig {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval?: number; // e.g., every 2 weeks
  startDate: EthiopianDate;
  endDate?: EthiopianDate;
  count?: number;
}

export class Recurrence {
  private readonly config: Required<Omit<RecurrenceConfig, 'endDate' | 'count'>> & {
    endDate?: EthiopianDate;
    count?: number;
  };

  constructor(config: RecurrenceConfig) {
    this.config = {
      frequency: config.frequency,
      interval: config.interval ?? 1,
      startDate: config.startDate,
      endDate: config.endDate,
      count: config.count
    };
  }

  take(limit: number): EthiopianDate[] {
    const results: EthiopianDate[] = [];
    let current = this.config.startDate;
    let generated = 0;

    const maxCount = this.config.count !== undefined ? Math.min(this.config.count, limit) : limit;

    while (generated < maxCount) {
      if (this.config.endDate && current.isAfter(this.config.endDate)) {
        break;
      }

      results.push(current);
      generated++;

      switch (this.config.frequency) {
        case 'daily':
          current = current.addDays(this.config.interval);
          break;
        case 'weekly':
          current = current.addDays(this.config.interval * 7);
          break;
        case 'monthly':
          current = current.addMonths(this.config.interval);
          break;
        case 'yearly':
          current = current.addYears(this.config.interval);
          break;
      }
    }

    return results;
  }
}

export function recurrence(config: RecurrenceConfig): Recurrence {
  return new Recurrence(config);
}