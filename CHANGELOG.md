# Changelog

All notable changes to `ethiopian-date-utils` will be documented in this file.

## [1.0.0] - 2026-10-02

### Added
- Core Julian Day Number (JDN) bi-directional conversion engine between Ethiopian and Gregorian calendars.
- Immutable `EthiopianDate` class supporting fluent arithmetic, start/end of period operations, and comparison methods.
- Multi-language localization engine supporting English (`en`), Amharic (`am`), Afaan Oromo (`om`), and Tigrinya (`ti`).
- Traditional Ethiopian 12-hour time notation converter (`EthiopianTime`).
- Ge'ez numerals converter supporting values from 1 to 99,999,999.
- Custom business days calendar supporting configurable work-weeks and holiday exclusions.
- Flexible recurrence generator for daily, weekly, monthly, and yearly recurring schedules.
- Bahire Hasab holiday calculation engine for Orthodox moveable fasts/feasts and national public holidays.
- High-performance UI calendar month grid generator.
- Comprehensive TypeScript type declarations and Vitest unit testing suite.