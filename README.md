# 🇪🇹 ethiopian-date-utils

A lightweight, high-performance, developer-friendly Ethiopian date and time toolkit written in modern TypeScript with zero runtime dependencies.

---

## 🌟 Why ethiopian-date-utils?

Existing npm packages for the Ethiopian calendar are often limited to procedural array converters, lack modern immutability, fail to support business days or time notation, or suffer from timezone drift when interfacing with JavaScript's native `Date`.

`ethiopian-date-utils` solves these challenges with an elegant, chainable API designed after modern standards like Day.js and date-fns.

---

## ✨ Features

- 🔄 **Precision Conversion**: Bi-directional conversion using Julian Day Numbers (JDN).
- 🧱 **Immutable Smart Date Primitive**: Chainable `EthiopianDate` class (`date.addDays(10).startOf('month')`).
- 🌐 **Multi-Language i18n**: Built-in support for English (`en`), Amharic (`am`), Afaan Oromo (`om`), and Tigrinya (`ti`).
- 🕒 **Ethiopian Time System**: Support for traditional 12-hour clock notation (`2:30 ሰዓት`).
- 🔢 **Ge'ez Numerals Engine**: Bi-directional converter (`2018` ↔ `፳፻፲፰`).
- 💼 **Business Day Engine**: Configurable work-weeks and holiday exclusions.
- 🔁 **Recurrence Utilities**: Daily, weekly, monthly, and yearly schedule generators.
- ⛪ **Bahire Hasab Engine**: Calculates Orthodox moveable fasts/feasts and national public holidays.
- 📅 **UI Calendar Grid Generator**: Instant grid creation for custom datepickers.
- ⚡ **Zero Runtime Dependencies**: Completely self-contained and tree-shakable.

---

## 📦 Installation

```bash
npm install ethiopian-date-utils
# or
yarn add ethiopian-date-utils
# or
pnpm add ethiopian-date-utils