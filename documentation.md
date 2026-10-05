# ethiopian-date-utils Documentation

`ethiopian-date-utils` is a TypeScript-first Ethiopian calendar toolkit for converting, formatting, parsing, and manipulating Ethiopian dates, time notation, ranges, holidays, business days, and related utilities.

The package ships both ESM and CommonJS builds through the package export map, so it can be consumed from modern TypeScript/JavaScript projects without deep imports.

## Installation

```bash
npm install ethiopian-date-utils
```

You can also use the package with `yarn` or `pnpm`:

```bash
yarn add ethiopian-date-utils
pnpm add ethiopian-date-utils
```

## Importing

Use the public package entry point. Do not import from internal source files in application code.

```ts
import {
  EthiopianDate,
  ethiopian,
  fromGregorian,
  now,
  ethiopianToGregorian,
  gregorianToEthiopian,
  formatEthiopianDate,
  parseEthiopianDate,
} from "ethiopian-date-utils";
```

CommonJS is supported as well:

```js
const { EthiopianDate, ethiopian } = require("ethiopian-date-utils");
```

## Quick Start

```ts
import { ethiopian, fromGregorian, formatDualDate } from "ethiopian-date-utils";

const date = ethiopian(2018, 1, 1);

console.log(date.toString());
// 2018-01-01

console.log(date.toGregorian());
// { year: 2025, month: 9, day: 11 }

console.log(formatDualDate(date));
// 1 Meskerem 2018 / 11 September 2025

const converted = fromGregorian(new Date(Date.UTC(2025, 8, 11)));
console.log(converted.toTuple());
// { year: 2018, month: 1, day: 1 }
```

## Core Concepts

The package models dates using the Ethiopian calendar as the primary source of truth. An `EthiopianDate` is immutable: methods such as `addDays`, `addMonths`, and `startOf` return new instances.

The implementation uses Julian Day Numbers internally for conversion accuracy.

## Calendar Conventions

- Ethiopian months 1 through 12 have 30 days each.
- Month 13, Pagume, has 5 days in a common year and 6 days in an Ethiopian leap year.
- `isEthiopianLeapYear(year)` returns `true` when the Ethiopian year is in the leap-year position of its 4-year cycle.
- Weekday numbering is `0 = Sunday` through `6 = Saturday`.
- For the Gregorian years 1900–2099, Ethiopian New Year normally falls on 11 September, and on 12 September in the year preceding a Gregorian leap year.

## Public API Overview

The root package entry exports the following groups:

- Core conversion algorithms and types.
- Immutable Ethiopian date primitives.
- Formatting and parsing helpers.
- Localization and locale management.
- Ethiopian time notation helpers.
- Holiday, business-day, recurrence, and range utilities.
- Ge'ez numeral conversion.
- Month calendar grid generation.
- Custom error types.

## Conversion Utilities

### `ethiopianToGregorian(year, month, day)`

Converts an Ethiopian date tuple to a Gregorian date tuple.

```ts
import { ethiopianToGregorian } from "ethiopian-date-utils";

const gregorian = ethiopianToGregorian(2018, 1, 1);
// { year: 2025, month: 9, day: 11 }
```

### `gregorianToEthiopian(year, month, day)`

Converts a Gregorian date tuple to an Ethiopian date tuple.

```ts
import { gregorianToEthiopian } from "ethiopian-date-utils";

const ethiopianDate = gregorianToEthiopian(2025, 9, 11);
// { year: 2018, month: 1, day: 1 }
```

### `ethiopianToJDN(year, month, day)` and `jdnToEthiopian(jdn)`

Low-level Julian Day Number conversion helpers for consumers that need calendar math directly.

### `isEthiopianLeapYear(year)`

Returns whether the Ethiopian year is a leap year.

### `getDaysInEthiopianMonth(year, month)`

Returns the number of days in a given Ethiopian month. Month 13 is validated against the leap year of the given year.

## EthiopianDate

`EthiopianDate` is the main immutable date primitive.

### Construction

```ts
import { EthiopianDate, ethiopian } from "ethiopian-date-utils";

const a = new EthiopianDate(2018, 1, 1);
const b = ethiopian(2018, 1, 1);
```

### Read-only properties

- `year`
- `month`
- `day`
- `jdn`
- `weekday`
- `isLeapYear`

### Date arithmetic

- `addDays(days)`
- `subtractDays(days)`
- `addMonths(months)`
- `subtractMonths(months)`
- `addYears(years)`
- `subtractYears(years)`

### Boundary helpers

- `startOf('month' | 'year')`
- `endOf('month' | 'year')`

### Comparison helpers

- `isBefore(other)`
- `isAfter(other)`
- `isSame(other)`
- `isSameOrBefore(other)`
- `isSameOrAfter(other)`

### Conversion helpers

- `toGregorian()`
- `toDate()` converts to a native JavaScript `Date` at UTC midnight.
- `toTuple()`
- `toString()` returns `YYYY-MM-DD`.

### Factory helpers

- `ethiopian(year, month, day)` creates a new `EthiopianDate`.
- `fromGregorian(yearOrDate, month?, day?)` converts from either a native `Date` or a Gregorian tuple.
- `now()` returns today’s Ethiopian date based on the current UTC date.

### Example

```ts
import { ethiopian } from "ethiopian-date-utils";

const meeting = ethiopian(2018, 1, 1);
const nextWeek = meeting.addDays(7);
const monthEnd = meeting.endOf("month");
```

## Formatting

### `formatEthiopianDate(date, formatStr?, options?)`

Formats an `EthiopianDate` with token-based patterns.

Supported tokens:

- `YYYY` four-digit year
- `YY` two-digit year
- `MMMM` full month name
- `MMM` short month name
- `MM` two-digit month
- `M` month number
- `DD` two-digit day
- `D` day number
- `dddd` full weekday name
- `ddd` short weekday name

Options:

- `locale?: SupportedLocale`
- `numerals?: 'arabic' | 'geez'`

Example:

```ts
import { ethiopian, formatEthiopianDate } from "ethiopian-date-utils";

const date = ethiopian(2018, 1, 1);

formatEthiopianDate(date, "DD MMMM YYYY");
// 01 Meskerem 2018

formatEthiopianDate(date, "D MMMM YYYY", { numerals: "geez" });
// ፩ Meskerem ፳፻፲፰
```

### `formatDualDate(date, locale?)`

Returns a dual Ethiopian/Gregorian string such as:

`1 Meskerem 2018 / 11 September 2025`

### `getDualDate(date)`

Returns a structured object with both Ethiopian and Gregorian tuples.

## Parsing

### `parseEthiopianDate(input, options?)`

Parses a string into an `EthiopianDate`.

Supported input forms:

- `YYYY-MM-DD`
- `DD/MM/YYYY` or `D/M/YYYY`
- `DD MMMM YYYY`
- `DD MMM YYYY`

The parser consults the active locale for month names when parsing textual month formats.

Options:

- `locale?: SupportedLocale`
- `strict?: boolean` (currently reserved; the parser does not enforce extra strict-mode rules)

Example:

```ts
import { parseEthiopianDate } from "ethiopian-date-utils";

const date = parseEthiopianDate("15 Meskerem 2018");
```

Invalid input throws `InvalidDateInputError`.

## Localization

Locales are built in for:

- `en`
- `am`
- `om`
- `ti`

### `registerLocale(code, localeDef)`

Adds or overrides a locale at runtime.

### `getLocale(code?)`

Gets the requested locale or the default locale.

### `setDefaultLocale(code)`

Sets the process-wide default locale. The locale must already be registered.

### LocaleDefinition shape

Locale definitions include month names, weekday names, day-cycle labels, and relative-time strings.

Example:

```ts
import { getLocale } from "ethiopian-date-utils";

const am = getLocale("am");
console.log(am.months[0]);
```

## Ethiopian Time

### `toEthiopianTime(standardHours, minutes?, seconds?)`

Converts a 24-hour time into Ethiopian clock notation.

The returned object contains:

- `hours`
- `minutes`
- `seconds`
- `cycle` with values `'day'` or `'night'`

### `formatEthiopianTime(standardHours, minutes?, options?)`

Formats a time string in either Ethiopian or international notation.

Options:

- `locale?: SupportedLocale`
- `system?: 'ethiopian' | 'international'`

Examples:

```ts
import { formatEthiopianTime, toEthiopianTime } from "ethiopian-date-utils";

toEthiopianTime(6, 30);
// { hours: 12, minutes: 30, seconds: 0, cycle: 'day' }

formatEthiopianTime(14, 5);
// 8:05 (Afternoon)

formatEthiopianTime(14, 5, { system: "international" });
// 02:05 PM
```

## Range Utilities

### `EthiopianDateRange`

Represents an inclusive date range.

Constructor:

```ts
new EthiopianDateRange(start, end);
```

Behavior:

- Throws if `start` is after `end`.
- `length` is inclusive of both endpoints.
- The range is iterable and yields each day in sequence.

Methods:

- `contains(date)`
- `toArray()`

### `ethiopianRange(start, end)`

Factory helper for `EthiopianDateRange`.

Example:

```ts
import { ethiopian, ethiopianRange } from "ethiopian-date-utils";

const range = ethiopianRange(ethiopian(2018, 1, 1), ethiopian(2018, 1, 3));
```

## Business Days

### `BusinessCalendar`

Configurable business-day calculator.

Constructor config:

- `workingDays?: number[]` where `1 = Monday` and `5 = Friday` by default.
- `holidays?: Array<{ month: number; day: number }>` for custom fixed holidays.

Methods:

- `isHoliday(date)`
- `isBusinessDay(date)`
- `addBusinessDays(date, days)`
- `subtractBusinessDays(date, days)`
- `businessDaysBetween(start, end)`

### Convenience exports

- `createBusinessCalendar(config?)`
- `isBusinessDay(date)`
- `addBusinessDays(date, days)`
- `subtractBusinessDays(date, days)`
- `businessDaysBetween(start, end)`

Important behavior:

- `businessDaysBetween(start, end)` counts business days after `start` and through `end` inclusively.

## Holidays

### `getHolidays(year)`

Returns the holiday list for an Ethiopian year, including fixed national and religious holidays, Good Friday, Ethiopian Easter, and any holidays registered at runtime.

### `registerHoliday(holiday)`

Adds a custom holiday to the process-wide registry.

### `EthiopianHoliday`

Holiday objects contain:

- `name`
- `month`
- `day`
- `type` of `national`, `religious`, or `custom`
- `isMovable`

Example:

```ts
import { getHolidays, registerHoliday } from "ethiopian-date-utils";

registerHoliday({ name: "Company Day", month: 1, day: 20 });
const holidays = getHolidays(2018);
```

## Recurrence

### `Recurrence`

Creates date sequences from a starting Ethiopian date.

Config:

- `frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'`
- `interval?: number`
- `startDate: EthiopianDate`
- `endDate?: EthiopianDate`
- `count?: number`

Method:

- `take(limit)` returns up to `limit` dates, respecting `count` and `endDate`.

### `recurrence(config)`

Factory helper for `Recurrence`.

Example:

```ts
import { ethiopian, recurrence } from "ethiopian-date-utils";

const series = recurrence({
  frequency: "weekly",
  interval: 2,
  startDate: ethiopian(2018, 1, 1),
});

const dates = series.take(5);
```

## Ge'ez Numerals

### `toGeezNumeral(num)`

Converts a positive integer to Ge'ez numeral notation.

Behavior notes:

- Non-integer or non-positive values are returned as strings unchanged.

### `fromGeezNumeral(geezStr)`

Parses a Ge'ez numeral string back into a number.

Behavior notes:

- Invalid strings return `NaN`.

Example:

```ts
import { toGeezNumeral, fromGeezNumeral } from "ethiopian-date-utils";

toGeezNumeral(2018);
// ፳፻፲፰

fromGeezNumeral("፳፻፲፰");
// 2018
```

## Month Calendar Grid

### `getMonthCalendar(year, month)`

Builds a calendar grid suitable for UI rendering.

Returns a `MonthCalendarGrid` object with:

- `year`
- `month`
- `weeks`, an array of 7-day rows

Each cell is a `CalendarDayCell` with:

- `date`
- `day`
- `month`
- `year`
- `weekday`
- `isCurrentMonth`
- `isToday`
- `isHoliday`
- `isWeekend`
- `isBusinessDay`

Example:

```ts
import { getMonthCalendar } from "ethiopian-date-utils";

const grid = getMonthCalendar(2018, 1);
```

## Error Types

The package exposes custom domain errors for validation and input issues:

- `EthiopianDateError`
- `InvalidEthiopianDateError`
- `InvalidMonthError`
- `InvalidDayError`
- `InvalidLocaleError`
- `InvalidDateInputError`

Use these to distinguish package validation failures from other runtime errors.

## Type Definitions

The public API also exports useful TypeScript types:

- `EthiopianDateTuple`
- `GregorianDateTuple`
- `SupportedLocale`
- `LocaleDefinition`
- `FormatOptions`
- `ParseOptions`
- `RecurrenceConfig`
- `BusinessCalendarConfig`
- `CalendarDayCell`
- `MonthCalendarGrid`

## Practical Usage Patterns

### Working with dates

```ts
import { ethiopian } from "ethiopian-date-utils";

const start = ethiopian(2018, 1, 1);
const end = start.addDays(10);
const monthStart = start.startOf("month");
const monthEnd = start.endOf("month");
```

### Formatting for display

```ts
import { ethiopian, formatDualDate } from "ethiopian-date-utils";

console.log(formatDualDate(ethiopian(2018, 1, 1)));
```

### Parsing user input

```ts
import { parseEthiopianDate } from "ethiopian-date-utils";

const date = parseEthiopianDate("1 Meskerem 2018");
```

### Business-day calculations

```ts
import {
  ethiopian,
  addBusinessDays,
  isBusinessDay,
} from "ethiopian-date-utils";

const start = ethiopian(2018, 1, 1);
const nextBusiness = addBusinessDays(start, 5);
const working = isBusinessDay(nextBusiness);
```

## Notes for Contributors and Integrators

- The package is designed to be consumed from its root export only.
- `EthiopianDate` and related classes are immutable by design.
- Locale and holiday registries are process-wide; registering custom values affects subsequent calls in the same runtime.
- `now()` uses the current UTC date when converting from Gregorian time.

## License

MIT
