// Core conversion algorithms & types
export {
  ethiopianToGregorian,
  gregorianToEthiopian,
  ethiopianToJDN,
  jdnToEthiopian,
  isEthiopianLeapYear,
  getDaysInEthiopianMonth
} from './core/algorithms.js';

export type {
  EthiopianDateTuple,
  GregorianDateTuple,
  SupportedLocale,
  LocaleDefinition
} from './core/types.js';

// Errors
export {
  EthiopianDateError,
  InvalidEthiopianDateError,
  InvalidMonthError,
  InvalidDayError,
  InvalidLocaleError,
  InvalidDateInputError
} from './errors/index.js';

// Smart Immutable Date Primitive
export { EthiopianDate, ethiopian, fromGregorian, now } from './date/index.js';

// Localization
export { registerLocale, getLocale, setDefaultLocale } from './localization/localeManager.js';

// Formatting & Dual Calendar
export { formatEthiopianDate, formatDualDate, getDualDate, type FormatOptions } from './formatting/index.js';

// Parsing
export { parseEthiopianDate, type ParseOptions } from './parsing/index.js';

// Range API
export { EthiopianDateRange, ethiopianRange } from './range/index.js';

// Business Day Calculations
export {
  BusinessCalendar,
  createBusinessCalendar,
  isBusinessDay,
  addBusinessDays,
  subtractBusinessDays,
  businessDaysBetween
} from './business/index.js';

// Recurrence System
export { Recurrence, recurrence, type RecurrenceConfig } from './recurrence/index.js';

// Holiday Engine
export { getHolidays, registerHoliday, type EthiopianHoliday } from './holidays/index.js';

// Ethiopian Time System
export { toEthiopianTime, formatEthiopianTime } from './time/index.js';

// Ge'ez Numerals
export { toGeezNumeral, fromGeezNumeral } from './numerals/index.js';

// UI Calendar Month Generator
export { getMonthCalendar, type CalendarDayCell, type MonthCalendarGrid } from './calendar/index.js';