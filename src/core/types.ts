export interface EthiopianDateTuple {
  year: number;
  month: number;
  day: number;
}

export interface GregorianDateTuple {
  year: number;
  month: number;
  day: number;
}

export interface EthiopianTimeComponents {
  hours: number; // 1 to 12
  minutes: number; // 0 to 59
  seconds: number; // 0 to 59
  cycle: 'day' | 'night'; // day = ከቀኑ/ከጠዋቱ (6 AM - 6 PM), night = ከምሽቱ/ከሌሊቱ (6 PM - 6 AM)
}

export type SupportedLocale = 'en' | 'am' | 'om' | 'ti' | string;

export interface LocaleDefinition {
  code: string;
  months: [string, string, string, string, string, string, string, string, string, string, string, string, string];
  monthsShort: [string, string, string, string, string, string, string, string, string, string, string, string, string];
  weekdays: [string, string, string, string, string, string, string];
  weekdaysShort: [string, string, string, string, string, string, string];
  dayCycles: {
    morning: string;
    afternoon: string;
    evening: string;
    night: string;
  };
  relativeTime: {
    future: string; // e.g., "in %s" / "በ %s ውስጥ"
    past: string;   // e.g., "%s ago" / "ከ %s በፊት"
    s: string;      // a few seconds
    m: string;      // a minute
    mm: string;     // %d minutes
    h: string;      // an hour
    hh: string;     // %d hours
    d: string;      // a day
    dd: string;     // %d days
    M: string;      // a month
    MM: string;     // %d months
    y: string;      // a year
    yy: string;     // %d years
  };
}

export interface HolidayDefinition {
  id: string;
  name: Record<string, string>;
  month: number;
  day: number;
  type: 'national' | 'religious' | 'custom';
  isMovable: boolean;
}