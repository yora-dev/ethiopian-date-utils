# 🇪🇹 ethiopian-date-utils

`ethiopian-date-utils` is a modern Ethiopian calendar toolkit for JavaScript and TypeScript.
It provides date conversion, immutable date objects, formatting, parsing, holiday lookup,
business-day calculations, recurrence helpers, Ethiopian time notation, Ge'ez numeral conversion,
and month-grid generation in a single package.

The package is designed for developers who need a clean API around Ethiopian dates without
re-implementing calendar math or relying on ad hoc conversion snippets.

## Why this package exists

Many calendar utilities only cover a narrow slice of functionality. This package aims to be
useful in real applications by combining:

- reliable Ethiopian ↔ Gregorian conversion
- immutable date manipulation
- locale-aware formatting and parsing
- holiday and business-day helpers
- time notation and Ge'ez numeral support
- calendar grid generation for UI components

## Highlights

- Bi-directional Ethiopian and Gregorian conversion built on Julian Day Numbers.
- Immutable `EthiopianDate` objects with chainable date operations.
- Support for English, Amharic, Afaan Oromo, and Tigrinya locales.
- Ethiopian clock notation with optional international formatting.
- Ge'ez numeral formatting and parsing.
- Fixed and movable holiday support.
- Business-day calculations with configurable working days.
- Recurrence utilities for daily, weekly, monthly, and yearly schedules.
- Month calendar grid generation for pickers and planners.
- Zero runtime dependencies.

## Installation

```bash
npm install ethiopian-date-utils
```

You can also use `yarn` or `pnpm`:

```bash
yarn add ethiopian-date-utils
pnpm add ethiopian-date-utils
```

## Quick Start

```ts
import {
  ethiopian,
  fromGregorian,
  formatDualDate,
  parseEthiopianDate,
} from "ethiopian-date-utils";

const date = ethiopian(2018, 1, 1);

console.log(date.toString());
// 2018-01-01

console.log(date.toGregorian());
// { year: 2025, month: 9, day: 11 }

console.log(formatDualDate(date));
// 1 Meskerem 2018 / 11 September 2025

const parsed = parseEthiopianDate("15 Meskerem 2018");
const converted = fromGregorian(new Date(Date.UTC(2025, 8, 11)));

console.log(parsed.toString());
// 2018-01-15

console.log(converted.toTuple());
// { year: 2018, month: 1, day: 1 }
```

## Importing

Import from the package root.

```ts
import {
  EthiopianDate,
  ethiopian,
  fromGregorian,
  now,
  ethiopianToGregorian,
  gregorianToEthiopian,
  formatEthiopianDate,
  formatDualDate,
  parseEthiopianDate,
  getHolidays,
  toGeezNumeral,
} from "ethiopian-date-utils";
```

CommonJS is also supported:

```js
const { EthiopianDate, ethiopian } = require("ethiopian-date-utils");
```

## Core Concepts

- `EthiopianDate` is immutable. Operations like `addDays`, `addMonths`, and `startOf` return new instances.
- Internal conversion logic uses Julian Day Numbers for consistent calendar math.
- The Ethiopian calendar has 12 months of 30 days and a 13th month, Pagume, with 5 or 6 days depending on leap year.
- Weekdays are numbered from `0 = Sunday` to `6 = Saturday`.

## Common Examples

### Convert dates

```ts
import {
  ethiopianToGregorian,
  gregorianToEthiopian,
} from "ethiopian-date-utils";

ethiopianToGregorian(2018, 1, 1);
// { year: 2025, month: 9, day: 11 }

gregorianToEthiopian(2025, 9, 11);
// { year: 2018, month: 1, day: 1 }
```

### Work with an Ethiopian date

```ts
import { ethiopian } from "ethiopian-date-utils";

const start = ethiopian(2018, 1, 1);
const nextWeek = start.addDays(7);
const monthEnd = start.endOf("month");
```

### Format a date

```ts
import { ethiopian, formatEthiopianDate } from "ethiopian-date-utils";

const date = ethiopian(2018, 1, 1);

formatEthiopianDate(date, "DD MMMM YYYY");
// 01 Meskerem 2018

formatEthiopianDate(date, "D MMMM YYYY", { numerals: "geez" });
// ፩ Meskerem ፳፻፲፰
```

### Parse user input

```ts
import { parseEthiopianDate } from "ethiopian-date-utils";

parseEthiopianDate("1 Meskerem 2018");
parseEthiopianDate("01/01/2018");
parseEthiopianDate("2018-01-01");
```

### Holiday and business-day logic

```ts
import {
  ethiopian,
  getHolidays,
  isBusinessDay,
  addBusinessDays,
} from "ethiopian-date-utils";

const holidays = getHolidays(2018);
const start = ethiopian(2018, 1, 1);
const nextBusiness = addBusinessDays(start, 5);
```

## API Surface

The package exports utilities for:

- core conversion algorithms and tuple types
- `EthiopianDate` and convenience factories
- formatting and parsing
- locale registration and lookup
- Ethiopian time notation
- holiday and business-day calculations
- recurrence generation
- date ranges
- Ge'ez numeral conversion
- month calendar grids
- custom error classes

For the full API reference and implementation details, see [documentation.md](documentation.md).

## Package Behavior Notes

- Locale and holiday registries are process-wide.
- `now()` uses the current UTC date when converting from Gregorian time.
- `fromGregorian(Date)` reads the UTC components of the provided date.
- Parsing is strict about supported string shapes and throws `InvalidDateInputError` for invalid input.

## License

MIT
